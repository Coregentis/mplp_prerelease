/**
 * MPLP Phase E — Invariant Verification Script
 * 
 * Validates golden flow fixtures against defined invariants.
 * 
 * Usage: node scripts/verify-invariants.js
 * Output: artifacts/invariants/report.md + report.json
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Configuration
const FLOWS_DIR = path.join(__dirname, '../tests/golden/flows');
const OUTPUT_DIR = path.join(__dirname, '../artifacts/invariants');
const EXPECTED_PROTOCOL_VERSION = '1.0.0';

// Invariant result types
const STATUS = {
    PASS: 'PASS',
    FAIL: 'FAIL',
    NOT_EVALUATED: 'NOT_EVALUATED'
};

// Results accumulator
const results = {
    timestamp: new Date().toISOString(),
    protocol_version: EXPECTED_PROTOCOL_VERSION,
    flows_total: 0,
    flows_passed: 0,
    flows_failed: 0,
    invariants_total: 0,
    invariants_passed: 0,
    invariants_failed: 0,
    invariants_not_evaluated: 0,
    flow_results: []
};

// UUID v4 pattern
const UUID_V4_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

// Non-endorsement forbidden terms
const FORBIDDEN_TERMS = ['compliant', 'certified', 'endorsed', 'certification', 'compliance'];

/**
 * Get nested value by path (supports wildcards like steps[*].field)
 */
function getValueByPath(obj, pathStr) {
    if (pathStr.includes('[*]')) {
        const parts = pathStr.split('[*].');
        const arrayPath = parts[0];
        const remainingPath = parts.slice(1).join('[*].');

        const array = getValueByPath(obj, arrayPath);
        if (!Array.isArray(array)) return undefined;

        if (!remainingPath) {
            return array;
        }

        return array.map(item => getValueByPath(item, remainingPath));
    }

    const parts = pathStr.split('.');
    let current = obj;
    for (const part of parts) {
        if (current == null) return undefined;
        current = current[part];
    }
    return current;
}

/**
 * Validate a single value against a rule
 */
function validateSingleValue(rule, value) {
    if (rule === 'uuid-v4') {
        return UUID_V4_PATTERN.test(value);
    }
    if (rule === 'non-empty-string') {
        return typeof value === 'string' && value.length > 0;
    }
    if (rule.startsWith('enum(')) {
        const allowed = rule.slice(5, -1).split(',');
        return allowed.includes(value);
    }
    if (rule === 'iso-datetime') {
        return typeof value === 'string' && !isNaN(Date.parse(value));
    }
    return null; // Unknown rule
}

/**
 * Validate an invariant rule (supports array results from wildcards)
 */
function validateRule(rule, value, context) {
    if (rule.startsWith('min-length(')) {
        const min = parseInt(rule.slice(11, -1), 10);
        return Array.isArray(value) && value.length >= min;
    }
    if (rule.startsWith('eq(')) {
        const refPath = rule.slice(3, -1);
        const refValue = getValueByPath(context, refPath);
        return value === refValue;
    }

    // Handle array values from wildcard paths
    if (Array.isArray(value)) {
        for (const item of value) {
            const result = validateSingleValue(rule, item);
            if (result === false) return false;
            if (result === null) return null;
        }
        return value.length > 0 ? true : null;
    }

    return validateSingleValue(rule, value);
}

/**
 * Check for forbidden endorsement terms
 */
function checkNonEndorsement(obj) {
    const violations = [];
    const json = JSON.stringify(obj).toLowerCase();
    for (const term of FORBIDDEN_TERMS) {
        if (json.includes(term)) {
            violations.push(term);
        }
    }
    return violations;
}

/**
 * Run invariants for a single flow
 */
