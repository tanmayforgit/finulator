import classes from "./Simulation.module.css";
const SimulationRowComment = (props) => {
  const comment = props.comment;
  switch (comment.type) {
    case "info":
      return <p className={classes.info_text}> {comment.text}</p>;
    case "warn":
      return <p className={classes.warn_text}>{comment.text}</p>;
    case "critical":
      return <p className={classes.critical_text}>{comment.text}</p>;
    case "good":
      console.log("something good happened");
      return <p className={classes.good_text}>{comment.text}</p>;
    default:
      return <p className={classes.info_text}>{comment.text}</p>;
  }
};

export default SimulationRowComment;
