import Modal from "react-modal";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import * as Constants from "constants";
import { Fragment } from "react";
import classes from "components/Form.module.css";
import modalClasses from "components/Modal.module.css";

const EditMandatoryUserDetailsModal = (props) => {
  const storeUserMandatoryDetails = (event) => {
    event.preventDefault();
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const userDetails = props.userDetails;

  const ageRef = useRef(userDetails.age);
  const genderRef = useRef();

  const dispatchMandatoryUserDetails = useDispatch();

  const editUserDetails = (event) => {
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

    setIsModalOpen(false);
  };

  const closeModal = (event) => {
    event.preventDefault();
    setIsModalOpen(false);
  };

  const openModal = (event) => {
    event.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <Fragment>
      <button onClick={openModal}>Edit</button>
      <Modal isOpen={isModalOpen}>
        <div className={modalClasses.modal_div}>
          <button onClick={closeModal} className={modalClasses.close_button}>
            X
          </button>
          <form onSubmit={editUserDetails} className={classes.simple_form}>
            <div className="form-control">
              <label htmlFor="edit_age"> Your Age </label>
              <input type="number" id="edit_age" ref={ageRef} />
            </div>
            <div className="form-control">
              <label htmlFor="gender"> Gender </label>
              <select id="gender" ref={genderRef}>
                <option
                  value={Constants.MALE}
                  selected={userDetails.gender == Constants.MALE}
                >
                  Male
                </option>
                <option
                  value={Constants.FEMALE}
                  selected={userDetails.gender == Constants.FEMALE}
                >
                  Female
                </option>
                <option
                  value={Constants.NMNF}
                  selected={userDetails.gender == Constants.NMNF}
                >
                  Other
                </option>
              </select>
            </div>
            <div className="form-actions">
              <button> Edit Details</button>
            </div>
          </form>
        </div>
      </Modal>
    </Fragment>
  );
};

export default EditMandatoryUserDetailsModal;
