import React, { useState } from 'react';
import { FaStar, FaThumbsUp, FaThumbsDown, FaUser } from 'react-icons/fa';
import '../styles/components/GameReviews.css';


const mockReviews = [
  {
    id: 1,
    userName: "Ahmed Hassan",
    avatar: "👨‍💻",
    rating: 5,
    date: "2025-12-10",
    title: "Amazing game!",
    content: "This is one of the best games I've ever played. The graphics are stunning and the gameplay is incredibly smooth. Highly recommend!",
    helpful: 45,
    notHelpful: 3,
    verified: true
  },
  {
    id: 2,
    userName: "Sarah Ahmed",
    avatar: "👩‍🎨",
    rating: 4,
    date: "2025-12-08",
    title: "Great but has some issues",
    content: "Overall a fantastic game with beautiful visuals. The story is engaging but I encountered a few bugs. Still worth buying!",
    helpful: 32,
    notHelpful: 5,
    verified: true
  },
  {
    id: 3,
    userName: "Mohamed Ali",
    avatar: "🎮",
    rating: 5,
    date: "2025-12-05",
    title: "Masterpiece!",
    content: "Absolutely brilliant! The attention to detail is incredible. Every aspect from sound design to level design is top-notch.",
    helpful: 67,
    notHelpful: 2,
    verified: false
  },
  {
    id: 4,
    userName: "Fatima Omar",
    avatar: "🌟",
    rating: 3,
    date: "2025-12-03",
    title: "Good but not great",
    content: "It's a decent game with some fun moments. However, it feels repetitive after a while. Not bad, but I expected more.",
    helpful: 18,
    notHelpful: 12,
    verified: true
  },
  {
    id: 5,
    userName: "Khaled Ibrahim",
    avatar: "⚡",
    rating: 5,
    date: "2025-12-01",
    title: "Best purchase this year!",
    content: "I've been gaming for 15 years and this is easily in my top 5 games of all time. The multiplayer is addictive and the single player campaign is emotional. 10/10!",
    helpful: 89,
    notHelpful: 1,
    verified: true
  }
];

const GameReviews = ({ gameId, gameName }) => {
  const [reviews] = useState(mockReviews);
  const [sortBy, setSortBy] = useState('helpful'); 
  const [filterRating, setFilterRating] = useState('all');

  
  const averageRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
  
  
  const ratingDistribution = {
    5: reviews.filter(r => r.rating === 5).length,
    4: reviews.filter(r => r.rating === 4).length,
    3: reviews.filter(r => r.rating === 3).length,
    2: reviews.filter(r => r.rating === 2).length,
    1: reviews.filter(r => r.rating === 1).length,
  };

  
  const filteredReviews = reviews
    .filter(r => filterRating === 'all' || r.rating === parseInt(filterRating))
    .sort((a, b) => {
      if (sortBy === 'helpful') return (b.helpful - b.notHelpful) - (a.helpful - a.notHelpful);
      if (sortBy === 'recent') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FaStar 
        key={i} 
        className={i < rating ? 'star filled' : 'star'} 
      />
    ));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="game-reviews">
      <div className="reviews-header">
        <h2>User Reviews</h2>
        <p className="reviews-subtitle">See what other gamers think about {gameName}</p>
      </div>

      
      <div className="reviews-stats">
        <div className="average-rating">
          <div className="rating-number">{averageRating.toFixed(1)}</div>
          <div className="rating-stars">{renderStars(Math.round(averageRating))}</div>
          <div className="rating-count">{reviews.length} reviews</div>
        </div>

        <div className="rating-breakdown">
          {[5, 4, 3, 2, 1].map(star => (
            <div key={star} className="rating-bar-container">
              <span className="star-label">{star} ⭐</span>
              <div className="rating-bar">
                <div 
                  className="rating-bar-fill" 
                  style={{ width: `${(ratingDistribution[star] / reviews.length) * 100}%` }}
                />
              </div>
              <span className="rating-count-label">{ratingDistribution[star]}</span>
            </div>
          ))}
        </div>
      </div>

      
      <div className="reviews-controls">
        <div className="filter-group">
          <label>Filter by:</label>
          <select value={filterRating} onChange={(e) => setFilterRating(e.target.value)}>
            <option value="all">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>

        <div className="sort-group">
          <label>Sort by:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="helpful">Most Helpful</option>
            <option value="recent">Most Recent</option>
            <option value="rating">Highest Rating</option>
          </select>
        </div>
      </div>

      
      <div className="reviews-list">
        {filteredReviews.map(review => (
          <div key={review.id} className="review-card">
            <div className="review-header">
              <div className="reviewer-info">
                <div className="reviewer-avatar">{review.avatar}</div>
                <div>
                  <div className="reviewer-name">
                    {review.userName}
                    {review.verified && <span className="verified-badge">✓ Verified Purchase</span>}
                  </div>
                  <div className="review-date">{formatDate(review.date)}</div>
                </div>
              </div>
              <div className="review-rating">{renderStars(review.rating)}</div>
            </div>

            <div className="review-body">
              <h4 className="review-title">{review.title}</h4>
              <p className="review-content">{review.content}</p>
            </div>

            <div className="review-footer">
              <span className="helpful-text">Was this helpful?</span>
              <div className="helpful-buttons">
                <button className="helpful-btn">
                  <FaThumbsUp />
                  <span>Yes ({review.helpful})</span>
                </button>
                <button className="helpful-btn">
                  <FaThumbsDown />
                  <span>No ({review.notHelpful})</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredReviews.length === 0 && (
        <div className="no-reviews">
          <p>No reviews found with the selected filters.</p>
        </div>
      )}
    </div>
  );
};

export default GameReviews;