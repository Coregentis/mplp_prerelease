import React from 'react';
import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

interface MermaidDiagramProps {
    id: string;
    alt?: string;
}

/**
 * Mermaid Diagram Component - Pre-rendered SVG with theme switching
 * 
 * Uses build-time generated light/dark SVGs for performance.
 * Part of Day 2 P1-5 Performance Optimization.
 */
export default function MermaidDiagram({ id, alt = 'Diagram' }: MermaidDiagramProps) {
    const lightSvg = useBaseUrl(`/mermaid/${id}.light.svg`);
    const darkSvg = useBaseUrl(`/mermaid/${id}.dark.svg`);

    return (
        <div className="mermaid-diagram-container" style={{ margin: '2rem 0' }}>
            <ThemedImage
                sources={{
                    light: lightSvg,
                    dark: darkSvg,
                }}
                alt={alt}
                style={{
                    maxWidth: '100%',
                    height: 'auto',
                }}
            />
        </div>
    );
}
