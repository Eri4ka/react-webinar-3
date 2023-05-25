import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function PaginationPage({ pageContent, isActive, isDisabled, onSelectPage }){
  const cn = bem('PaginationPage');

  return (
    <li className={cn({ active: isActive, disabled: isDisabled })} onClick={onSelectPage}>
      {pageContent}
    </li>
  )
}

PaginationPage.PropTypes={
  pageContent: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onSelectPage: PropTypes.func
}

PaginationPage.defaultProps = {
  onSelectPage: () => {}
}

export default memo(PaginationPage);
