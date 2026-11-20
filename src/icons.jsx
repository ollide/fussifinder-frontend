import React from 'react';

// The app's icons: small stroke SVGs in the current text color

const Svg = ({ size, strokeWidth = 2, children, className }) => (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        {children}
    </svg>
);

export const CheckIcon = ({ size = 14, strokeWidth = 3, className }) => (
    <Svg size={size} strokeWidth={strokeWidth} className={className}><polyline points="5 12 10 17 19 7" /></Svg>
);

export const ChevronIcon = ({ size = 20, className }) => (
    <Svg size={size} className={className}><polyline points="6 9 12 15 18 9" /></Svg>
);

export const CloseIcon = ({ size = 22 }) => (
    <Svg size={size}><line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" /></Svg>
);

export const FilterIcon = ({ size = 20 }) => (
    <Svg size={size}>
        <line x1="4" y1="7" x2="20" y2="7" /><line x1="7" y1="12" x2="17" y2="12" /><line x1="10" y1="17" x2="14" y2="17" />
    </Svg>
);

export const EyeOffIcon = ({ size = 16 }) => (
    <Svg size={size}>
        <path d="M3 3l18 18" /><path d="M10.6 6.1A9.8 9.8 0 0 1 12 6c5 0 9 6 9 6a17 17 0 0 1-2.3 2.9" />
        <path d="M6.6 7.6C4.4 9.1 3 12 3 12s4 6 9 6a9 9 0 0 0 4.2-1" />
    </Svg>
);

export const ExternalLinkIcon = ({ size = 20, className }) => (
    <Svg size={size} className={className}>
        <path d="M14 4h6v6" /><path d="M20 4l-9 9" /><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
    </Svg>
);

export const CalendarIcon = ({ size = 18, className }) => (
    <Svg size={size} className={className}>
        <rect x="3" y="5" width="18" height="16" rx="2" /><path d="M8 3v4" /><path d="M16 3v4" /><path d="M3 10h18" />
    </Svg>
);

export const PinIcon = ({ size = 18, className }) => (
    <Svg size={size} className={className}>
        <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" />
    </Svg>
);

export const TrophyIcon = ({ size = 18, className }) => (
    <Svg size={size} className={className}>
        <path d="M7 4h10v5a5 5 0 0 1-10 0z" /><path d="M7 6H4v1a3 3 0 0 0 3 3" /><path d="M17 6h3v1a3 3 0 0 1-3 3" />
        <path d="M12 14v4" /><path d="M8 20h8" />
    </Svg>
);

// football pitch from above: halfway line, centre circle, penalty areas
export const PitchIcon = ({ size = 18, className }) => (
    <Svg size={size} className={className}>
        <rect x="2.5" y="5" width="19" height="14" rx="2" />
        <g strokeWidth="1.5">
            <path d="M12 5v14" /><circle cx="12" cy="12" r="2.6" />
            <path d="M2.5 9.5h2.5v5h-2.5M21.5 9.5h-2.5v5h2.5" />
        </g>
    </Svg>
);
