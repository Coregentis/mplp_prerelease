#!/usr/bin/env node
/**
 * Corrected no-publish package preflight harness.
 *
 * This script inspects package release roots and package-internal artifacts.
 * It does not publish, upload, build, pack, install, bump versions, or patch
 * generated artifacts.
 *
 * Reference:
 * - governance/04-records/PACKAGE-SURFACE-MODEL-CORRECTION-01.md
 * - governance/03-distribution/sdk/PACKAGE-PREFLIGHT-HARNESS.md
 */

import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync
} from 'fs';
import { dirname, join, relative } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = join(__dirname, '..', '..');

const ALLOWED_MODES = new Set(['surface', 'research', 'verify-plan']);
const ALLOWED_FORMATS = new Set(['json']);

const FORBIDDEN_OPTION_PATTERNS = [
  /^--?publish(?:=|$)/,
  /^--?npm-publish(?:=|$)/,
  /^--?upload(?:=|$)/,
  /^--?twine-upload(?:=|$)/,
  /^--?tag(?:=|$)/,
  /^--?seal(?:=|$)/,
  /^--?merge(?:=|$)/,
  /^--?delete-branch(?:=|$)/,
  /^--?access-credentials(?:=|$)/,
  /^--?credentials(?:=|$)/,
  /^--?version-bump(?:=|$)/,
  /^--?bump-version(?:=|$)/,
  /^--?build(?:=|$)/,
  /^--?pack(?:=|$)/,
  /^--?install(?:=|$)/
];

function rel(path) {
  return relative(ROOT_DIR, path) || '.';
}

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8').replace(/^\uFEFF/, ''));
}

function listDirectories(path) {
  if (!existsSync(path)) {
    return [];
  }
  return readdirSync(path, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

function safeRead(path) {
  return existsSync(path) ? readFileSync(path, 'utf8') : '';
}

function parseArgs(argv) {
  const args = {
    mode: 'surface',
    format: 'json',
    out: null,
    noPublish: true,
    strict: false
  };

  for (const arg of argv) {
    if (arg === '--no-publish') {
      args.noPublish = true;
      continue;
    }
    if (arg === '--strict') {
      args.strict = true;
      continue;
    }
    if (arg.startsWith('--mode=')) {
      args.mode = arg.slice('--mode='.length);
      continue;
    }
    if (arg.startsWith('--format=')) {
      args.format = arg.slice('--format='.length);
      continue;
    }
    if (arg.startsWith('--out=')) {
      args.out = arg.slice('--out='.length);
      continue;
    }
    if (FORBIDDEN_OPTION_PATTERNS.some((pattern) => pattern.test(arg))) {
      failOwnerAuthorization(arg);
    }
    if (arg.startsWith('-')) {
      throw new Error(`Unsupported option: ${arg}`);
    }
  }

  if (!ALLOWED_MODES.has(args.mode)) {
    throw new Error(`Unsupported mode: ${args.mode}`);
  }
  if (!ALLOWED_FORMATS.has(args.format)) {
    throw new Error(`Unsupported format: ${args.format}`);
  }

  return args;
}

function failOwnerAuthorization(option) {
  const payload = {
    status: 'OWNER_AUTHORIZATION_REQUIRED',
    reason: `Forbidden mutation option detected: ${option}`,
    noPublishHarness: true
  };
  console.error(JSON.stringify(payload, null, 2));
  process.exit(1);
}

function parseTomlProject(text) {
  const result = {
    project: {},
    mplp: {},
    setuptools: {}
  };
  let section = '';

  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) {
      continue;
    }
    const sectionMatch = line.match(/^\[([^\]]+)\]$/);
    if (sectionMatch) {
      section = sectionMatch[1];
      continue;
    }
    const kv = line.match(/^([A-Za-z0-9_.-]+)\s*=\s*(.+)$/);
    if (!kv) {
      continue;
    }
    const key = kv[1];
    const value = parseTomlValue(kv[2]);
    if (section === 'project') {
      result.project[key] = value;
    } else if (section === 'tool.mplp') {
      result.mplp[key] = value;
    } else if (section === 'tool.setuptools') {
      result.setuptools[key] = value;
    }
  }

  return result;
}

