import React from 'react';
import { Link } from 'react-router-dom';

const TopBar = () => {
  return (
    <nav style={{ backgroundColor: '#f0f0f0', padding: '10px 0', marginBottom: '20px' }}>
      <ul style={{ listStyleType: 'none', margin: 0, padding: 0, textAlign: 'center' }}>
        <li style={{ display: 'inline', marginRight: '20px' }}>
          <Link to="/">All Articles</Link>
        </li>
        <li style={{ display: 'inline' }}>
          <Link to="/second">Second Page</Link>
        </li>
      </ul>
    </nav>
  );
};

export default TopBar;