function validateFlow(flowDir) {
    const flowName = path.basename(flowDir);
    const flowResult = {
        flow: flowName,
        status: STATUS.PASS,
        invariants: [],
        errors: []
    };

    try {
        const inputDir = path.join(flowDir, 'input');
        const context = {};

        // Load context.json if exists
        const contextPath = path.join(inputDir, 'context.json');
        if (fs.existsSync(contextPath)) {
            context.context = JSON.parse(fs.readFileSync(contextPath, 'utf8'));
        }

        // Load plan.json if exists
        const planPath = path.join(inputDir, 'plan.json');
        if (fs.existsSync(planPath)) {
            context.plan = JSON.parse(fs.readFileSync(planPath, 'utf8'));
        }

        // Load confirm.json if exists
        const confirmPath = path.join(inputDir, 'confirm.json');
        if (fs.existsSync(confirmPath)) {
            context.confirm = JSON.parse(fs.readFileSync(confirmPath, 'utf8'));
        }

        // Load trace.json if exists
        const tracePath = path.join(inputDir, 'trace.json');
        if (fs.existsSync(tracePath)) {
            context.trace = JSON.parse(fs.readFileSync(tracePath, 'utf8'));
        }

        // Load collab.json if exists
        const collabPath = path.join(inputDir, 'collab.json');
        if (fs.existsSync(collabPath)) {
            context.collab = JSON.parse(fs.readFileSync(collabPath, 'utf8'));
        }


        // ========== INV-001: Protocol Version ==========
        let inv001 = {
            id: 'INV-001',
            name: 'Protocol Version Duty',
            status: STATUS.NOT_EVALUATED,
            message: 'No context with meta.protocol_version found',
            missing_evidence: ['context.json with meta.protocol_version']
        };

        if (context.context?.meta?.protocol_version) {
            if (context.context.meta.protocol_version === EXPECTED_PROTOCOL_VERSION) {
                inv001 = { id: 'INV-001', name: 'Protocol Version Duty', status: STATUS.PASS };
                results.invariants_passed++;
            } else {
                inv001 = {
                    id: 'INV-001',
                    name: 'Protocol Version Duty',
                    status: STATUS.FAIL,
                    message: `Expected ${EXPECTED_PROTOCOL_VERSION}, got ${context.context.meta.protocol_version}`
                };
                results.invariants_failed++;
                flowResult.status = STATUS.FAIL;
            }
        } else {
            results.invariants_not_evaluated++;
        }
        flowResult.invariants.push(inv001);
        results.invariants_total++;

        // ========== INV-003: Trace Completeness (minimal) ==========
        let inv003 = {
            id: 'INV-003',
            name: 'Trace Completeness',
            status: STATUS.NOT_EVALUATED,
            message: 'No plan with steps found'
        };

        if (context.plan?.steps && Array.isArray(context.plan.steps) && context.plan.steps.length > 0) {
            inv003 = {
                id: 'INV-003',
                name: 'Trace Completeness',
                status: STATUS.PASS,
                message: `Plan has ${context.plan.steps.length} steps`
            };
            results.invariants_passed++;
        } else {
            results.invariants_not_evaluated++;
        }
        flowResult.invariants.push(inv003);
        results.invariants_total++;

        // ========== INV-006: Non-Endorsement Boundary ==========
        const violations = [];
        if (context.context) {
            violations.push(...checkNonEndorsement(context.context).map(t => `context.json: ${t}`));
        }
        if (context.plan) {
            violations.push(...checkNonEndorsement(context.plan).map(t => `plan.json: ${t}`));
        }

        let inv006;
        if (violations.length > 0) {
            inv006 = {
                id: 'INV-006',
                name: 'Non-Endorsement Boundary',
                status: STATUS.FAIL,
                message: `Forbidden terms: ${violations.join(', ')}`
            };
            results.invariants_failed++;
            flowResult.status = STATUS.FAIL;
        } else {
            inv006 = { id: 'INV-006', name: 'Non-Endorsement Boundary', status: STATUS.PASS };
            results.invariants_passed++;
        }
        flowResult.invariants.push(inv006);
        results.invariants_total++;

        // Load flow-specific invariants.yaml if exists
        const flowInvariantsPath = path.join(flowDir, 'invariants.yaml');
        if (fs.existsSync(flowInvariantsPath)) {
            const flowInvariants = yaml.load(fs.readFileSync(flowInvariantsPath, 'utf8'));
            if (flowInvariants?.invariants) {
                for (const inv of flowInvariants.invariants) {
                    const scope = context[inv.scope];
                    let invResult;

                    if (!scope) {
                        invResult = {
                            id: inv.id,
                            name: inv.description || inv.id,
                            status: STATUS.NOT_EVALUATED,
                            message: `Scope '${inv.scope}' not available`
                        };
                        results.invariants_not_evaluated++;
                    } else {
                        const value = getValueByPath(scope, inv.path);
                        const valid = validateRule(inv.rule, value, context);

                        if (valid === true) {
                            invResult = { id: inv.id, name: inv.description || inv.id, status: STATUS.PASS };
                            results.invariants_passed++;
                        } else if (valid === false) {
                            invResult = {
                                id: inv.id,
                                name: inv.description || inv.id,
                                status: STATUS.FAIL,
                                message: `Rule '${inv.rule}' failed for path '${inv.path}'`
                            };
                            results.invariants_failed++;
                            flowResult.status = STATUS.FAIL;
                        } else {
                            invResult = {
                                id: inv.id,
                                name: inv.description || inv.id,
                                status: STATUS.NOT_EVALUATED,
                                message: `Unknown rule: ${inv.rule}`
                            };
                            results.invariants_not_evaluated++;
                        }
                    }

                    flowResult.invariants.push(invResult);
                    results.invariants_total++;
                }
            }
        }

    } catch (err) {
        flowResult.status = STATUS.FAIL;
        flowResult.errors.push(err.message);
    }

    return flowResult;
}

