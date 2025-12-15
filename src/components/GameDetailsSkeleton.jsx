import React from 'react';
import Skeleton from './Skeleton';
import '../styles/components/GameDetailsSkeleton.css';

export default function GameDetailsSkeleton() {
  return (
    <div className="game-details-skeleton">
      <div className="details-grid">
        <div className="media">
          <Skeleton 
            type="block" 
            style={{ 
              width: '100%', 
              height: '500px',
              borderRadius: 'var(--radius-md)' 
            }} 
          />
        </div>

        <div className="info">
          <Skeleton 
            type="block" 
            style={{ 
              width: '80%', 
              height: '3.5rem', 
              marginBottom: '1.5rem' 
            }} 
          />
          
          <div className="meta-skeleton">
            <Skeleton type="block" style={{ width: '120px', height: '1.5rem' }} />
            <Skeleton type="block" style={{ width: '140px', height: '1.5rem' }} />
            <Skeleton type="block" style={{ width: '160px', height: '1.5rem' }} />
          </div>

          <div className="description-skeleton">
            <Skeleton 
              type="block" 
              style={{ 
                width: '100%', 
                height: '1rem', 
                marginBottom: '0.8rem' 
              }} 
            />
            <Skeleton 
              type="block" 
              style={{ 
                width: '95%', 
                height: '1rem', 
                marginBottom: '0.8rem' 
              }} 
            />
            <Skeleton 
              type="block" 
              style={{ 
                width: '98%', 
                height: '1rem', 
                marginBottom: '0.8rem' 
              }} 
            />
            <Skeleton 
              type="block" 
              style={{ 
                width: '90%', 
                height: '1rem', 
                marginBottom: '0.8rem' 
              }} 
            />
            <Skeleton 
              type="block" 
              style={{ 
                width: '85%', 
                height: '1rem' 
              }} 
            />
          </div>
        </div>
      </div>

      <div className="buttons-skeleton">
        <Skeleton 
          type="block" 
          style={{ 
            flex: 1,
            height: '50px', 
            borderRadius: 'var(--radius-md)' 
          }} 
        />
        <Skeleton 
          type="block" 
          style={{ 
            flex: 1,
            height: '50px', 
            borderRadius: 'var(--radius-md)' 
          }} 
        />
        <Skeleton 
          type="block" 
          style={{ 
            flex: 1,
            height: '50px', 
            borderRadius: 'var(--radius-md)' 
          }} 
        />
      </div>

      <div className="reviews-skeleton">
        <div className="reviews-header-skeleton">
          <Skeleton 
            type="block" 
            style={{ 
              width: '300px', 
              height: '2.5rem', 
              marginBottom: '1rem',
              marginLeft: 'auto',
              marginRight: 'auto'
            }} 
          />
          <Skeleton 
            type="block" 
            style={{ 
              width: '400px', 
              height: '1.2rem',
              marginLeft: 'auto',
              marginRight: 'auto'
            }} 
          />
        </div>

        <div className="reviews-stats-skeleton">
          <div className="average-rating-skeleton">
            <Skeleton 
              type="block" 
              style={{ 
                width: '80px', 
                height: '80px', 
                borderRadius: '50%',
                marginBottom: '1rem',
                marginLeft: 'auto',
                marginRight: 'auto'
              }} 
            />
            <Skeleton 
              type="block" 
              style={{ 
                width: '120px', 
                height: '1.5rem',
                marginLeft: 'auto',
                marginRight: 'auto'
              }} 
            />
          </div>

          <div className="rating-bars-skeleton">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="rating-bar-skeleton">
                <Skeleton type="block" style={{ width: '60px', height: '1rem' }} />
                <Skeleton type="block" style={{ flex: 1, height: '10px' }} />
                <Skeleton type="block" style={{ width: '30px', height: '1rem' }} />
              </div>
            ))}
          </div>
        </div>

        <div className="review-cards-skeleton">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="review-card-skeleton">
              <div className="review-header-skeleton">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <Skeleton 
                    type="block" 
                    style={{ 
                      width: '50px', 
                      height: '50px', 
                      borderRadius: '50%' 
                    }} 
                  />
                  <div>
                    <Skeleton 
                      type="block" 
                      style={{ 
                        width: '150px', 
                        height: '1rem', 
                        marginBottom: '0.5rem' 
                      }} 
                    />
                    <Skeleton 
                      type="block" 
                      style={{ 
                        width: '100px', 
                        height: '0.85rem' 
                      }} 
                    />
                  </div>
                </div>
                <Skeleton 
                  type="block" 
                  style={{ 
                    width: '120px', 
                    height: '1.2rem' 
                  }} 
                />
              </div>
              <Skeleton 
                type="block" 
                style={{ 
                  width: '60%', 
                  height: '1.3rem', 
                  marginBottom: '1rem' 
                }} 
              />
              <Skeleton 
                type="block" 
                style={{ 
                  width: '100%', 
                  height: '1rem', 
                  marginBottom: '0.5rem' 
                }} 
              />
              <Skeleton 
                type="block" 
                style={{ 
                  width: '95%', 
                  height: '1rem' 
                }} 
              />
            </div>
          ))}
        </div>
      </div>

      <div className="recommendations-skeleton">
        <Skeleton 
          type="block" 
          style={{ 
            width: '350px', 
            height: '2.5rem', 
            marginBottom: '3rem',
            marginLeft: 'auto',
            marginRight: 'auto'
          }} 
        />
        
        <div className="recommendations-grid-skeleton">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="recommendation-card-skeleton">
              <Skeleton 
                type="block" 
                style={{ 
                  width: '100%', 
                  paddingTop: '140%',
                  borderRadius: 'var(--radius-md) var(--radius-md) 0 0' 
                }} 
              />
              <div style={{ padding: '1.5rem' }}>
                <Skeleton 
                  type="block" 
                  style={{ 
                    width: '90%', 
                    height: '1.2rem', 
                    marginBottom: '1rem' 
                  }} 
                />
                <Skeleton 
                  type="block" 
                  style={{ 
                    width: '120px', 
                    height: '1rem', 
                    marginBottom: '0.8rem' 
                  }} 
                />
                <Skeleton 
                  type="block" 
                  style={{ 
                    width: '80px', 
                    height: '1.3rem' 
                  }} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}