import "./Home.css";
import logo from "../assets/logo.png";

function Home() {
  return (
    <div className="centered-container">
      <img
        src={logo}
        alt="Description"
        style={{ width: "500px", height: "500px" }}
      />
      ;<h1> CUNY Queens College Forum</h1>
    </div>
  );
}

export default Home;
