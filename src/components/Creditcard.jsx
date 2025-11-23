import React from 'react';
import './Creditcard.css';

export default function CreditCard() {
  const [cardData, setCardData] = React.useState({
    number: '4567 8901 2345 6789',
    holder: 'TAMER ELGAYAR',
    expiry: '12/28',
    cvv: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'number') {
      formattedValue = value.replace(/\D/g, '').substring(0, 16).replace(/(.{4})/g, '$1 ').trim();
    } else if (name === 'expiry') {
      formattedValue = value.replace(/\D/g, '').substring(0, 4).replace(/^(\d{2})(\d{0,2})/, '$1/$2').replace(/\/$/, '');
    } else if (name === 'holder') {
      formattedValue = value.toUpperCase();
    }

    setCardData(prev => ({ ...prev, [name]: formattedValue }));
  };

  return (
    <div className="credit-card-wrapper">
      <div className="credit-card-container">
        <div className="credit-card">
          <div className="card-glow"></div>
          <div className="card-front">
            <div className="card-header">
              <div className="chip"></div>
              <div className="payment-network">VISA</div>
            </div>
            
            <div className="card-number">
              {cardData.number || '#### #### #### ####'}
            </div>
            
            <div className="card-details">
              <div className="card-holder">
                <div className="detail-label">Card Holder</div>
                <div className="detail-value">{cardData.holder || 'FULL NAME'}</div>
              </div>
              <div className="card-expiry">
                <div className="detail-label">Expires</div>
                <div className="detail-value">{cardData.expiry || 'MM/YY'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <form className="card-form">
        <div className="form-group">
          <label>Card Number</label>
          <input 
            type="text" 
            name="number" 
            value={cardData.number} 
            onChange={handleInputChange}
            maxLength="19"
            placeholder="0000 0000 0000 0000"
          />
        </div>
        
        <div className="form-group">
          <label>Card Holder</label>
          <input 
            type="text" 
            name="holder" 
            value={cardData.holder} 
            onChange={handleInputChange}
            placeholder="FULL NAME"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Expiry Date</label>
            <input 
              type="text" 
              name="expiry" 
              value={cardData.expiry} 
              onChange={handleInputChange}
              maxLength="5"
              placeholder="MM/YY"
            />
          </div>
          <div className="form-group">
            <label>CVV</label>
            <input style={{width: '100px'}}
              type="password" 
              name="cvv" 
              value={cardData.cvv} 
              onChange={handleInputChange}
              maxLength="3"
              placeholder="123"
            />
          </div>
        </div>
        
        <button type="button" className="checkout-btn">
          Confirm Payment
        </button>
      </form>
    </div>
  );
}