function parseTomlValue(value) {
  const trimmed = value.trim();
  if (trimmed === 'true') return true;
  if (trimmed === 'false') return false;
  if (/^".*"$/.test(trimmed)) return trimmed.slice(1, -1);
  if (/^\[.*\]$/.test(trimmed)) {
    return trimmed
      .slice(1, -1)
      .split(',')
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => part.replace(/^"|"$/g, ''));
  }
  return trimmed;
}

function collectExportReferencePaths(exportsField) {
  const refs = [];
  const visit = (value) => {
    if (typeof value === 'string') {
      refs.push(value);
    } else if (Array.isArray(value)) {
      value.forEach(visit);
    } else if (value && typeof value === 'object') {
      Object.values(value).forEach(visit);
    }
  };
  visit(exportsField);
  return refs;
}

function normalizeReference(ref) {
  if (!ref || typeof ref !== 'string') {
    return null;
  }
  if (ref.startsWith('#') || ref.startsWith('@') || /^[A-Za-z]+:/.test(ref)) {
    return null;
  }
  return ref.replace(/^\.\//, '');
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function countFiles(path) {
  if (!existsSync(path)) {
    return 0;
  }
  const stack = [path];
  let count = 0;
  while (stack.length) {
    const current = stack.pop();
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      const child = join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(child);
      } else if (entry.isFile()) {
        count += 1;
      }
    }
  }
  return count;
}

function classifyScript(command) {
  if (!command) {
    return 'NOT_AVAILABLE';
  }
  const normalized = command.toLowerCase();
  if (
    normalized.includes('no tests yet') ||
    normalized.includes('no root tests configured') ||
    normalized.includes('no root linting configured') ||
    normalized.includes('publish-only workspace') ||
    /^echo\s+/.test(normalized)
  ) {
    return 'PLACEHOLDER_NOT_REAL_PASS';
  }
  return 'REAL_GATE_CANDIDATE';
}

function loadPublishSet() {
  const path = join(ROOT_DIR, 'artifacts', 'release', 'publish-set.json');
  if (!existsSync(path)) {
    return [];
  }
  return readJson(path);
}

function loadPyPISet() {
  const path = join(ROOT_DIR, 'artifacts', 'release', 'pypi-set.json');
  if (!existsSync(path)) {
    return [];
  }
  return readJson(path).packages || [];
}

function inspectRootPackage() {
  const pkgPath = join(ROOT_DIR, 'package.json');
  if (!existsSync(pkgPath)) {
    return {
      exists: false,
      classification: 'NOT_AVAILABLE'
    };
  }
  const pkg = readJson(pkgPath);
  return {
    exists: true,
    path: rel(pkgPath),
    name: pkg.name || null,
    version: pkg.version || null,
    private: pkg.private === true,
    classification: 'PRIVATE_OR_INTERNAL',
    publishCandidate: false,
    note: 'Root package is not automatically publishable.',
    scripts: Object.fromEntries(
      Object.entries(pkg.scripts || {}).map(([name, command]) => [
        name,
        {
          command,
          classification: classifyScript(command)
        }
      ])
    )
  };
}

