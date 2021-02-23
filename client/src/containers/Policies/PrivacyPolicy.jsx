import React from 'react';
import { useEffect } from 'react';
import './Policies.scss';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <section>
      <div>
        <h3 className="policy-title">Privacy Policy</h3>
        <p className="policy-text">
          Users may find advertising or other content on our Site that link to
          the sites and services of our partners, suppliers, advertisers,
          sponsors, licensors and other third parties. We do not control the
          content or links that appear on these sites and are not responsible
          for the practices employed by websites linked to or from our Site. In
          addition, these sites or services, including their content and links,
          may be constantly changing. These sites and services may have their
          own privacy policies and customer service policies. Browsing and
          interaction on any other website, including websites which have a link
          to our Site, is subject to that website's own terms and policies.
        </p>

        <p className="policy-text">
          Insleek has the discretion to update this privacy policy at any time.
          We encourage Users to frequently check this page for any changes to
          stay informed about how we are helping to protect the personal
          information we collect. You acknowledge and agree that it is your
          responsibility to review this privacy policy periodically and become
          aware of modifications. Your acceptance of these terms ​ By using this
          Site, you signify your acceptance of this policy. If you do not agree
          to this policy, please do not use our Site. Your continued use of the
          Site following the posting of changes to this policy will be deemed
          your acceptance of those changes.
        </p>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
