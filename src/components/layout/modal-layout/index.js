import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import './style.css';

function ModalLayout({ children }) {

  return createPortal(
    <div className='Modal-layout'>
      {children}
    </div>,
    document.body,
  )
}

ModalLayout.propTypes = {
  children: PropTypes.node
};

export default ModalLayout;