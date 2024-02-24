import React from 'react';

class ExpandableBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }

  toggleExpand = () => {
    this.setState((prevState) => ({ expanded: !prevState.expanded }));
  };

  render() {
    const { name, children } = this.props;
    const { expanded } = this.state;

    return (
      <div style={{ border: '1px solid black', margin: '10px', padding: '10px', position: 'relative' }}>
        {/* Top bar with the name, arrow indicator, and click event to expand/collapse */}
        <div onClick={this.toggleExpand} style={{ cursor: 'pointer', fontWeight: 'bold' }}>
          {name}
          <span style={{ float: 'right', transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>
            ▼ {/* This arrow will rotate based on the expanded state */}
          </span>
        </div>
        {/* Content area. Visibility based on the expanded state */}
        <div style={{ display: expanded ? 'block' : 'none', marginTop: '10px' }}>
          {children}
        </div>
      </div>
    );
  }
}

export default ExpandableBox;
