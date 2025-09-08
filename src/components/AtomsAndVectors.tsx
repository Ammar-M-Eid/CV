// Atom SVG
export const AtomSVG = ({ className = '', style = {} }) => (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
        <ellipse cx="16" cy="16" rx="13" ry="5" stroke="#38bdf8" strokeWidth="1.5" />
        <ellipse cx="16" cy="16" rx="5" ry="13" stroke="#f472b6" strokeWidth="1.5" transform="rotate(60 16 16)" />
        <ellipse cx="16" cy="16" rx="5" ry="13" stroke="#facc15" strokeWidth="1.5" transform="rotate(-60 16 16)" />
        <circle cx="16" cy="16" r="2.2" fill="#a21caf" />
    </svg>
);

// CS Vector SVG
export const VectorSVG = ({ className = '', style = {} }) => (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
        <line x1="4" y1="28" x2="28" y2="4" stroke="#22d3ee" strokeWidth="2.5" markerEnd="url(#arrow)" />
        <defs>
            <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L6,3 L0,6 L1.5,3 Z" fill="#22d3ee" />
            </marker>
        </defs>
    </svg>
);
