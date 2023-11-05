import Card from "../components/Card";
import "./Recent.css";
function Recent() {
  return (
    <div className="container margin-top">
      <Card
        title="Title is blank"
        subject="CSCI"
        code="331"
        professor="Peter Heller"
        date="11/5/2023"
        post="HELL WITH HELLER"
        likes={2}
      ></Card>
      <Card
        title="Title is blank 2"
        subject="CSCI"
        code="323"
        professor="Cuneyt"
        date="11/5/2023"
        likes={2}
        post="WOOOOOOOOOOh"
      ></Card>
    </div>
  );
}

export default Recent;
