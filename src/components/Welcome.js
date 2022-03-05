import { useSelector } from 'react-redux';
import CaptureMandatoryUserDetailsModal from './Users/CaptureMandatoryUserDetailsModal'

const Welcome = () => {
  const userDetails = useSelector(state => state.userDetails)

  if(userDetails) {
    console.log("user details are available");
    return(<p> Welcome to your financial simulator. Feel free to explore different events and simulate your future to take better decisions</p>)
  } else {
    return(<CaptureMandatoryUserDetailsModal/>)
  }
  
}

export default Welcome;