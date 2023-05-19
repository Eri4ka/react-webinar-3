import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function Controls({onClick, title}){
  return (
    <div className='Controls'>
      <button onClick={onClick}>{title}</button>
    </div>
  )
}

Controls.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.node.isRequired
};

Controls.defaultProps = {
  onClick: () => {}
}

export default React.memo(Controls);
