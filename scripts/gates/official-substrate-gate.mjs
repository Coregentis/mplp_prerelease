#!/usr/bin/env node
/**
 * SUB-GATE-01: Official Substrate Package Verification
 * Purpose: Static verification that v0.2 upgraded runs use official packages
 * Mode: Static (no execution required) - FAIL-FAST if missing/unpinned
 */

import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

function loadAllowlist(filepath) {
  const doc = yaml.load(fs.readFileSync(filepath, 'utf-8'));
  if (Array.isArray(doc)) return doc;
  if (doc.runs && Array.isArray(doc.runs)) return doc.runs;
  throw new Error(`Unsupported allowlist structure`);
}

try {
  const allowlist = loadAllowlist('Validation_Lab/data/curated-runs/allowlist.yaml');
  const upgradedRuns = allowlist.filter(r => r.run_id && r.run_id.includes('-official-v0.2'));

  if (upgradedRuns.length === 0) {
    console.error('❌ FAIL: No v0.2 upgraded runs found in allowlist');
    process.exit(1);
  }

  console.log(`Checking ${upgradedRuns.length} upgraded runs...\n`);

  for (const run of upgradedRuns) {
    const reproRef = run.repro_ref;
    if (!reproRef) {
      console.error(`❌ FAIL: ${run.run_id} missing repro_ref`);
      process.exit(1);
    }

    const reproDir = path.dirname(reproRef);

    // Check LangChain
    if (run.substrate === 'langchain') {
      const reqPath = path.join(reproDir, 'requirements.txt');

      if (!fs.existsSync(reqPath)) {
        console.error(`❌ FAIL: ${run.run_id} missing ${reqPath}`);
        process.exit(1);
      }

      const reqs = fs.readFileSync(reqPath, 'utf-8');

      if (!reqs.match(/^langchain==\d+\.\d+\.\d+$/m)) {
        console.error(`❌ FAIL: ${run.run_id} langchain not pinned in ${reqPath}`);
        process.exit(1);
      }

      if (!reqs.match(/^langchain-community==\d+\.\d+\.\d+$/m)) {
        console.error(`❌ FAIL: ${run.run_id} langchain-community not pinned in ${reqPath}`);
        process.exit(1);
      }

      console.log(`  ✓ ${run.run_id}: LangChain packages pinned`);
    }

    // Check A2A
    if (run.substrate === 'a2a') {
      const reqPath = path.join(reproDir, 'requirements.txt');

      if (!fs.existsSync(reqPath)) {
        console.error(`❌ FAIL: ${run.run_id} missing ${reqPath}`);
        process.exit(1);
      }

      const reqs = fs.readFileSync(reqPath, 'utf-8');

      if (!reqs.match(/^a2a-sdk==\d+\.\d+\.\d+$/m)) {
        console.error(`❌ FAIL: ${run.run_id} a2a-sdk not pinned in ${reqPath}`);
        process.exit(1);
      }

      console.log(`  ✓ ${run.run_id}: A2A SDK pinned`);
    }

    // Check MCP
    if (run.substrate === 'mcp') {
      const pkgPath = path.join(reproDir, 'package.json');

      if (!fs.existsSync(pkgPath)) {
        console.error(`❌ FAIL: ${run.run_id} missing ${pkgPath}`);
        process.exit(1);
      }

      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
      const hasDep = pkg.dependencies && pkg.dependencies['@modelcontextprotocol/server'];
      const hasDevDep = pkg.devDependencies && pkg.devDependencies['@modelcontextprotocol/server'];

      if (!hasDep && !hasDevDep) {
        console.error(`❌ FAIL: ${run.run_id} missing @modelcontextprotocol/server in ${pkgPath}`);
        process.exit(1);
      }

      console.log(`  ✓ ${run.run_id}: MCP server SDK present`);
    }
  }

  console.log(`\n✅ All ${upgradedRuns.length} upgraded runs use official packages`);
  process.exit(0);

} catch (error) {
  console.error(`\n❌ SUB-GATE-01 FAILED:\n${error.message}\n`);
  process.exit(1);
}
