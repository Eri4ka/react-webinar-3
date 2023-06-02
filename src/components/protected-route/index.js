import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

function ProtectedRoute(props) {
  if (!props.isAuth) {
    return <Navigate to="/login" />
  }
  return props.children
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  isAuth: PropTypes.bool.isRequired
}

export default ProtectedRoute;