function inspectNpmPackage(pkgDir, publishSet) {
  const pkgJsonPath = join(pkgDir, 'package.json');
  const pkg = readJson(pkgJsonPath);
  const mplp = pkg.mplp || {};
  const publishSetMatch = publishSet.find(
    (item) => item.name === pkg.name || item.path === pkgDir.split('/').pop()
  );
  const blockReasons = {
    private: pkg.private === true,
    ciOnly: mplp.ci_only === true,
    publishBlocked: mplp.publishBlocked === true,
    internalClass: ['CI-ONLY', 'INTERNAL', 'SOURCE-MIRROR'].includes(mplp.packageClass)
  };
  const blocked = Object.values(blockReasons).some(Boolean);
  const specialOwnerReview =
    pkg.name === '@mplp/compliance' &&
    (mplp.deprecated === true ||
      String(mplp.packageRole || '').includes('legacy') ||
      String(mplp.contractMode || '').includes('alias'));

  let classification = 'UNKNOWN_NEEDS_RESEARCH';
  if (blocked) {
    classification = 'BLOCKED_BY_POLICY';
  } else if (publishSetMatch || mplp.packageClass === 'PUBLIC' || mplp.publishSurface === true) {
    classification = 'PUBLISH_CANDIDATE';
  }

  const refs = unique([
    normalizeReference(pkg.main),
    normalizeReference(pkg.types),
    ...collectExportReferencePaths(pkg.exports).map(normalizeReference)
  ]);
  const referenceChecks = refs.map((ref) => {
    const absPath = join(pkgDir, ref);
    const exists = existsSync(absPath);
    const packageInternalArtifact = ref.startsWith('dist/');
    return {
      reference: ref,
      exists,
      missingClass: exists
        ? null
        : packageInternalArtifact
          ? 'PACKAGE_INTERNAL_ARTIFACT_MISSING'
          : 'PACKAGE_ROOT_REFERENCE_MISSING',
      note: exists
        ? 'Reference exists inside package root.'
        : packageInternalArtifact
          ? 'Missing package-internal artifact; release root identity remains valid.'
          : 'Missing non-dist package reference inside release root.'
    };
  });
  const blockers = referenceChecks
    .filter((check) => !check.exists)
    .map((check) => ({
      type: check.missingClass,
      reference: check.reference,
      message: check.note
    }));
  const distPath = join(pkgDir, 'dist');
  const sourceHints = ['src', 'schemas', 'bin', 'tsconfig.json', 'DERIVATION_PROOF.yaml', 'README.md']
    .filter((name) => existsSync(join(pkgDir, name)));
  const dependencies = pkg.dependencies || {};
  const localDependencyHints = Object.entries(dependencies)
    .filter(([name]) => name.startsWith('@mplp/'))
    .map(([name, range]) => ({
      name,
      range,
      localRootHint: `packages/npm/${name.replace('@mplp/', '')}`,
      localRootExists: existsSync(join(ROOT_DIR, 'packages', 'npm', name.replace('@mplp/', '')))
    }));

  return {
    name: pkg.name || null,
    version: pkg.version || null,
    path: rel(pkgDir),
    releaseRoot: {
      exists: true,
      classification: 'NPM_PACKAGE_DISTRIBUTION_ROOT',
      missingBecauseInternalDistMissing: false
    },
    classification,
    specialOwnerReview: specialOwnerReview ? 'SPECIAL_OWNER_REVIEW' : null,
    policy: {
      private: pkg.private === true,
      mplp: {
        packageClass: mplp.packageClass || null,
        publishSurface: mplp.publishSurface === true,
        publishScope: mplp.publishScope || null,
        ciOnly: mplp.ci_only === true,
        publishBlocked: mplp.publishBlocked === true,
        deprecated: mplp.deprecated === true,
        packageRole: mplp.packageRole || null,
        legacyAliasOf: mplp.legacyAliasOf || null
      },
      blockReasons
    },
    releaseEvidence: {
      listedInPublishSet: Boolean(publishSetMatch),
      publishSetVersion: publishSetMatch?.version || null
    },
    manifest: {
      main: pkg.main || null,
      types: pkg.types || null,
      exports: pkg.exports || null,
      files: pkg.files || []
    },
    referenceChecks,
    sourceSurfaceHints: sourceHints,
    packageInternalDist: {
      path: rel(distPath),
      exists: existsSync(distPath),
      classification: 'L2_PACKAGE_INTERNAL_ARTIFACT',
      fileCount: countFiles(distPath)
    },
    scripts: Object.fromEntries(
      Object.entries(pkg.scripts || {}).map(([name, command]) => [
        name,
        {
          command,
          classification: classifyScript(command)
        }
      ])
    ),
    placeholderScripts: Object.entries(pkg.scripts || {})
      .filter(([, command]) => classifyScript(command) === 'PLACEHOLDER_NOT_REAL_PASS')
      .map(([name, command]) => ({ name, command })),
    dependencyClosureHints: {
      localMplpDependencies: localDependencyHints,
      dependencyCount: Object.keys(dependencies).length
    },
    blockers,
    plans: {
      build: {
        status: 'NOT_RUN',
        command: pkg.scripts?.build ? 'npm run build' : null,
        note: 'Build is not executed by this no-publish harness.'
      },
      pack: {
        status: blockers.length ? 'BLOCKED' : 'PLANNED_NOT_RUN',
        command: 'npm pack --dry-run --json --ignore-scripts',
        note: blockers.length
          ? 'Pack plan waits for package-internal artifact verification.'
          : 'Pack dry-run belongs to a later verification goal.'
      },
      tempInstallSmoke: {
        status: blockers.length ? 'BLOCKED' : 'PLANNED_NOT_RUN',
        command: 'npm install <tarball> in a clean temp directory',
        note: 'Temp install is not executed by this harness.'
      },
      requireImportSmoke: {
        status: blockers.length ? 'BLOCKED' : 'PLANNED_NOT_RUN',
        cjs: pkg.name ? `require("${pkg.name}")` : null,
        esm: pkg.name ? `import("${pkg.name}")` : null
      },
      typesSmoke: {
        status: blockers.length ? 'BLOCKED' : 'PLANNED_NOT_RUN',
        command: 'tsc --noEmit in a clean temp consumer'
      }
    }
  };
}

