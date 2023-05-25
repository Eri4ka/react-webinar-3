import { ThreeDots } from 'react-loader-spinner';
import './style.css';

function Loader() {
  return (
    <ThreeDots
      color="#CCCCCC"
      strokeWidth="3"
      width="96"
      wrapperClass='Loader'
    />
  )
}

export default Loader;