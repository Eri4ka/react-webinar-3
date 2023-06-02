import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import Spinner from "../spinner";

function AuthFormLayout(props) {

  const cn = bem('AuthFormLayout');

  return (
    <div className={cn()}>
      <h1 className={cn('title')}>{props.title}</h1>
      <Spinner active={props.isActive} >
        <form className={cn('form')} onSubmit={props.onSubmit} >
          {props.children}
          {props.errorMessage && <span className={cn('error')}>{props.errorMessage}</span>}
          <button type='submit' disabled={props.isDisabled}>{props.submitButtonText}</button>
        </form>
      </Spinner>
    </div>
  );
}

AuthFormLayout.propTypes = {
  title: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  errorMessage: PropTypes.string,
  isDisabled: PropTypes.bool,
  isActive: PropTypes.bool,
  submitButtonText: PropTypes.string,
};

AuthFormLayout.defaultProps = {
  errorMessage: '',
  isDisabled: false,
  isActive: false,
  submitButtonText: ''
}

export default AuthFormLayout;