function inspectNpmPackages() {
  const npmRoot = join(ROOT_DIR, 'packages', 'npm');
  const publishSet = loadPublishSet();
  const packageDirs = listDirectories(npmRoot)
    .map((name) => join(npmRoot, name))
    .filter((dir) => existsSync(join(dir, 'package.json')));
  const packages = packageDirs.map((dir) => inspectNpmPackage(dir, publishSet));
  return {
    root: {
      path: rel(npmRoot),
      exists: existsSync(npmRoot),
      classification: 'NPM_PACKAGE_RELEASE_ROOT_PARENT'
    },
    publishSetEvidence: {
      path: 'artifacts/release/publish-set.json',
      exists: existsSync(join(ROOT_DIR, 'artifacts', 'release', 'publish-set.json')),
      packageCount: publishSet.length
    },
    packages,
    summary: summarizePackages(packages)
  };
}

function inspectPyPIPackage(pkgDir, pypiSet) {
  const pyproject = join(pkgDir, 'pyproject.toml');
  const setupCfg = join(pkgDir, 'setup.cfg');
  const setupPy = join(pkgDir, 'setup.py');
  const pyprojectText = safeRead(pyproject);
  const parsed = pyprojectText ? parseTomlProject(pyprojectText) : { project: {}, mplp: {}, setuptools: {} };
  const project = parsed.project;
  const mplp = parsed.mplp;
  const name = project.name || null;
  const version = project.version || null;
  const pypiSetMatch = pypiSet.find((item) => item.name === name || item.path === pkgDir);
  const blocked = mplp.publishBlocked === true || mplp.ci_only === true || mplp.internal === true;
  let classification = 'UNKNOWN_NEEDS_RESEARCH';
  if (blocked) {
    classification = 'BLOCKED_BY_POLICY';
  } else if (pypiSetMatch || mplp.packageClass === 'PUBLIC' || mplp.publishSurface === true) {
    classification = 'PYPI_PUBLISH_CANDIDATE';
  }

  const distPath = join(pkgDir, 'dist');
  const distFiles = existsSync(distPath)
    ? readdirSync(distPath).filter((name) => statSync(join(distPath, name)).isFile()).sort()
    : [];
  const wheels = distFiles.filter((name) => name.endsWith('.whl'));
  const sdists = distFiles.filter((name) => name.endsWith('.tar.gz'));
  const packages = Array.isArray(parsed.setuptools.packages) ? parsed.setuptools.packages : [];
  const importTarget = packages[0] || (name ? name.replace(/-/g, '_') : null);
  const initPath = importTarget ? join(pkgDir, 'src', importTarget, '__init__.py') : null;
  const initText = initPath ? safeRead(initPath) : '';
  const hasVersion = /__version__\s*=/.test(initText);
  const proofPath = join(pkgDir, 'DERIVATION_PROOF.yaml');

  const blockers = [];
  if (!wheels.length) {
    blockers.push({
      type: 'PACKAGE_INTERNAL_ARTIFACT_MISSING',
      reference: `${rel(distPath)}/*.whl`,
      message: 'Missing package-internal wheel artifact; release root identity remains valid.'
    });
  }
  if (!sdists.length) {
    blockers.push({
      type: 'PACKAGE_INTERNAL_ARTIFACT_MISSING',
      reference: `${rel(distPath)}/*.tar.gz`,
      message: 'Missing package-internal sdist artifact; release root identity remains valid.'
    });
  }

  return {
    name,
    version,
    path: rel(pkgDir),
    releaseRoot: {
      exists: true,
      classification: 'PYPI_PACKAGE_DISTRIBUTION_ROOT',
      missingBecauseInternalDistMissing: false
    },
    classification,
    pyproject: {
      path: existsSync(pyproject) ? rel(pyproject) : null,
      exists: existsSync(pyproject)
    },
    setupCfg: {
      path: existsSync(setupCfg) ? rel(setupCfg) : null,
      exists: existsSync(setupCfg)
    },
    setupPy: {
      path: existsSync(setupPy) ? rel(setupPy) : null,
      exists: existsSync(setupPy)
    },
    policy: {
      packageClass: mplp.packageClass || null,
      publishSurface: mplp.publishSurface === true,
      publishScope: mplp.publishScope || null,
      publishBlocked: mplp.publishBlocked === true,
      sourcePackagePath: mplp.sourcePackagePath || null
    },
    releaseEvidence: {
      listedInPyPISet: Boolean(pypiSetMatch),
      pypiSetVersion: pypiSetMatch?.version || null
    },
    sourcePackage: {
      packages,
      importTarget,
      initPath: initPath && existsSync(initPath) ? rel(initPath) : null
    },
    packageInternalDist: {
      path: rel(distPath),
      exists: existsSync(distPath),
      classification: 'L2_PACKAGE_INTERNAL_ARTIFACT',
      wheels,
      sdists
    },
    derivationProof: {
      path: rel(proofPath),
      exists: existsSync(proofPath)
    },
    blockers,
    plans: {
      build: {
        status: 'PLANNED_NOT_RUN',
        command: 'python -m build',
        note: 'Build is not executed by this no-publish harness.'
      },
      twineCheck: {
        status: blockers.length ? 'BLOCKED' : 'PLANNED_NOT_RUN',
        command: 'twine check dist/*',
        note: 'twine check belongs to a later verification goal.'
      },
      tempVenvInstall: {
        status: blockers.length ? 'BLOCKED' : 'PLANNED_NOT_RUN',
        command: 'python -m venv <tmp> && pip install <wheel>',
        note: 'Temp venv install is not executed by this harness.'
      },
      importSmoke: {
        status: blockers.length ? 'BLOCKED' : 'PLANNED_NOT_RUN',
        target: importTarget ? `import ${importTarget}` : null
      },
      versionSmoke: {
        status: hasVersion ? 'PLANNED_NOT_RUN' : 'NOT_AVAILABLE',
        target: hasVersion && importTarget ? `${importTarget}.__version__` : null
      }
    }
  };
}

