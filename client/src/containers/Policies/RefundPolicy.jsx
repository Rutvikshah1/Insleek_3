import React from 'react';
import { useEffect } from 'react';

const RefundPolicy = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <section>
      <div>
        <h3 className="policy-title">
          Refund Policy
          <br />
          No Refund for Subscription packages
        </h3>

        <p className="policy-text">
          ​ Why? We provide 10x value for the fee we charge and dedicated
          services. So trying out our services and asking for a refund is waste
          of the time and effort for both of us. ​ However, be known that we
          assure you a best services and if at all you face any difficulty, we
          are here to fix it for you. So focus on business and growth.
        </p>
      </div>
    </section>
  );
};

export default RefundPolicy;
