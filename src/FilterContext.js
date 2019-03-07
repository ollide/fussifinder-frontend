import React from 'react';

export const filters = {
    VL: true,
    BL: true,
    LL: true,
    KL: false,
    KK: false,
    FS: true,
};

const FilterContext = React.createContext(filters);
export default FilterContext;
