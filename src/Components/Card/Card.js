import classes from "./Card.module.css";
const Card = (props) => {
  return (
    <div className={classes.card}>
      <div>
        <span className={classes.name}>{props.name}</span>
        <span className={classes.duration}>{` (${props.duration} hours)`}</span>
      </div>
    </div>
  );
};
export default Card;
