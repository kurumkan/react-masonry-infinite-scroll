import React from 'react';

const GridItem = ({ children }) => (
  <div className="grid-item" style={{position: 'absolute'}}>
    {children}
  </div>
);

export default GridItem;