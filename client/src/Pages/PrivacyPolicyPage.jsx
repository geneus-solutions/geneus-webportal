import React from "react";
import "./PrivacyPolicyPage.css";

const PrivacyPolicyPage = () => {
  return (
    <div className="privacy-page-container">
      <h1 className="privacy-page-heading">Privacy Policy</h1>
      <p className="last-updated">Last Updated: 05 Feb 2025</p>
      <p className="privacy-page-paragraph">
        Welcome to <strong>Geneus Solutions</strong>! Your privacy is important
        to us. This Privacy Policy explains how we collect, use, and protect
        your personal information when you use our website and services.
      </p>
      <div className="privacy-page-data-container">
        <h2 className="privacy-page-subheading">1. Information We Collect</h2>
        <ul className="privacy-page-unorder-list">
          <li className="privacy-page-list">
            <strong>Personal Data:</strong> Such as your name, email address,
            and payment information when you register or make a purchase.
          </li>
          <li className="privacy-page-list">
            <strong>Usage Data:</strong> Information about your interactions
            with our courses, including progress and preferences.
          </li>
          <li className="privacy-page-list">
            <strong>Technical Data:</strong> IP address to ensure compatibility and security.
          </li>
          <li className="privacy-page-list">
            <strong>Cookies and Tracking Technologies:</strong> To personalize
            your experience and analyze site performance.
          </li>
        </ul>

        <h2 className="privacy-page-subheading">
          2. How We Use Your Information
        </h2>
        <ul className="privacy-page-unorder-list">
          <li className="privacy-page-list">
            Provide and maintain our services.
          </li>
          <li className="privacy-page-list">
            Process transactions and send related information.
          </li>
          <li className="privacy-page-list">
            Communicate with you about courses, updates, and promotional offers.
          </li>
          <li className="privacy-page-list">
            Improve our website, courses, and overall user experience.
          </li>
          <li className="privacy-page-list">
            Ensure compliance with legal obligations and protect against
            fraudulent activities.
          </li>
        </ul>

        <h2 className="privacy-page-subheading">
          3. Cookies and Tracking Technologies
        </h2>
        <p>
          Our website uses cookies to enhance your experience. Cookies help us:
        </p>
        <ul className="privacy-page-unorder-list">
          <li className="privacy-page-list">
            Remember your login details and preferences.
          </li>
          <li className="privacy-page-list">
            Understand how you interact with our content.
          </li>
          <li className="privacy-page-list">
            Deliver personalized content and recommendations.
          </li>
        </ul>
        {/* <p>You can manage your cookie preferences through your browser settings or our <Link to="#" className="manage_prefrence">Manage Preferences</Link> page.</p> */}

        <h2 className="privacy-page-subheading">
          4. Data Sharing and Disclosure
        </h2>
        <ul className="privacy-page-unorder-list">
          <li className="privacy-page-list">
            <strong>Service Providers:</strong> Trusted third parties that
            assist us in operating our website, conducting our business, or
            servicing you.
          </li>
          <li className="privacy-page-list">
            <strong>Legal Requirements:</strong> When required by law or to
            protect our rights, we may disclose your information to authorities.
          </li>
        </ul>

        <h2 className="privacy-page-subheading">5. Data Security</h2>
        <p>
          We implement appropriate security measures to protect your personal
          data. However, no method of transmission over the internet or
          electronic storage is 100% secure. We encourage you to use strong
          passwords and keep your credentials confidential.
        </p>

        <h2 className="privacy-page-subheading">6. Your Rights and Choices</h2>
        <p>Depending on your location, you may have the right to:</p>
        <ul className="privacy-page-unorder-list">
          <li className="privacy-page-list">
            Access, correct, or delete your personal data.
          </li>
          {/* <li className="privacy-page-list">
            Object to or restrict processing of your data.
          </li>
          <li className="privacy-page-list">
            Withdraw consent at any time where we rely on your consent to
            process your information.
          </li> */}
        </ul>
        <p>
          To exercise these rights, please contact us at{" "}
          <strong>support@geneussolutions.in</strong>.
        </p>

        {/* <h2 className="privacy-page-subheading">7. Children's Privacy</h2>
        <p>
          Our services are not directed to individuals under 13. If we become
          aware that a child under 13 has provided us with personal information,
          we will take steps to delete such information.
        </p> */}

        <h2 className="privacy-page-subheading">
          7. Changes to This Privacy Policy
        </h2>
        <p>
          We may update our Privacy Policy from time to time. Please
          review this Privacy Policy periodically for any updates.
        </p>

        <h2 className="privacy-page-subheading">8. Contact Us</h2>
        <p>
          If you have any questions or concerns about this Privacy Policy,
          please contact us at:
        </p>
        <p>
          <strong>Email: </strong>support@geneussolutions.in
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