function inspectPyPIPackages() {
  const pypiRoot = join(ROOT_DIR, 'packages', 'pypi');
  const pypiSet = loadPyPISet();
  const packageDirs = listDirectories(pypiRoot)
    .map((name) => join(pypiRoot, name))
    .filter((dir) =>
      existsSync(join(dir, 'pyproject.toml')) ||
      existsSync(join(dir, 'setup.cfg')) ||
      existsSync(join(dir, 'setup.py'))
    );
  const packages = packageDirs.map((dir) => inspectPyPIPackage(dir, pypiSet));
  return {
    root: {
      path: rel(pypiRoot),
      exists: existsSync(pypiRoot),
      classification: 'PYPI_PACKAGE_RELEASE_ROOT_PARENT'
    },
    pypiSetEvidence: {
      path: 'artifacts/release/pypi-set.json',
      exists: existsSync(join(ROOT_DIR, 'artifacts', 'release', 'pypi-set.json')),
      packageCount: pypiSet.length
    },
    packages,
    summary: summarizePackages(packages)
  };
}

function inspectSourceMirrors() {
  const sourcesRoot = join(ROOT_DIR, 'packages', 'sources');
  const mirrors = listDirectories(sourcesRoot).map((name) => {
    const mirrorRoot = join(sourcesRoot, name);
    const packageJsonPath = join(mirrorRoot, 'package.json');
    const pyprojectPath = join(mirrorRoot, 'pyproject.toml');
    const packageJson = existsSync(packageJsonPath) ? readJson(packageJsonPath) : null;
    const pyproject = existsSync(pyprojectPath)
      ? parseTomlProject(readFileSync(pyprojectPath, 'utf8'))
      : null;
    const distPath = join(mirrorRoot, 'dist');
    return {
      path: rel(mirrorRoot),
      classification: 'SOURCE_MIRROR_NOT_PUBLISH_ROOT',
      publishRoot: false,
      packageJson: packageJson
        ? {
            path: rel(packageJsonPath),
            name: packageJson.name || null,
            version: packageJson.version || null,
            private: packageJson.private === true,
            publishBlocked: packageJson.mplp?.publishBlocked === true,
            targetNpmPackage: packageJson.mplp?.targetNpmPackage || null
          }
        : null,
      pyproject: pyproject
        ? {
            path: rel(pyprojectPath),
            name: pyproject.project.name || null,
            version: pyproject.project.version || null,
            publishBlocked: pyproject.mplp.publishBlocked === true,
            targetPyPIPackage: pyproject.mplp.targetPyPIPackage || null
          }
        : null,
      packageInternalDist: {
        path: rel(distPath),
        exists: existsSync(distPath),
        classification: 'L2_SOURCE_MIRROR_ARTIFACT_BOUNDARY'
      }
    };
  });
  return {
    root: {
      path: rel(sourcesRoot),
      exists: existsSync(sourcesRoot),
      classification: 'SOURCE_MIRROR_PARENT_NOT_PUBLISH_ROOT'
    },
    mirrors
  };
}

