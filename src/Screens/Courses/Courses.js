import { useEffect } from "react";
import classes from "./Courses.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getCourses } from "../../Reducers/courseReducer";
import Card from "./../../Components/Card/Card";
const Courses = (props) => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.course.courses);
  const loading = useSelector((state) => state.course.loading);
  const error = useSelector((state) => state.course.error);

  useEffect(() => {
    dispatch(getCourses());
  }, []);
  return (
    <main
      style={{ flexDirection: "column", maxWidth: "700px", margin: "0 auto" }}
      className={"d-flex align-items-center justify-content-center mt-4"}
    >
      <h1 className={classes.heading}>Welcome to freeCodeCamp.org</h1>
      <blockquote className={classes.quote}>
        <q>I have not failed. I've just found 10,000 ways that won't work.</q>
        <footer className={classes.name}>- Thomas A. Edison</footer>
      </blockquote>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading &&
        !error &&
        courses.map((elem) => {
          return (
            <Card name={elem.name} key={elem._id} duration={elem.duration} />
          );
        })}
    </main>
  );
};
export default Courses;
