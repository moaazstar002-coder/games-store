import React from 'react';
import Skeleton from './Skeleton';
import "../styles/components/CardGame.css"; 

const GameCardSkeleton = () => {
  return (
    <div className="game-card" style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)' }}>
      <Skeleton type="block" style={{ width: '100%', height: '200px', borderRadius: '12px 12px 0 0' }} />
      
      <div className="game-card-content" style={{ padding: '1rem' }}>
        <Skeleton type="text" style={{ width: '80%', height: '1.5rem', marginBottom: '1rem' }} />
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Skeleton type="text" style={{ width: '30%' }} />
          <Skeleton type="text" style={{ width: '30%' }} />
        </div>
        
        <Skeleton type="block" style={{ width: '100%', height: '40px', marginTop: '1rem', borderRadius: '8px' }} />
      </div>
    </div>
  );
};

export default GameCardSkeleton;
