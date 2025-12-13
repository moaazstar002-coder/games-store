import React from 'react';
import '../styles/components/Skeleton.css';

const Skeleton = ({ type = 'text', className = '', style = {} }) => {
  const classes = `skeleton ${type === 'text' ? 'skeleton-text' : 'skeleton-block'} ${className}`;
  return <div className={classes} style={style}></div>;
};

export default Skeleton;
