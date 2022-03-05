import { useSelector } from "react-redux";
import * as Constants from "constants";
import EditMandatoryUserDetailsModal from "./EditMandatoryUserDetailsModal";
const NavInfo = () => {
  const userDetails = useSelector((state) => state.userDetails);

  const greetingMessage = (userDetails) => {
    if (userDetails.gender != Constants.NMNF) {
      return `Hello ${userDetails.age} year old ${userDetails.gender}, happy finulating!`;
    } else {
      return `Hello ${userDetails.age} year old, happy finulating!`;
    }
  };

  if (userDetails) {
    return (
      <div>
        <p> {greetingMessage(userDetails)}</p>
        <EditMandatoryUserDetailsModal userDetails={userDetails}/>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default NavInfo;