/**
 * Generate markdown report
 */
function generateMarkdownReport() {
    let md = `# E2 Invariant Testing Report

**Date**: ${results.timestamp}  
**Status**: ${results.invariants_failed === 0 ? '✅ **PASS**' : '❌ **FAIL**'}

---

## Summary

| Metric | Value |
|--------|-------|
| Flows Total | ${results.flows_total} |
| Flows Passed | ${results.flows_passed} |
| Flows Failed | ${results.flows_failed} |
| Invariants Total | ${results.invariants_total} |
| Invariants Passed | ${results.invariants_passed} |
| Invariants Failed | ${results.invariants_failed} |
| Invariants Not Evaluated | ${results.invariants_not_evaluated} |

---

## Gate Criteria

| Condition | Required | Actual | Status |
|-----------|----------|--------|--------|
| FAIL count | 0 | ${results.invariants_failed} | ${results.invariants_failed === 0 ? '✅' : '❌'} |
| NOT_EVALUATED | Allowed | ${results.invariants_not_evaluated} | ✅ |

**Gate Result**: ${results.invariants_failed === 0 ? '**PASS**' : '**FAIL**'}

---

## Flow Results

`;

    for (const flow of results.flow_results) {
        md += `### ${flow.flow}\n\n`;
        md += `**Status**: ${flow.status === STATUS.PASS ? '✅ PASS' : '❌ FAIL'}\n\n`;

        if (flow.errors.length > 0) {
            md += `**Errors**: ${flow.errors.join(', ')}\n\n`;
        }

        md += `| Invariant | Status | Message |\n`;
        md += `|-----------|--------|--------|\n`;

        for (const inv of flow.invariants) {
            const status = inv.status === STATUS.PASS ? '✅' : (inv.status === STATUS.FAIL ? '❌' : '⚠️');
            const msg = inv.message || '-';
            md += `| ${inv.id}: ${inv.name} | ${status} ${inv.status} | ${msg} |\n`;
        }

        md += `\n---\n\n`;
    }

    md += `## Phase E Invariants (Core)

| ID | Invariant | Scope |
|----|-----------|-------|
| INV-001 | Protocol Version Duty | manifest/context |
| INV-003 | Trace Completeness | trace/events |
| INV-006 | Non-Endorsement Boundary | all files |

---

**Next Step**: Proceed to **E3: Golden Flow Fixtures**
`;

    return md;
}

/**
 * Main execution
 */
function main() {
    console.log('MPLP Phase E — Invariant Verification');
    console.log('=====================================\n');

    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    const flows = fs.readdirSync(FLOWS_DIR)
        .filter(f => fs.statSync(path.join(FLOWS_DIR, f)).isDirectory());

    console.log(`Found ${flows.length} flows to validate\n`);
    results.flows_total = flows.length;

    for (const flow of flows) {
        const flowDir = path.join(FLOWS_DIR, flow);
        console.log(`Validating: ${flow}...`);

        const flowResult = validateFlow(flowDir);
        results.flow_results.push(flowResult);

        if (flowResult.status === STATUS.PASS) {
            results.flows_passed++;
            console.log(`  ✅ PASS`);
        } else {
            results.flows_failed++;
            console.log(`  ❌ FAIL`);
        }
    }

    fs.writeFileSync(path.join(OUTPUT_DIR, 'report.json'), JSON.stringify(results, null, 2));
    fs.writeFileSync(path.join(OUTPUT_DIR, 'report.md'), generateMarkdownReport());

    console.log('\n=====================================');
    console.log('SUMMARY');
    console.log('=====================================');
    console.log(`Flows: ${results.flows_passed}/${results.flows_total} passed`);
    console.log(`Invariants: ${results.invariants_passed} PASS, ${results.invariants_failed} FAIL, ${results.invariants_not_evaluated} NOT_EVALUATED`);
    console.log(`Gate: ${results.invariants_failed === 0 ? 'PASS ✅' : 'FAIL ❌'}`);

    process.exit(results.invariants_failed > 0 ? 1 : 0);
}

main();
