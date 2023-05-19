import React from 'react';
import PropTypes from 'prop-types';
import ModalLayout from '../layout/modal-layout';
import Head from '../head';
import './style.css';
import Controls from '../controls';


function Modal({ title, onClose, children }) {

  return (
    <ModalLayout>
      <div className='Modal'>
        <Head title={title}>
          <Controls title='Закрыть' onClick={onClose}/>
        </Head>
        {children}
      </div>
    </ModalLayout>
  )
}

Modal.propTypes = {
  title: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node
};

export default Modal;