function inspectRootDist() {
  const distPath = join(ROOT_DIR, 'dist');
  return {
    path: rel(distPath),
    exists: existsSync(distPath),
    classification: 'L2_GENERATED_PROJECTION_OUTPUT_NOT_PACKAGE_ROOT',
    publishRoot: false,
    note: 'Root dist is not treated as packages/npm or packages/pypi release root by this harness.'
  };
}

function summarizePackages(packages) {
  const summary = {};
  for (const item of packages) {
    summary[item.classification] = (summary[item.classification] || 0) + 1;
  }
  return {
    total: packages.length,
    byClassification: summary,
    blockers: packages.reduce((count, item) => count + (item.blockers?.length || 0), 0)
  };
}

function buildCorrectedModel() {
  return [
    {
      surface: 'packages/npm/**',
      correctRole: 'npm package distribution roots',
      sotLayer: 'L1 package release root',
      publishedFrom: 'Yes, after policy filtering',
      generated: false
    },
    {
      surface: 'packages/pypi/**',
      correctRole: 'PyPI package distribution roots',
      sotLayer: 'L1 package release root',
      publishedFrom: 'Yes, after policy filtering',
      generated: false
    },
    {
      surface: 'packages/sources/**',
      correctRole: 'source mirrors / preparation surfaces',
      sotLayer: 'L1 source mirror',
      publishedFrom: 'No',
      generated: 'Mixed'
    },
    {
      surface: 'root dist/**',
      correctRole: 'clean build / generated publication output',
      sotLayer: 'L2 generated projection',
      publishedFrom: 'Not direct package root by default',
      generated: true
    },
    {
      surface: 'packages/npm/<pkg>/dist/**',
      correctRole: 'npm package-internal compiled artifact',
      sotLayer: 'L2 package-internal artifact',
      publishedFrom: 'Included if manifest requires it',
      generated: true
    },
    {
      surface: 'packages/pypi/<pkg>/dist/**',
      correctRole: 'PyPI wheel/sdist artifact output',
      sotLayer: 'L2 package-internal artifact',
      publishedFrom: 'Upload source only after owner authorization',
      generated: true
    }
  ];
}

