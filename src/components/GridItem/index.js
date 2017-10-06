import React from 'react';
import './GridItem.css'

const GridItem = ({ children }) => (
  <div className="grid-item">
    {children}
  </div>
);

export default GridItem;