import React from 'react';
import { Link } from 'react-router-dom';

class TopBar extends React.Component {

  render() {
    const { children } = this.props;

    return (
      <nav style={{ backgroundColor: '#f0f0f0',
      padding: '10px 0',
      marginBottom: '20px',
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', }}>
        <ul style={{ listStyleType: 'none',
          margin: 0,
          padding: 0,
          display: 'flex', }}>
          <li style={{ display: 'inline', marginRight: '20px' }}>
            <Link to="/">All Articles</Link>
          </li>
          <li style={{ display: 'inline' }}>
            <Link to="/second">Second Page</Link>
          </li>
        </ul>
        {children}
      </nav>
    );
  }
}

export default TopBar;
