import React from 'react';

// Small stroke icons for glyphs the fontello font (iconfont.css) doesn't have

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

export const MenuIcon = ({ size = 22 }) => (
    <Svg size={size}><line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="17" x2="20" y2="17" /></Svg>
);

export const CloseIcon = ({ size = 22 }) => (
    <Svg size={size}><line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" /></Svg>
);

export const FilterIcon = ({ size = 20 }) => (
    <Svg size={size}>
        <line x1="4" y1="7" x2="20" y2="7" /><line x1="7" y1="12" x2="17" y2="12" /><line x1="10" y1="17" x2="14" y2="17" />
    </Svg>
);
