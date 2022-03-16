import classes from "./Simulation.module.css";
import { v4 as uuidv4 } from "uuid";
const SimulationRowComment = (props) => {
  console.log("rendering comment", props.comment)
  const comment = props.comment;
  switch (comment.type) {
    case "info":
      return <li key={uuidv4()}><p className={classes.info_text}> {comment.text}</p></li>;
    case "warn":
      return <li key={uuidv4()}><p className={classes.warn_text}>{comment.text}</p></li>;
    case "critical":
      return <li key={uuidv4()}><p className={classes.critical_text}>{comment.text}</p></li>;
    case "good":
      console.log("something good happened");
      return <li key={uuidv4()}><p className={classes.good_text}>{comment.text}</p></li>;
    default:
      return <li key={uuidv4()}><p className={classes.info_text}>{comment.text}</p></li>;
  }
};

export default SimulationRowComment;
