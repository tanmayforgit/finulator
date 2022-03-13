import Modal from "react-modal";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import * as Constants from "constants";
import classes from "components/Form.module.css";

const CaptureMandatoryUserDetailsModal = () => {
  const ageRef = useRef();
  const genderRef = useRef();

  const dispatchMandatoryUserDetails = useDispatch();

  const captureUserDetails = (event) => {
    event.preventDefault();
    const age = parseInt(ageRef.current.value);
    const gender = genderRef.current.value;
    const userDetails = {
      age: age,
      gender: gender,
    };

    console.log(userDetails);
    dispatchMandatoryUserDetails({
      type: "set_mandatory_user_data",
      userDetails: userDetails,
    });
  };

  return (
    <Modal isOpen={true}>
      <div className={classes.form_container}>
        <form onSubmit={captureUserDetails} className={classes.simple_form}>
          <div className="form-control">
            <label htmlFor="age"> Your Age </label>
            <input type="number" id="age" ref={ageRef} />
          </div>
          <div className="form-control">
            <label htmlFor="gender"> Gender </label>
            <select id="gender" ref={genderRef}>
              <option value="" disabled selected>
                Select your Gender
              </option>
              <option value={Constants.MALE}>Male</option>
              <option value={Constants.FEMALE}>Female</option>
              <option value={Constants.NMNF}>Other</option>
            </select>
          </div>
          <div className="form-actions">
            <button> Explore </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CaptureMandatoryUserDetailsModal;
