import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './DashboardHome.scss';

function DashboardHome() {
  const [copySuccess, setCopySuccess] = useState('');

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const authSupplier = useSelector((state) => state.authSupplier);
  let supplierID = authSupplier.supplier._id;

  const textAreaRef = useRef(null);
  function copyToClipboard(e) {
    e.preventDefault();
    textAreaRef.current.select();
    document.execCommand('copy');
    // This is just personal preference.
    // I prefer to not show the whole text area selected.
    e.target.focus();
    setCopySuccess(' Copied!');
  }

  return (
    <section className="dashboardhome">
      <form className="dashboardhome__profile-link">
        <textarea
          className="form-group__textarea"
          ref={textAreaRef}
          value={`http://localhost:3000/supplier/${supplierID}`}
        />

        {document.queryCommandSupported('copy') && (
          <div>
            <p>
              Share Your store link with your customers so that they can find
              you easily!{' '}
              <span role="img" aria-label="smile-emoji">
                😊
              </span>
            </p>
            <button onClick={copyToClipboard} className="__button __square">
              Copy Link
            </button>
            {copySuccess}
          </div>
        )}

        <Link to={`/supplier/${supplierID}`} target="_blank">
          Open Store
        </Link>
      </form>
      <div className="dashboardhome__profile-visit">
        <span>
          {authSupplier.supplier.usersVisited
            ? authSupplier.supplier.usersVisited
            : 0}
          <br />
        </span>
        times your store visited today!
      </div>
    </section>
  );
}

export default DashboardHome;
