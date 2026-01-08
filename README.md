# MPLP — Multi-Agent Lifecycle Protocol

> **Repository Role:** Source of Truth  
> **Protocol Version:** v1.0.0 — FROZEN  
> **License:** Apache-2.0

**MPLP is a vendor-neutral lifecycle protocol for AI agent systems — defining how agents are created, operated, audited, and decommissioned.**

*Not a framework. Not a runtime. Not a platform.*

---

## This Repository Is the Source of Truth

This repository hosts the **canonical source artifacts** of MPLP.

It is the **single authoritative location** for:

- Protocol schemas (frozen)
- Reference SDK source packages
- Golden Flow tests & Cross-language validation
- Documentation source (docs.mplp.io)
- Governance constitution files
- Conformance & Interoperability definitions

**This repository is not a marketing site and not a tutorial.**

---

## Three-Entry Model

MPLP uses a three-entry model. Each surface has a strict, non-overlapping role.

| Surface | Role | Purpose |
|---------|------|---------|
| **Website** | Protocol Legitimacy & Evaluation Entry | Establish MPLP as a defined, governed, evaluable protocol |
| **Documentation** | Specification & Reference | Explain how the protocol works |
| **Repository (this)** | Source of Truth | Schemas, code, tests, governance |

**Choose the correct entry:**

