import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function SubHeadLayout({ children }) {

  const cn = bem('SubHead');

  return (
    <div className={cn()}>
      {children}
    </div>
  );
}

SubHeadLayout.propTypes = {
  children: PropTypes.node
}

export default SubHeadLayout;
