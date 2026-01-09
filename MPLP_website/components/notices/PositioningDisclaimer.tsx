// Re-export with default props for backward compatibility
// For new pages, use PositioningNotice directly from @/components/ui/positioning-notice

import { PositioningNotice } from "@/components/ui/positioning-notice";

export function PositioningDisclaimer() {
    return (
        <PositioningNotice
            variant="callout"
            message="This page provides a high-level overview of the MPLP architecture model. It is not a normative protocol specification."
            showLinks={true}
        />
    );
}

