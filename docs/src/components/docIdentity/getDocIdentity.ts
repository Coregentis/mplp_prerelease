/**
 * Get document identity from frontmatter
 * Used by DocIdentityHeader component
 */

export interface DocIdentity {
    doc_profile: string;
    normativity: string | null;
    lifecycle_status: string | null;
    authority: string | null;
    showDisambiguation: boolean;
}

export function calculateDocProfile(
    normativity: string | null,
    lifecycle_status: string | null,
    authority: string | null
): string {
    if (!normativity) return 'unknown-default-informative';

    if (normativity === 'normative') {
        if (lifecycle_status === 'frozen') return 'normative-frozen';
        if (lifecycle_status === 'active') return 'normative-active';
        return 'normative-draft';
    }

    if (normativity === 'formative') {
        return 'formative';
    }

    if (normativity === 'informative' || normativity === 'non-normative') {
        return 'informative';
    }

    return 'unknown-default-informative';
}

export function getDocIdentity(frontMatter: any): DocIdentity {
    const normativity = frontMatter.normativity || frontMatter.doc_type || null;
    const lifecycle_status = frontMatter.lifecycle_status || frontMatter.status || null;
    const authority = frontMatter.authority || null;

    const doc_profile = calculateDocProfile(normativity, lifecycle_status, authority);

    // Show disambiguation on unknown profiles or high-traffic pages
    const showDisambiguation = doc_profile.includes('unknown') ||
        frontMatter.id === 'intro' ||
        frontMatter.id === 'entrypoints';

    return {
        doc_profile,
        normativity,
        lifecycle_status,
        authority,
        showDisambiguation,
    };
}
