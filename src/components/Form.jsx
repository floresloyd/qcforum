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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
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

    console.log(
      "test" + subject,
      coursecode,
      p_firstname,
      p_lastname,
      title,
      comment
    );
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
  };

  return (
    <div className="create-post-container">
      <h2>Create a new post</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="subject">Subject:</label>
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
          <label htmlFor="courseCode">Course Code:</label>
          <input
            id="courseCode"
            type="text"
            name="courseCode"
            value={formData.courseCode}
            onChange={handleChange}
            required
            placeholder="313"
          />
        </div>
        <div className="form-group professor-name-group">
          <label htmlFor="professorFirstName">Professor First Name:</label>
          <input
            id="professorFirstName"
            type="text"
            name="professorFirstName"
            value={formData.professorFirstName}
            onChange={handleChange}
            required
            placeholder="Pedro"
          />
          <label htmlFor="professorLastName">Professor Last Name:</label>
          <input
            id="professorLastName"
            type="text"
            name="professorLastName"
            value={formData.professorLastName}
            onChange={handleChange}
            required
            placeholder="Kalungsod"
          />
        </div>
        <div className="form-group">
          <label htmlFor="header">Post Title:</label>
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
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            required
            placeholder="He was a great professor. The class was exam heavy. 20% For Midterm 1 and 2. 50% Final. 10% Attendance"
          />
        </div>
        <button type="submit" className="button">
          Create
        </button>
      </form>
    </div>
  );
};

export default Form;
