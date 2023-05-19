import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({list, onItemClick, buttonItemTitle}){
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item item={item} onClick={onItemClick} buttonTitle={buttonItemTitle}/>
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onItemClick: PropTypes.func,
  buttonItemTitle: PropTypes.node
  ,
};

List.defaultProps = {
  onItemClick: () => {},
}

export default React.memo(List);
