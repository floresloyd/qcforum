import { useState } from "react";
import "./Form.css";
import { supabase } from "../Client";

const Form = () => {
  const [formData, setFormData] = useState({
    subject: "",
    courseCode: "",
    professorFirstName: "",
    professorLastName: "",
    header: "",
    comment: "",
  });

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    let transformedValue = value;

    // Convert all subject code to capital
    if (name === "subject") {
      transformedValue = value.toUpperCase();
    }

    // CourseCode must only be numbers
    if (name === "courseCode" && isNaN(value)) {
      return;
    }

    // Ensure the first letter of professorFirstName is capitalized
    if (name === "professorFirstName") {
      transformedValue = capitalizeFirstLetter(value);
    }

    if (name === "professorLastName") {
      transformedValue = capitalizeFirstLetter(value);
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: transformedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const subject = formData.subject;
    const coursecode = formData.courseCode;
    const p_firstname = formData.professorFirstName;
    const p_lastname = formData.professorLastName;
    const title = formData.header;
    const comment = formData.comment;

    // Create entry @ Supabase
    await supabase
      .from("Posts")
      .insert({
        subject,
        coursecode,
        p_firstname,
        p_lastname,
        title,
        comment,
      })
      .select();

    alert("Post Created");
    window.location = "/recent";
  };

  return (
    <div className="create-post-container">
      <h2>Create a new post</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-font" htmlFor="subject">
            Subject:
          </label>
          <input
            id="subject"
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            placeholder="Subject Acronym // Example CSCI"
          />
        </div>
        <div className="form-group">
          <label className="form-font" htmlFor="courseCode">
            Course Code:
          </label>
          <input
            id="courseCode"
            type="text"
            name="courseCode"
            value={formData.courseCode}
            onChange={handleChange}
            required
            pattern="\d+"
            placeholder="Numbers Only // Example 313"
          />
        </div>
        <div className="form-group professor-name-group">
          <label className="form-font" htmlFor="professorFirstName">
            Professor First Name:
          </label>
          <input
            id="professorFirstName"
            type="text"
            name="professorFirstName"
            value={formData.professorFirstName}
            onChange={handleChange}
            required
            placeholder="Pedro"
          />
          <label className="form-font" htmlFor="professorLastName">
            Professor Last Name:
          </label>
          <input
            id="professorLastName"
            type="text"
            name="professorLastName"
            value={formData.professorLastName}
            onChange={handleChange}
            required
            placeholder="Calungsod"
          />
        </div>
        <div className="form-group">
          <label className="form-font" htmlFor="header">
            Post Title:
          </label>
          <input
            id="header"
            type="text"
            name="header"
            value={formData.header}
            onChange={handleChange}
            required
            placeholder="Experience with Prof. Pedro Kalungsod"
          />
        </div>
        <div className="form-group">
          <label className="form-font" htmlFor="comment">
            Comment:
          </label>
          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            required
            placeholder="He was a great professor. The class was exam heavy. 20% For Midterm 1 and 2. 50% Final. 10% Attendance"
          />
        </div>
        <button type="submit" className="button-form">
          Create
        </button>
      </form>
    </div>
  );
};

export default Form;
