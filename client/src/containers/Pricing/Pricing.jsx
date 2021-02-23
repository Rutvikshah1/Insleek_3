import React from 'react';
import './Pricing.scss';

const Pricing = () => {
  return (
    <section>
      <div className="pricing-container">
        <div className="pricing-card">
          <div className="pricing-card__premium">Insleek Premium</div>
          <div className="pricing-card__feature-list">
            <ul>
              <h1>Features You'll get</h1>
              <br />
              <li>
                <i className="fas fa-check-circle"></i> Get your easy to set-up
                store
              </li>
              <li>
                <i className="fas fa-check-circle"></i> Chat directly with users
              </li>
              <li>
                <i className="fas fa-check-circle"></i> Unlimited product
                uploads
              </li>
              <li>
                <i className="fas fa-check-circle"></i> Premium support
              </li>
              <button className="__button __square">Subscribe now</button>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
