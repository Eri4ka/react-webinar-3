import { memo } from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Navbar({ list }) {
  const cn = bem('Navbar');

  return (
    <nav className={cn()}>
      <ul className={cn('list')}>
        {list.map((item, index) => (
          <li key={`${index}-${item.path}`}>
            <Link to={item.path} className={cn('link')}>{item.title}</Link>
          </li>
        ))}        
      </ul>
    </nav>
  );
}

Navbar.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string,
    title: PropTypes.string
  })).isRequired
};

export default memo(Navbar);
