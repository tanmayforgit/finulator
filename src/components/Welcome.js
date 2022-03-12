import { useSelector } from "react-redux";
import { Fragment } from "react";
import CaptureMandatoryUserDetailsModal from "./Users/CaptureMandatoryUserDetailsModal";

const Welcome = () => {
  const userDetails = useSelector((state) => state.userDetails);
  const userFinSituation = useSelector(
    (state) => state.presentFinancialSituation
  );

  const getWelcomeMessage = () => {
    if (userFinSituation){
      return "Looks like you are enjoying. Thats nice to see!"
    } else {
      return "Welcome to your financial simulator. Feel free to explore different \
      events and simulate your future to take better decisions. Lets start \
      by capturing some basic information"
    }
  
  }

  console.log("userDetails", userDetails);
  
  if (userDetails) {
    console.log("user details are available");
    return (
      <Fragment>
        <p>
          {getWelcomeMessage()}
        </p>
      </Fragment>
    );
  } else {
    return <CaptureMandatoryUserDetailsModal />;
  }
};

export default Welcome;
