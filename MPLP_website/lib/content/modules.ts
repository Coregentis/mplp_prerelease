export const modules = [
    {
        id: "context",
        name: "Context Module",
        desc: "Normative root anchor for execution scope, domain, and constraints.",
        purpose: "Defines the root anchor for Plans, Traces, and Roles, encapsulating domain, environment, and constraints.",
        status: "Frozen",
        seoTier: "A",
        metaDescription: "Defines the normative semantics, constraints, and interaction model of the Context module in the MPLP protocol.",
        icon: "🧠",
        schema: {
            required: ["meta", "context_id", "root", "title", "status"],
            optional: ["summary", "tags", "language", "owner_role", "constraints", "created_at", "updated_at", "trace", "events", "governance"],
            rootObject: {
                required: ["domain", "environment"],
                example: { domain: "backend", environment: "production", entry_point: "services/auth/" }
            }
        },
        lifecycle: {
            statusEnum: ["draft", "active", "archived", "deleted"],
            semantics: "Contexts are stable once archived."
        },
        protocolRole: `The Context module serves as the **semantic root anchor** for all MPLP executions.

It defines the **execution boundary** within which Plans, Traces, Roles, and Collaborations operate.
Every MPLP-conformant execution **MUST** begin with a valid Context.

Within the MPLP lifecycle, Context is responsible for:
* Establishing the **domain scope** (e.g., backend, frontend, data-pipeline),
* Declaring the **execution environment** (e.g., production, staging, development),
* Defining **constraints** that govern downstream behavior,
* Providing **traceability anchor** for all child artifacts.

Context does **not** define execution logic; it provides the **normative boundary conditions** that all other modules inherit.`,
        interactionModel: `The Context module operates as the **root node** of the MPLP artifact graph.

### Dependents (Modules that reference Context)
* **Plan**: Every Plan MUST reference a valid \`context_id\`.
* **Trace**: Every Trace MUST be anchored to a Context.
* **Collab**: Collaborative sessions inherit their scope from Context.
* **Role**: Role assignments are scoped within a Context.
* **Dialog**: Conversations operate within a Context boundary.

### Emissions & Observability
* Context creation and status changes MUST emit traceable events.
* Context constraints are inherited by all dependent artifacts.

### Usage in Golden Flows
The Context module is the **entry point** for all normative execution patterns:
* **Golden Flow 01** — Single-Agent Task Execution
* **Golden Flow 02** — Multi-Step Planning
* **Golden Flow 03** — Multi-Agent Task Coordination`,
        normativeConstraints: `The following constraints are **normative** and MUST be enforced by any MPLP-conformant implementation:

1. Every MPLP execution **MUST** begin with a valid Context.
2. A Context **MUST** declare a \`domain\` and \`environment\` in its \`root\` object.
3. A Context **MUST NOT** be modified after transitioning to \`archived\` status.
4. Child artifacts (Plans, Traces, etc.) **MUST** reference an existing \`context_id\`.
5. Context constraints **MUST** be inherited by all dependent artifacts unless explicitly overridden.
6. Context status transitions **MUST** be traceable and auditable.

Failure to meet these constraints results in a non-conformant execution.`,
        invariants: `The following invariants define the **stability guarantees** of a Context:

* A Context defines a **single semantic domain**.
* A Context MAY evolve, but its **domain identity MUST remain stable**.
* Archived Contexts **MUST NOT be mutated**.
* All dependent artifacts **inherit Context constraints implicitly**.`,
        failureSemantics: `Any execution referencing an **invalid, missing, or incompatible Context** is considered non-conformant and **MUST be rejected**.`
    },
    {
        id: "plan",
        name: "Plan Module",
        desc: "Normative execution blueprint: reasoning structure and step dependencies.",
        purpose: "Defines the Plan object as a Directed Acyclic Graph (DAG) of executable steps with dependency management.",
        status: "Frozen",
        seoTier: "A",
        metaDescription: "Defines the normative execution structure, reasoning semantics, and constraints of the Plan module in the MPLP protocol.",
        icon: "🗺️",
        schema: {
            required: ["meta", "plan_id", "context_id", "title", "objective", "status", "steps"],
            optional: ["trace", "events"],
            stepObject: {
                required: ["step_id", "description", "status"],
                optional: ["dependencies", "agent_role", "order_index"]
            }
        },
        lifecycle: {
            statusEnum: ["draft", "proposed", "approved", "in_progress", "completed", "failed", "cancelled"],
            stepStatusEnum: ["pending", "in_progress", "completed", "failed", "blocked", "skipped"]
        },
        protocolRole: `The Plan module defines the **deterministic reasoning structure** for task execution in MPLP.

It represents the **intent layer** — what an agent (or system) intends to do, decomposed into a Directed Acyclic Graph (DAG) of executable steps.

Within the MPLP lifecycle, Plan is responsible for:
* Declaring a clear **objective** with measurable outcomes,
* Decomposing complex tasks into **ordered, dependency-aware steps**,
* Enabling **human-in-the-loop approval** before execution begins,
* Providing **auditability** of reasoning before action.

Plan does **not** execute actions; it provides the **normative execution blueprint** that orchestration layers follow.`,
        interactionModel: `The Plan module operates as the **execution intent layer** between Context and Trace.

### Dependencies
* **Context**: Every Plan MUST reference a valid \`context_id\`.
* **Role**: Steps MAY specify an \`agent_role\` for assignment.

### Emissions & Observability
* **Trace**: Plan execution generates Trace segments for each step.
* **Confirm**: Plan approval MAY require HITL confirmation before status transitions.

### Usage in Golden Flows
The Plan module is central to:
* **Golden Flow 01** — Single-Agent Task Execution
* **Golden Flow 02** — Multi-Step Planning
* **Golden Flow 04** — Approval-Gated Execution`,
        normativeConstraints: `The following constraints are **normative** and MUST be enforced by any MPLP-conformant implementation:

1. A Plan **MUST** reference a valid \`context_id\`.
2. A Plan **MUST** declare an \`objective\` that describes the intended outcome.
3. Steps **MUST** be structured as a DAG; circular dependencies are **INVALID**.
4. Step status transitions **MUST** follow the defined lifecycle (pending → in_progress → completed/failed).
5. A Plan **MUST NOT** transition to \`in_progress\` without explicit approval when governance requires it.
6. All step completions **MUST** be traceable and auditable.

Failure to meet these constraints results in a non-conformant execution.`
    },
    {
        id: "confirm",
        name: "Confirm Module",
        desc: "Governance gate for approval-controlled execution.",
        purpose: "Handles Human-in-the-Loop (HITL) approvals, decision tracking, and learning signal capture.",
        status: "Frozen",
        seoTier: "B",
        metaDescription: "Defines supporting protocol semantics for confirmation and governance triggers within the MPLP standard.",
        icon: "✅",
        schema: {
            required: ["meta", "confirm_id", "target_type", "target_id", "status", "requested_by_role", "requested_at"],
            optional: ["reason", "decisions", "trace", "events", "governance"],
            targetTypes: ["context", "plan", "trace", "extension", "other"],
            decisionObject: {
                required: ["decision_id", "status", "decided_by_role", "decided_at"],
                statusEnum: ["approved", "rejected", "cancelled"]
            }
        },
        lifecycle: {
            statusEnum: ["pending", "approved", "rejected", "cancelled"]
        },
        protocolRole: `The Confirm module defines **when execution requires explicit approval**.

It acts as a **decision gate** — declaring that a transition or action cannot proceed without confirmation.

Confirm does NOT make decisions; it **triggers the need for one**.`,
        interactionModel: `### Triggers
* **Plan**: Step transitions MAY require confirmation.
* **Collab**: Participant changes MAY trigger confirmation.

### Integration
* **Role / Governance**: Determines who can approve.
* **Trace**: All confirmation results MUST be recorded.`,
        keyConstraints: `1. Execution **MUST NOT** proceed without required confirmation.
2. Confirmation results **MUST** be traceable.
3. Confirm MAY be mediated by human or system.`
    },
    {
        id: "trace",
        name: "Trace Module",
        desc: "Evidence-grade execution audit: reasoning history and observability.",
        purpose: "Captures structured, replayable execution history as W3C-compatible spans and segments for auditing and debugging.",
        status: "Frozen",
        seoTier: "A",
        metaDescription: "Defines the evidence-grade audit layer, execution history, and observability semantics of the Trace module in the MPLP protocol.",
        icon: "📜",
        schema: {
            required: ["meta", "trace_id", "context_id", "root_span", "status"],
            optional: ["plan_id", "started_at", "finished_at", "segments", "events", "governance"],
            segmentObject: {
                required: ["segment_id", "label", "status"],
                optional: ["parent_segment_id", "started_at", "finished_at", "attributes"]
            }
        },
        lifecycle: {
            statusEnum: ["pending", "running", "completed", "failed", "cancelled"],
            invariant: "Terminal status traces are stable and append-only."
        },
        protocolRole: `The Trace module provides the **evidence-grade audit layer** for all MPLP executions.

It captures the **execution history** — what actually happened during Plan execution — as W3C-compatible spans and segments.

Within the MPLP lifecycle, Trace is responsible for:
* Recording **what happened** (actions, decisions, state changes),
* Enabling **replay and debugging** of agent behavior,
* Providing **auditability** for compliance and governance,
* Supporting **observability** across distributed systems.

Trace does **not** control execution; it provides the **normative record** that makes MPLP observable and auditable.`,
        interactionModel: `The Trace module operates as the **observability layer** that records all execution activity.

### Dependencies
* **Context**: Every Trace MUST be anchored to a valid \`context_id\`.
* **Plan**: Traces MAY reference a \`plan_id\` when recording plan execution.

### Emissions & Observability
* Trace segments are **append-only** during execution.
* Terminal status Traces become **stable and append-only** (cannot be modified).
* Traces emit events that can be consumed by external observability systems.

### Usage in Golden Flows
The Trace module provides the audit trail for:
* **Golden Flow 01** — Single-Agent Task Execution
* **Golden Flow 03** — Multi-Agent Task Coordination
* **Golden Flow 06** — Post-Execution Audit & Review`,
        normativeConstraints: `The following constraints are **normative** and MUST be enforced by any MPLP-conformant implementation:

1. A Trace **MUST** reference a valid \`context_id\`.
2. A Trace **MUST** have a \`root_span\` that anchors all segments.
3. Trace segments **MUST** be append-only during active execution.
4. A Trace in terminal status (completed, failed, cancelled) **MUST NOT** be modified.
5. Segment timestamps **MUST** be monotonically increasing within a trace.
6. All Trace mutations **MUST** be traceable and auditable themselves.

Failure to meet these constraints results in a non-conformant execution.`
    },
    {
        id: "role",
        name: "Role Module",
        desc: "Normative identity contract: authorization and capability boundaries.",
        purpose: "Defines agent capabilities, permission boundaries, and behavioral identities (RBAC).",
        status: "Frozen",
        seoTier: "A",
        metaDescription: "Defines the normative identity contract, authorization boundaries, and capability semantics of the Role module in the MPLP protocol.",
        icon: "🎭",
        schema: {
            required: ["meta", "role_id", "name"],
            optional: ["description", "capabilities", "created_at", "updated_at", "trace", "events", "governance"],
            capabilityFormat: "resource.action (e.g., plan.create)"
        },
        lifecycle: {
            statusEnum: ["active", "inactive", "deprecated"]
        },
        protocolRole: `The Role module defines the **identity and capability boundaries** for agents and humans in MPLP.

It establishes **who can do what** — the RBAC (Role-Based Access Control) layer that governs permissions across all protocol operations.

Within the MPLP lifecycle, Role is responsible for:
* Declaring **agent identities** with named roles,
* Specifying **capabilities** (permissions) in a structured format,
* Enabling **authorization checks** before sensitive operations,
* Providing **accountability** by linking actions to roles.

Role does **not** perform actions; it provides the **normative identity contract** that authorization layers enforce.`,
        interactionModel: `The Role module operates as the **identity and authorization layer** referenced by all execution modules.

### Dependents (Modules that reference Role)
* **Plan**: Steps MAY specify an \`agent_role\` for assignment.
* **Collab**: Participants MUST be associated with a Role.
* **Confirm**: Approval requests are tied to \`requested_by_role\` and \`decided_by_role\`.
* **Dialog**: Message senders are identified by role.

### Emissions & Observability
* Role assignments and capability changes MUST be traceable.
* Authorization failures MUST be logged with the attempting role.

### Usage in Golden Flows
The Role module enables authorization in:
* **Golden Flow 03** — Multi-Agent Task Coordination
* **Golden Flow 05** — Human-in-the-Loop Collaborative Review
* **Golden Flow 07** — Role-Based Access Control Enforcement`,
        normativeConstraints: `The following constraints are **normative** and MUST be enforced by any MPLP-conformant implementation:

1. A Role **MUST** have a unique \`role_id\` and \`name\`.
2. Capabilities **MUST** follow the \`resource.action\` format.
3. Authorization checks **MUST** verify role capabilities before allowing operations.
4. A deprecated Role **MUST NOT** be assigned to new participants.
5. Role assignments **MUST** be traceable and auditable.
6. Capability inheritance or delegation **MUST** be explicitly declared.

Failure to meet these constraints results in a non-conformant execution.`
    },
    {
        id: "dialog",
        name: "Dialog Module",
        desc: "Communication channel for message exchange.",
        purpose: "Defines message format compatible with OpenAI/Anthropic, role semantics, and lifecycle management.",
        status: "Frozen",
        seoTier: "B",
        metaDescription: "Defines supporting protocol semantics for structured interaction within the MPLP standard.",
        icon: "💬",
        schema: {
            required: ["meta", "dialog_id", "context_id", "status", "messages"],
            optional: ["thread_id", "started_at", "ended_at", "trace", "events", "governance"],
            messageObject: {
                required: ["role", "content", "timestamp"],
                roleEnum: ["user", "assistant", "system", "agent"]
            }
        },
        lifecycle: {
            statusEnum: ["active", "paused", "completed", "archived"]
        },
        protocolRole: `The Dialog module defines **how messages are exchanged** within an MPLP execution.

It provides the **communication channel** for agents, humans, and systems — without defining message semantics or driving execution decisions.

Dialog is a **transport layer**, not a decision layer.`,
        interactionModel: `### Dependencies
* **Context**: Dialog MUST reference a valid \`context_id\`.
* **Role**: Participants are identified by their assigned Role.

### Observability
* **Trace**: All dialog events MUST be recorded.
* Dialog does NOT directly affect Plan status.`,
        keyConstraints: `1. Dialog entries **MUST** reference a valid \`context_id\`.
2. All messages **MUST** be traceable.
3. Unauthorized participants **MUST NOT** emit dialog events.`
    },
    {
        id: "collab",
        name: "Collab Module",
        desc: "Normative coordination contract for multi-agent execution.",
        purpose: "Covers broadcast, round-robin, orchestrated, swarm, and pair modes for MAP profile execution.",
        status: "Frozen",
        seoTier: "A",
        metaDescription: "Defines the normative coordination contract and multi-agent execution semantics of the Collab module in the MPLP protocol.",
        icon: "🤝",
        schema: {
            required: ["meta", "collab_id", "context_id", "title", "purpose", "mode", "status", "participants", "created_at"],
            optional: ["updated_at", "trace", "events", "governance"],
            participantObject: {
                required: ["participant_id", "kind"],
                kindEnum: ["agent", "human", "system", "external"]
            },
            modes: ["broadcast", "round_robin", "orchestrated", "swarm", "pair"]
        },
        lifecycle: {
            statusEnum: ["draft", "active", "suspended", "completed", "cancelled"]
        },
        protocolRole: `The Collab module serves as the **authoritative coordination contract** for multi-agent execution in MPLP.

Its primary role is to define **how agents collaborate**, independent of:
* the underlying model implementation,
* the execution runtime,
* or the communication transport.

Within the MPLP lifecycle, Collab is responsible for:
* Declaring **who participates** in a coordinated activity,
* Defining **how coordination is structured** (e.g. broadcast, pair, swarm),
* Ensuring collaboration semantics remain **deterministic, observable, and auditable**.

Collab does **not** perform orchestration itself; it provides the **normative coordination rules** that orchestration layers MUST follow.`,
        interactionModel: `The Collab module operates as a **coordination hub** and interacts with other MPLP modules as follows:

### Dependencies
* **Context**: Collab instances MUST reference a valid Context to establish a shared semantic scope.
* **Role**: Each participant in a Collab instance MUST be associated with a defined Role.

### Emissions & Observability
* **Trace**: Collaboration events (e.g. participant join, mode transition) MUST be emitted as traceable protocol events.
* **Confirm / Governance**: Certain coordination changes MAY require confirmation or governance enforcement, depending on the execution policy.

### Usage in Golden Flows
The Collab module is referenced in the following normative execution patterns:
* **Golden Flow 03** — Multi-Agent Task Coordination
* **Golden Flow 05** — Human-in-the-Loop Collaborative Review`,
        normativeConstraints: `The following constraints are **normative** and MUST be enforced by any MPLP-conformant implementation:

1. A Collab instance **MUST** reference a valid \`context_id\`.
2. Each participant **MUST** declare a \`kind\` and be associated with a Role.
3. A Collab instance **MUST NOT** include participants without explicit identifiers.
4. The selected coordination \`mode\` **MUST** be one of the protocol-defined modes.
5. In \`pair\` mode, turn ordering **MUST** be deterministic and reproducible.
6. Changes to participant sets or coordination mode **MUST** be traceable.

Failure to meet these constraints results in a non-conformant execution.`
    },
    {
        id: "extension",
        name: "Extension Module",
        desc: "Protocol boundary for custom extensions.",
        purpose: "Enables capability injection, policy enforcement, and integrations through a standardized extension mechanism.",
        status: "Frozen",
        seoTier: "B",
        metaDescription: "Defines supporting protocol semantics for safe extensibility boundaries within the MPLP standard.",
        icon: "🔌",
        schema: {
            required: ["meta", "extension_id", "context_id", "name", "extension_type", "version", "status"],
            optional: ["config", "trace", "events", "governance"],
            types: ["capability", "policy", "integration", "transformation", "validation", "other"]
        },
        lifecycle: {
            statusEnum: ["registered", "active", "inactive", "deprecated"]
        },
        protocolRole: `The Extension module defines **where protocol semantics end**.

It declares the **boundary for custom behavior** — allowing implementations to extend MPLP without violating core invariants.

Extension is a **boundary declaration**, not a plugin system.`,
        interactionModel: `### Scope
* Extension MAY attach metadata to other artifacts.
* Extension MUST NOT violate core protocol invariants.

### Observability
* Extension events SHOULD be traceable.
* Non-conformant extensions invalidate conformance claims.`,
        keyConstraints: `1. Extensions **MUST NOT** override normative constraints.
2. Core protocol behavior **MUST** remain deterministic.
3. Non-conformant extensions **invalidate** conformance claims.`
    },
    {
        id: "core",
        name: "Core Module",
        desc: "Protocol metadata and structural glue (non-behavioral).",
        purpose: "Serves as the MPLP protocol manifest. Declares protocol version, enabled modules, and runtime state configuration.",
        status: "Frozen",
        seoTier: "C",
        metaDescription: "Defines protocol metadata, invariants, and structural boundaries within the MPLP standard.",
        icon: "⚙️",
        schema: {
            required: ["meta", "core_id", "protocol_version", "status", "modules"],
            optional: ["trace", "events", "governance"],
            moduleDescriptor: {
                required: ["module_id", "version", "status"],
                statusEnum: ["enabled", "disabled", "experimental", "deprecated"]
            }
        },
        lifecycle: {
            statusEnum: ["booting", "active", "shutdown", "error"]
        },
        purposeAndScope: `Core defines **protocol metadata and structural glue**, not execution semantics.

It exists for:
* **Consistency**: Unified version and profile declarations.
* **Parsability**: Machine-readable protocol manifest.
* **Identity**: Stable module references across implementations.`,
        nonGoals: `Core is **NOT**:
* A runtime or orchestration layer.
* An execution controller.
* A decision-making module.

If you need to "do something", Core is the wrong module.`
    },
    {
        id: "network",
        name: "Network Module",
        desc: "Semantic boundary where transport begins (non-behavioral).",
        purpose: "Defines node collections and connection patterns like hub-spoke and mesh for distributed deployments.",
        status: "Frozen",
        seoTier: "C",
        metaDescription: "Defines the semantic boundary between MPLP protocol semantics and external communication layers.",
        icon: "🌐",
        schema: {
            required: ["meta", "network_id", "context_id", "name", "topology_type", "status"],
            optional: ["description", "nodes", "trace", "events", "governance"],
            nodeObject: {
                required: ["node_id", "kind", "status"],
                kindEnum: ["agent", "service", "database", "queue", "external", "other"]
            },
            topologies: ["single_node", "hub_spoke", "mesh", "hierarchical", "hybrid", "other"]
        },
        lifecycle: {
            statusEnum: ["draft", "provisioning", "active", "degraded", "maintenance", "retired"]
        },
        purposeAndScope: `Network defines the **boundary where MPLP semantics stop and transport begins**.

It declares:
* **Existence** of communication infrastructure.
* **Topology hints** (not implementations).
* **Node references** for distributed deployments.`,
        nonGoals: `Network is **NOT**:
* A communication protocol specification.
* A transport layer definition.
* An API or message format.

MPLP does not dictate how agents communicate — only that they can.`
    }
];
