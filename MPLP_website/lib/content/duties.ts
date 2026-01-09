export const duties = [
    {
        id: "coordination",
        title: "Coordination",
        desc: "Structured multi-agent collaboration.",
        detail: "Ensures structured coordination between agents, managing control flow, task ownership, and collaboration semantics."
    },
    {
        id: "error-handling",
        title: "Error Handling",
        desc: "Deterministic failure recovery.",
        detail: "Defines standardized error semantics and recovery patterns, ensuring predictable behavior across all protocol-conformant executions."
    },
    {
        id: "event-bus",
        title: "Event Bus",
        desc: "Protocol-level event emission.",
        detail: "Defines event emission and subscription semantics, enabling decoupled communication and observability across protocol layers."
    },
    {
        id: "learning-feedback",
        title: "Learning Feedback",
        desc: "Outcome-driven refinement.",
        detail: "Defines how execution outcomes and feedback signals can be captured for protocol-level learning and policy refinement."
    },
    {
        id: "observability",
        title: "Observability",
        desc: "Mandatory traceability.",
        detail: "Defines mandatory traceability and observability requirements for all protocol-conformant executions."
    },
    {
        id: "orchestration",
        title: "Orchestration",
        desc: "Execution flow management.",
        detail: "Defines how Plans are executed, ensuring steps are processed in correct dependency order while preserving protocol invariants."
    },
    {
        id: "performance",
        title: "Performance",
        desc: "Resource and latency bounds.",
        detail: "Defines protocol-level constraints on resource consumption, latency bounds, and execution efficiency."
    },
    {
        id: "protocol-versioning",
        title: "Protocol Versioning",
        desc: "Evolution and compatibility.",
        detail: "Defines how protocol versions evolve while preserving backward compatibility and execution safety."
    },
    {
        id: "security",
        title: "Security",
        desc: "Access control and isolation.",
        detail: "Enforces protocol-level access control and execution isolation, ensuring agents operate within defined permission boundaries."
    },
    {
        id: "state-sync",
        title: "State Sync",
        desc: "Distributed consistency.",
        detail: "Defines state synchronization semantics across distributed nodes, ensuring protocol consistency in multi-node deployments."
    },
    {
        id: "transaction",
        title: "Transaction",
        desc: "Atomic operations.",
        detail: "Defines atomicity guarantees for multi-step operations, providing rollback semantics in case of partial failure."
    }
];
