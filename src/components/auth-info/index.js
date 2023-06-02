import PropTypes from "prop-types";
import './style.css';

function AuthInfo(props) {
  return (
    <div className='AuthInfo'>
      {props.renderProfile()}
      {props.renderAuthButton()}
    </div>
  )
}

AuthInfo.propTypes = {
  renderProfile: PropTypes.func,
  renderAuthButton: PropTypes.func,
};

AuthInfo.defaultProps = {
  renderProfile: () => {},
  renderAuthButton: () => {}
}

export default AuthInfo;
