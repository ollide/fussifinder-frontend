import React from 'react';

// The stadium's three rows of seats in the current text color, sized by CSS (the favicons use the same
// shape on a lime tile). The view box includes the outer stroke.
const RINGS = [
    { w: 50, h: 36, dash: '11.5 1' },
    { w: 41, h: 27, dash: '15.5 1.2' },
    { w: 32, h: 18, dash: 'none' },
];

const StadiumMark = () => (
    <svg className="stadium-mark" viewBox="5 5 54 54" aria-hidden="true">
        {RINGS.map(({ w, h, dash }) =>
            <rect key={w} x={32 - w / 2} y={32 - h / 2} width={w} height={h} rx={h / 2}
                fill="none" stroke="currentColor" strokeWidth="3" pathLength="100" strokeDasharray={dash} />)}
    </svg>
);

export default StadiumMark;
