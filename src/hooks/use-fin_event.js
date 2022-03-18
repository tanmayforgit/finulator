import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

const useFinEvent = (finEventAttributes, finEventLabel, finEventName) => {
  const dispatchFinEvent = useDispatch();

  const validateNumber = (attrName, attrValue) => {
    if (isNaN(attrValue)) {
      return attrName + " should be a number";
    }
  };

  const validatePresence = (attrName, attrValue) => {
    if (attrValue == null || attrValue == undefined) {
      return attrName + " should be present";
    }
  };

  const getValidator = (validatorKey) => {
    switch (validatorKey) {
      case "number":
        return validateNumber;
      case "text":
        return validatePresence;
    }
  };

  const onSubmit = (attrValues) => {
    let errors = [];
    for (let attr of finEventAttributes.keys()) {
      const value = attrValues.get(attr);
      console.log("value",value)
      const validation = finEventAttributes.get(attr);
      const validator = getValidator(validation);
      const validationError = validator(attr, value);
      if (validationError) {
        errors = errors.concat([validationError]);
      }
    }

    if (errors.length === 0) {
      const implementationDetails = {};
      for (let key of attrValues.keys()) {
        const value = attrValues.get(key);
        implementationDetails[key] = value;
      }

      const eventToDispatch = {
        label: finEventLabel,
        name: finEventName,
        id: uuidv4(),
        implementationDetails: implementationDetails,
      };


      const dispatchAction = {
        type: "add_event",
        finEvent: eventToDispatch,
      };

      dispatchFinEvent(dispatchAction);
    }

    return errors;
  };

  return onSubmit;
};

export default useFinEvent;
