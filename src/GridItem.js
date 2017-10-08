import React from 'react';

const GridItem = ({ children }) => (
  <div style={{
    position: 'absolute'
  }}>
    {children}
  </div>
);

export default GridItem;