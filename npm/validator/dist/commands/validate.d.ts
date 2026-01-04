/**
 * MPLP Validator - Validate Command
 * 漏 2025 Bangshi Beijing Network Technology Limited Company
 * Licensed under the Apache License, Version 2.0.
 */
interface ValidateOptions {
    input: string;
    schema?: string;
    flow: string;
    json?: boolean;
}
export declare function validateCommand(options: ValidateOptions): Promise<void>;
export {};
//# sourceMappingURL=validate.d.ts.map