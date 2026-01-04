/**
 * © 2025 Bangshi Beijing Network Technology Limited Company
 * Licensed under the Apache License, Version 2.0.
 *
 * This file is part of the MPLP reference implementation.
 * It is NOT part of the frozen protocol specification.
 */

import type { ToolExecutor, ToolInvocation, ToolInvocationResult } from "./types";

export type ToolHandler = (payload: unknown) => Promise<unknown> | unknown;

export interface ToolRegistry {
    [toolName: string]: ToolHandler;
}

export class InMemoryToolExecutor implements ToolExecutor {
    private readonly registry: ToolRegistry;

    constructor(registry: ToolRegistry = {}) {
        this.registry = registry;
    }

    async invoke(invocation: ToolInvocation): Promise<ToolInvocationResult> {
        const handler = this.registry[invocation.toolName];
        if (!handler) {
            return {
                toolName: invocation.toolName,
                success: false,
                errorMessage: `Tool not found: ${invocation.toolName}`
            };
        }

        try {
            const result = await handler(invocation.payload);
            return {
                toolName: invocation.toolName,
                success: true,
                output: result
            };
        } catch (error) {
            return {
                toolName: invocation.toolName,
                success: false,
                errorMessage: error instanceof Error ? error.message : String(error)
            };
        }
    }
}