function collectPlaceholderGates(rootPackage, npmPackages) {
  const gates = [];
  for (const [name, script] of Object.entries(rootPackage.scripts || {})) {
    if (script.classification === 'PLACEHOLDER_NOT_REAL_PASS') {
      gates.push({
        scope: 'root',
        name,
        command: script.command,
        classification: 'PLACEHOLDER_NOT_REAL_PASS'
      });
    }
  }
  for (const pkg of npmPackages) {
    for (const placeholder of pkg.placeholderScripts || []) {
      gates.push({
        scope: pkg.name,
        name: placeholder.name,
        command: placeholder.command,
        classification: 'PLACEHOLDER_NOT_REAL_PASS'
      });
    }
  }
  return gates;
}

function buildReport(args) {
  const rootPackage = inspectRootPackage();
  const npm = inspectNpmPackages();
  const pypi = inspectPyPIPackages();
  const sourceMirrors = inspectSourceMirrors();
  const rootDist = inspectRootDist();
  const allBlockers = [
    ...npm.packages.flatMap((pkg) => pkg.blockers.map((blocker) => ({ package: pkg.name, ecosystem: 'npm', ...blocker }))),
    ...pypi.packages.flatMap((pkg) => pkg.blockers.map((blocker) => ({ package: pkg.name, ecosystem: 'pypi', ...blocker })))
  ];
  const placeholderGates = collectPlaceholderGates(rootPackage, npm.packages);

  return {
    schemaVersion: 'mplp.package-preflight-harness.v1',
    generatedAt: new Date().toISOString(),
    mode: args.mode,
    format: args.format,
    noPublish: true,
    strict: args.strict,
    status: 'PACKAGE_SURFACE_MODEL_VALIDATED',
    researchVerdict: allBlockers.length
      ? 'BLOCKED_PACKAGE_INTERNAL_ARTIFACT_MISSING'
      : 'PACKAGE_PREFLIGHT_RESEARCH_COMPLETE',
    correctedPackageSurfaceModel: buildCorrectedModel(),
    safety: {
      publishImplemented: false,
      uploadImplemented: false,
      registryMutationImplemented: false,
      versionMutationImplemented: false,
      buildImplemented: false,
      packImplemented: false,
      installImplemented: false,
      ownerAuthorizationBoundary: 'OWNER_AUTHORIZATION_REQUIRED'
    },
    distinctionRules: {
      releaseRootMissing: 'A package root is missing only when the package root directory or manifest is absent.',
      packageInternalArtifactMissing:
        'A missing package-internal dist reference blocks pack/install/import verification but does not invalidate the release root identity.',
      sourceMirrorOnly: 'packages/sources/** surfaces are source mirrors and must not enter Publish Set.',
      generatedProjectionOutput:
        'root dist/** is generated projection output, not the default npm/PyPI package root.',
      placeholderGate: 'Echo-only scripts are classified as PLACEHOLDER_NOT_REAL_PASS.',
      realGate: 'Non-placeholder package build/test commands are only planned here; they are not executed.',
      blockedByPolicy: 'private, ci_only, publishBlocked, CI-ONLY, INTERNAL, and SOURCE-MIRROR packages are not publish candidates.',
      ownerAuthorizationRequired:
        'Publish, upload, registry mutation, tag, seal, merge, version change, and credential access require owner authorization.'
    },
    evidenceConventions: {
      surfaceReport: 'artifacts/package-preflight/<goal-id>/surface-report.json',
      npmSurface: 'artifacts/package-preflight/<goal-id>/npm-surface.json',
      pypiSurface: 'artifacts/package-preflight/<goal-id>/pypi-surface.json',
      gateResults: 'artifacts/package-preflight/<goal-id>/gate-results.json',
      packPlan: 'artifacts/package-preflight/<goal-id>/pack-plan.json',
      installSmokePlan: 'artifacts/package-preflight/<goal-id>/install-smoke-plan.json',
      importSmokePlan: 'artifacts/package-preflight/<goal-id>/import-smoke-plan.json',
      noPublishCompliance: 'artifacts/package-preflight/<goal-id>/no-publish-compliance.json',
      classifications: [
        'PASS',
        'PASS_PLACEHOLDER',
        'PLACEHOLDER_NOT_REAL_PASS',
        'NOT_AVAILABLE',
        'NOT_RUN',
        'BLOCKED',
        'FAIL',
        'FAIL_PREEXISTING_OR_UNRELATED',
        'FAIL_PATCH_CAUSED'
      ]
    },
    rootPackage,
    npm,
    pypi,
    sourceMirrors,
    rootDist,
    placeholderGates,
    blockers: allBlockers,
    pr33ClassificationRule: {
      surface: 'packages/sources/sdk-ts/dist/**',
      sotLayer: 'L2/source mirror boundary',
      problem:
        'Tracked ignored source mirror dist with legacy owner strings is a provenance and evidence-overclaim risk, not a direct dist cleanup authorization.',
      allowedFutureAction: [
        'revalidate under derivation matrix',
        'correct evidence record if overclaimed',
        'regenerate artifact only if upstream source and generator are proven',
        'otherwise stop for DIST_AS_TRACKED_SOURCE_EXCEPTION decision'
      ],
      forbiddenFutureAction: [
        'direct patch dist without provenance/exception',
        'claim release readiness from dist-only cleanup'
      ]
    },
    finalVerdictVocabulary: [
      'PACKAGE_SURFACE_MODEL_VALIDATED',
      'PACKAGE_PREFLIGHT_RESEARCH_COMPLETE',
      'READY_FOR_NPM_PYPI_PREFLIGHT_RERUN',
      'BLOCKED_PACKAGE_INTERNAL_ARTIFACT_MISSING',
      'BLOCKED_PACKAGE_SURFACE_UNCLEAR',
      'BLOCKED_OWNER_DECISION_REQUIRED',
      'BLOCKED_PLACEHOLDER_GATES_ONLY',
      'BLOCKED_DIST_AS_TRACKED_SOURCE_EXCEPTION_REQUIRED',
      'BLOCKED_PACKAGE_ARTIFACT_MISMATCH',
      'BLOCKED_PREFLIGHT_SCRIPT_FAILURE'
    ]
  };
}

function writeReportIfRequested(report, outPath) {
  if (!outPath) {
    return null;
  }
  const absoluteOut = outPath.startsWith('/') ? outPath : join(ROOT_DIR, outPath);
  mkdirSync(dirname(absoluteOut), { recursive: true });
  writeFileSync(absoluteOut, `${JSON.stringify(report, null, 2)}\n`);
  return rel(absoluteOut);
}

function main() {
  let args;
  try {
    args = parseArgs(process.argv.slice(2));
  } catch (error) {
    console.error(JSON.stringify({
      status: 'BLOCKED_PREFLIGHT_SCRIPT_FAILURE',
      error: error.message
    }, null, 2));
    process.exit(1);
  }

  const report = buildReport(args);
  const outputPath = writeReportIfRequested(report, args.out);
  if (outputPath) {
    report.outputPath = outputPath;
  }

  console.log(JSON.stringify(report, null, 2));

  if (args.strict && report.blockers.length) {
    process.exit(1);
  }
}

main();
