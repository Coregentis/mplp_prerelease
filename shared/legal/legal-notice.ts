/**
 * Legal Notice SSOT — Single Source of Truth
 * 
 * GOVERNANCE:
 *   This file defines the canonical legal notice for all MPLP properties.
 *   Any copyright/license text drift from this SSOT is a Gate violation.
 * 
 * USAGE:
 *   - Website: Import from this file for Footer component
 *   - Lab: Import from this file for Footer component  
 *   - Docs: Reference this text in docusaurus.config.ts footer.copyright
 * 
 * GATE-LEGAL-01:
 *   All three sites must display the exact same legal line.
 *   CI should verify consistency with this SSOT.
 */

/** Company name (for copyright attribution) */
export const CANONICAL_COMPANY_NAME = "Bangshi Beijing Network Technology Co., Ltd.";

/** License type */
export const CANONICAL_LICENSE = "Apache License, Version 2.0";

/** License URL */
export const CANONICAL_LICENSE_URL = "https://www.apache.org/licenses/LICENSE-2.0";

/** Governance body */
export const CANONICAL_GOVERNANCE_BODY = "MPGC";

/** Governance URL */
export const CANONICAL_GOVERNANCE_URL = "https://www.mplp.io/governance/overview";

/**
 * Full legal line (plain text, no HTML)
 * Use this for programmatic comparison / Gate enforcement
 */
export const CANONICAL_LEGAL_LINE_PLAIN =
    `© 2026 ${CANONICAL_COMPANY_NAME}. Licensed under ${CANONICAL_LICENSE}. Governed by ${CANONICAL_GOVERNANCE_BODY}.`;

/**
 * Full legal line with links (for Docusaurus config)
 * Note: Docusaurus footer.copyright accepts HTML
 */
export function getCanonicalLegalLineHTML(year: number = 2026): string {
    return `© ${year} ${CANONICAL_COMPANY_NAME}. Licensed under the <a href="${CANONICAL_LICENSE_URL}" target="_blank" rel="noopener noreferrer">${CANONICAL_LICENSE}</a>. Governed by <a href="${CANONICAL_GOVERNANCE_URL}" target="_blank" rel="noopener noreferrer">${CANONICAL_GOVERNANCE_BODY}</a>.`;
}
