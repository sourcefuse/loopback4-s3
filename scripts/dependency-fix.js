const fs = require('fs');
const {execSync} = require('child_process');
const semver = require('semver');

console.log('Starting Trivy dependency remediation');

const report = JSON.parse(fs.readFileSync('trivy-report.json', 'utf8'));
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

const processed = new Set();
const newOverrides = {};

let deps = {
  ...pkg.dependencies,
  ...pkg.devDependencies,
};

let dependencyTree = {};

function buildDependencyTree() {
  try {
    const tree = execSync('npm ls --json', {encoding: 'utf8'});
    dependencyTree = JSON.parse(tree);
  } catch (e) {
    dependencyTree = {};
  }
}

function refreshDependencies() {
  const updated = JSON.parse(fs.readFileSync('package.json', 'utf8'));

  deps = {
    ...updated.dependencies,
    ...updated.devDependencies,
  };

  buildDependencyTree();
}

function isDirect(name) {
  return deps[name] !== undefined;
}

function cleanVersion(v) {
  if (!v) return null;
  return v.replace('^', '').replace('~', '');
}

function safeUpgrade(current, target) {
  const c = semver.coerce(current);
  const t = semver.coerce(target);

  if (!c || !t) return false;

  const diff = semver.diff(c, t);

  return diff === 'patch' || diff === 'minor';
}

function findInstalledVersion(pkgName) {
  function search(node) {
    if (!node.dependencies) return null;

    for (const [name, data] of Object.entries(node.dependencies)) {
      if (name === pkgName) return data.version;

      const nested = search(data);

      if (nested) return nested;
    }

    return null;
  }

  return search(dependencyTree);
}

function findParentDependency(pkgName) {
  function search(node) {
    if (!node.dependencies) return null;

    for (const [name, data] of Object.entries(node.dependencies)) {
      if (data.dependencies && data.dependencies[pkgName]) {
        return name;
      }

      const nested = search(data);

      if (nested) return nested;
    }

    return null;
  }

  return search(dependencyTree);
}

buildDependencyTree();

for (const result of report.Results || []) {
  if (result.Type !== 'npm') continue;

  for (const vuln of result.Vulnerabilities || []) {
    const name = vuln.PkgName;
    const fixed = vuln.FixedVersion?.split(',')[0]?.trim();

    if (!name || !fixed) continue;

    if (processed.has(name)) continue;
    processed.add(name);

    console.log(`Processing vulnerability: ${name}`);

    const installed = findInstalledVersion(name);

    if (installed && semver.gte(installed, fixed)) {
      console.log(`${name} already resolved to safe version ${installed}`);
      continue;
    }

    const current = isDirect(name) ? cleanVersion(deps[name]) : null;

    if (isDirect(name)) {
      console.log(`Direct dependency detected: ${name}`);

      if (!safeUpgrade(current, fixed)) {
        console.warn(
          `Skipping unsafe upgrade ${name} (${current} -> ${fixed})`,
        );
      } else {
        try {
          console.log(`Updating direct dependency ${name} -> ${fixed}`);

          execSync(`npm i ${name}@${fixed} --ignore-scripts`, {
            stdio: 'inherit',
          });

          refreshDependencies();

          const updatedVersion = findInstalledVersion(name);

          if (updatedVersion && semver.gte(updatedVersion, fixed)) {
            console.log(`${name} resolved via direct upgrade`);
            continue;
          }
        } catch {
          console.log(`Direct upgrade failed for ${name}`);
        }
      }
    }

    const parent = findParentDependency(name);

    if (parent && deps[parent]) {
      console.log(`Attempting parent dependency upgrade: ${parent}`);

      try {
        const parentVersion = cleanVersion(deps[parent]);

        if (parentVersion) {
          execSync(`npm i ${parent}@^${parentVersion} --ignore-scripts`, {
            stdio: 'inherit',
          });

          refreshDependencies();

          const updatedVersion = findInstalledVersion(name);

          if (updatedVersion && semver.gte(updatedVersion, fixed)) {
            console.log(`${name} resolved via parent upgrade (${parent})`);
            continue;
          }
        }
      } catch {
        console.log(`Parent upgrade failed for ${parent}`);
      }
    }

    if (!pkg.overrides || !pkg.overrides[name]) {
      console.log(`Adding override for ${name}`);

      newOverrides[name] = `^${fixed}`;
    }
  }
}

const updatedPkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

if (!updatedPkg.overrides) updatedPkg.overrides = {};

Object.assign(updatedPkg.overrides, newOverrides);

fs.writeFileSync('package.json', JSON.stringify(updatedPkg, null, 2) + '\n');

if (Object.keys(newOverrides).length > 0) {
  console.log('Updating lockfile for overrides');

  execSync('npm i --package-lock-only --ignore-scripts', {stdio: 'inherit'});
}

console.log('Trivy dependency remediation completed');
