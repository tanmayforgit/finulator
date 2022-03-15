import tableClasses from "components/Table.module.css";
import { Fragment } from "react";
import Modal from "react-modal";
import modalClasses from "components/Modal.module.css";
import { useState } from "react";
import JobLoss from "./JobLoss";
import Kid from "./Kid";

// import { FaPlus } from "react-icons/fa";
const List = () => {
  const openAddEventModal = (finEventName, browserEvent) => {
    browserEvent.preventDefault();
    setEventBeingAdded(finEventName);
  };

  const closeModal = () => {
    setEventBeingAdded(false);
  }

  const [eventBeingAdded, setEventBeingAdded] = useState(false);

  return (
    <Fragment>
      <table className={tableClasses.table}>
        <thead>
          <th>Event</th>
          <th>Description</th>
          <th>Actions</th>
        </thead>
        <tbody>
          <tr>
            <td>Job Loss</td>
            <td>
              Removes your monthly income. You can specify when it starts and
              end
            </td>
            <td>
              <button onClick={openAddEventModal.bind(this, "job_loss")}>
                Add
              </button>
            </td>
          </tr>
          <tr>
            <td>
              Kid
            </td>
            <td>
              Allows you to add expenses per month level across different age brackets. You should not count these expenses twice i.e. once here and once as monthly expenses
            </td>
            <td>
              <button onClick={openAddEventModal.bind(this, "kid")}>
                Add
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <Modal isOpen={eventBeingAdded}>
        <div className={modalClasses.modal_div}>
          <button onClick={closeModal} className={modalClasses.close_button}>
            X
          </button>
          {eventBeingAdded === "job_loss" && <JobLoss closeModalCallback={closeModal}/>}
          {eventBeingAdded === "kid" && <Kid closeModalCallback={closeModal}/>}
        </div>
      </Modal>
    </Fragment>
  );
};

export default List;