- 👉 **New to MPLP?** Start at **[https://www.mplp.io](https://www.mplp.io)**
- 👉 **Implementing MPLP?** Read **[https://docs.mplp.io](https://docs.mplp.io)**
- 👉 **Auditing or building against MPLP?** You are in the right place

---

## Repository Structure

```
.
├── schemas/                  # Frozen protocol schemas (v2)
│   └── v2/                   # 10 module schemas + invariants + events
├── packages/                 # Reference SDKs
│   ├── npm/                  # TypeScript packages (@mplp/*)
│   ├── pypi/                 # Python SDK (mplp-sdk)
│   └── sources/              # SDK source code
├── tests/                    # Protocol validation suites
│   ├── golden/               # Golden Flow tests (9 flows)
│   │   ├── flows/            # Flow implementations
│   │   ├── harness/          # Test harness
│   │   └── invariants/       # Invariant checks
│   ├── cross-language/       # Cross-language validation
│   │   ├── builders/         # Builder tests
│   │   ├── runtime/          # Runtime tests
│   │   └── validation/       # Validation tests
│   ├── runtime-compat/       # Runtime compatibility tests
│   └── schema-alignment/     # Schema alignment tests
├── docs/                     # Documentation source (docs.mplp.io)
├── governance/               # Constitution & governance files
│   └── 01-constitutional/    # CONST-001 to CONST-006
├── examples/                 # Usage examples (multi-language)
│   ├── ts-single-agent-basic/
│   ├── ts-multi-agent-collab/
│   ├── py-basic-flow/
│   ├── go-basic-flow/
│   ├── java-basic-flow/
│   └── integration/
├── scripts/                  # Build & validation scripts
│   └── semantic/             # Semantic linting tools
└── assets/                   # Diagrams & brand resources
```

---

## Protocol Status

- **Protocol Version:** MPLP v1.0.0
- **Specification State:** FROZEN (no breaking changes permitted)
- **Schemas:** Frozen under `schemas/v2/`
- **Golden Flows:** 9 flows verified (GF-01–05, SA-01–02, MAP-01–02)
- **Reference Implementations:** Partial by design (non-normative)

> **Note:**
> Absence of a reference SDK implementation does not imply a module is experimental.
> Protocol obligations are defined by schemas and specifications, not by SDK coverage.

---

## Test Suites

MPLP provides comprehensive test suites for protocol validation:

### Golden Flows

| Flow ID | Name | Profile |
|---------|------|---------|
| `flow-01` | Single Agent – Happy Path | Core |
| `flow-02` | Single Agent – Large Plan | Core |
| `flow-03` | Single Agent – With Tools | Core |
| `flow-04` | Single Agent – LLM Enrichment | Core |
| `flow-05` | Single Agent – Confirm Required | Core |
| `sa-flow-01` | SA Profile – Basic | SA Profile |
| `sa-flow-02` | SA Profile – Step Evaluation | SA Profile |
| `map-flow-01` | MAP Profile – Turn Taking | MAP Profile |
| `map-flow-02` | MAP Profile – Broadcast Fanout | MAP Profile |

### Validation Suites

- **Cross-Language Tests:** Validate consistent behavior across TypeScript, Python, Go
- **Runtime Compatibility:** Ensure runtime implementations conform to protocol
- **Schema Alignment:** Verify schema consistency across modules

---

## Conformance & Interoperability

MPLP defines **Interoperability Levels** (not certification tiers) to ensure consistent behavior across different runtimes.

- **L1 (Schema):** Data interoperability (valid JSON)
- **L2 (Governance):** Module semantics & lifecycle interoperability
- **L3 (Behavioral):** Runtime evidence & Golden Flow interoperability

Any claim of "MPLP Interoperability" should map to these definitions.

---

## Reference SDKs

The following SDKs are maintained as **Reference Implementations** of the protocol.

### TypeScript Standard Library (`@mplp/*`)

| Package | Description | Version | Links |
|:--------|:------------|:--------|:------|
| **`@mplp/sdk-ts`** | Main Entry Point (Developer SDK) | `v1.0.6` | [npm](https://www.npmjs.com/package/@mplp/sdk-ts) |
| `@mplp/core` | L1 Protocol Primitives & Types | `v1.0.6` | [npm](https://www.npmjs.com/package/@mplp/core) |
| `@mplp/schema` | JSON Schema Validators | `v1.0.5` | [npm](https://www.npmjs.com/package/@mplp/schema) |
| `@mplp/coordination` | L2 Coordination & State Machine | `v1.0.6` | [npm](https://www.npmjs.com/package/@mplp/coordination) |
| `@mplp/modules` | L2 Governance Modules | `v1.0.5` | [npm](https://www.npmjs.com/package/@mplp/modules) |
| `@mplp/conformance` | Conformance Kit & Validation | `v1.0.0` | [npm](https://www.npmjs.com/package/@mplp/conformance) |
| `@mplp/compliance` | [LEGACY] Use @mplp/conformance | `v1.0.5` | [npm](https://www.npmjs.com/package/@mplp/compliance) |
| `@mplp/runtime-minimal` | Reference Runtime Implementation | `v1.0.5` | [npm](https://www.npmjs.com/package/@mplp/runtime-minimal) |
| `@mplp/devtools` | CLI & Debugging Tools | `v1.0.5` | [npm](https://www.npmjs.com/package/@mplp/devtools) |

### Python SDK

| Package | Description | Version | Links |
|:--------|:------------|:--------|:------|
| **`mplp-sdk`** | Main Entry Point (Developer SDK) | `v1.0.4` | [PyPI](https://pypi.org/project/mplp-sdk/) |

---

## What This Repository Does NOT Do

To maintain clear boundaries, this repository explicitly does not:

- Provide marketing or positioning narratives
- Replace the official documentation site
- Offer certification or compliance guarantees
- Endorse vendors, runtimes, or agent frameworks
- Act as a tutorial or learning platform

---

## Documentation

The official documentation is built from `/docs` and published at:

👉 **[https://docs.mplp.io](https://docs.mplp.io)**

Documentation includes:

- Architecture (L1–L4)
- All L2 modules (Context, Plan, Confirm, Trace, Role, Dialog, Collab, Extension, Core, Network)
- Golden Flows (evaluation scenarios)
- Standards mappings (ISO / NIST / W3C — informative only)
- Governance, versioning, and change control

---

## Governance

- **Protocol Governance:** MPGC (MPLP Protocol Governance Committee)
- **Constitution Files:** Located in `governance/01-constitutional/`
  - `CONST-001` — Entry Model Specification
  - `CONST-002` — Document Format Specification
  - `CONST-003` — Frozen Header Specification
  - `CONST-004` — Doc Audit Methodology
  - `CONST-005` — Authoring Constitution
  - `CONST-006` — Document Type Outlines & Depth Rules

Any change that affects schemas or protocol semantics follows the MPGC process.

---

## Contributing

This repository accepts contributions within defined governance boundaries.

Before proposing changes, review the constitution files in `governance/01-constitutional/`.

Pull requests that introduce new protocol semantics, schema changes, or compliance claims will be reviewed under MPGC governance.

---

## License

Apache License 2.0  
© 2026 Bangshi Beijing Network Technology Limited Company

---

## Final Note

If you are reading this README expecting a tutorial or a sales pitch,
**you are intentionally in the wrong place**.

This repository exists to ensure that:

> **MPLP remains observable, governed, and vendor-neutral at the protocol level.**