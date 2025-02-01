import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const oldLoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8080/users/login?username=${formData.username}&password=${formData.password}`
      );
      if (response.status === 200) {
        navigate('/home', {replace : true , state:{ userName: formData.username }})
      } else if (response.status === 404) {
        setErrorMsg("User not found");
      } else if (response.status === 401) {
        setErrorMsg("Invalid password");
      } else {
        setErrorMsg("An error occurred");
      }
    } catch (error) {
      console.error(error);
      setErrorMsg("An error occurred");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <button type="submit">Log in</button>
      {errorMsg && <p>{errorMsg}</p>}
      <br />
      <Link to="/signup"> Don't have an account? Register now!</Link>
    </form>
  );
}

export default oldLoginForm;