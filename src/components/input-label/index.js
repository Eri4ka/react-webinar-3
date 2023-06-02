import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';

import './style.css';

function InputLabel(props) {
  const cn = bem('InputLabel');

  return (
    <div className={cn()}>
      <label htmlFor={props.inputName}>{props.text}</label>
      {props.children}
    </div>
  )
}

InputLabel.propTypes = {
  text: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired
}

export default InputLabel;
