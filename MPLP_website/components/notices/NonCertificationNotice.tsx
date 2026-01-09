// Re-export with custom props for backward compatibility
// For new pages, use PositioningNotice directly from @/components/ui/positioning-notice

import { PositioningNotice } from "@/components/ui/positioning-notice";

export function NonCertificationNotice() {
    return (
        <PositioningNotice
            variant="callout"
            label="Non-Certification & Non-Endorsement Notice"
            message="This page provides an informational overview of the MPLP conformance model. It does not constitute certification, endorsement, or official verification."
            showLinks={true}
        />
    );
}

