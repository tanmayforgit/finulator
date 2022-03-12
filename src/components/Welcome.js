import { useSelector } from "react-redux";
import { Fragment } from "react";
import CaptureMandatoryUserDetailsModal from "./Users/CaptureMandatoryUserDetailsModal";

const Welcome = () => {
  const userDetails = useSelector((state) => state.userDetails);

  console.log('userDetails', userDetails);

  if (userDetails) {
    console.log("user details are available");
    return (
      <Fragment>
        <p>
          Welcome to your financial simulator. Feel free to explore different
          events and simulate your future to take better decisions. Lets start
          by capturing some basic information
        </p>
      </Fragment>
    );
  } else {
    return <CaptureMandatoryUserDetailsModal />;
  }
};

export default Welcome;
