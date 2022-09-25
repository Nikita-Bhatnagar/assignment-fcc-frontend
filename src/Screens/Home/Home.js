import classes from "./Home.module.css";
import appleLogo from "./../../assets/AppleInc_Logo.svg";
import AmazonLogo from "./../../assets/Amazon_logo.svg";
import GoogleLogo from "./../../assets/Google_logo.svg";
import MicrosoftLogo from "./../../assets/Microsoft_logo.svg";
import spotifyLogo from "./../../assets/spotify_logo.svg";

const Home = (props) => {
  return (
    <main style={{ maxWidth: "1170px", margin: "0 auto" }}>
      <div className={classes.wrapper}>
        <ul className={classes.list}>
          <li className={classes.listItem}>Learn to code - for free.</li>
          <li className={classes.listItem}>Build projects.</li>
          <li className={classes.listItem}>Earn certifications.</li>
        </ul>
        <p className={classes.para}>
          Since 2014, more than 40,000 freeCodeCamp.org graduates have gotten
          jobs at tech companies including:
        </p>
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ marginTop: "-25px", flexWrap: "wrap" }}
        >
          <div className={classes.imgWrapper}>
            <img className={classes.logo} src={appleLogo} alt="Apple" />
          </div>
          <div className={classes.imgWrapper}>
            <img className={classes.logo} src={GoogleLogo} alt="Google" />
          </div>
          <div className={classes.imgWrapper}>
            <img className={classes.logo} src={MicrosoftLogo} alt="Microsoft" />
          </div>
          <div className={classes.imgWrapper}>
            <img className={classes.logo} src={spotifyLogo} alt="Spotify" />
          </div>
          <div className={classes.imgWrapper}>
            <img className={classes.logo} src={AmazonLogo} alt="Amazon.com" />
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <button
            type="button"
            className={classes.btn}
          >{`Get started (it's free)`}</button>
        </div>
      </div>
    </main>
  );
};

export default Home;
