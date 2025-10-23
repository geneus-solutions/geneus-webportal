import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

function LoginForm({isLoading=false,formData, setFormData,handleLogin}) {
  
  const [errMsg, setErrMsg] = useState("");

  const handlechange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]:value });
  }
  
  useEffect(() => {
    setErrMsg("");
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData?.email || !formData?.password) {
      setErrMsg("all fields are required");
      return;
    }
    handleLogin(formData);
  }

  return (
    <div>
      <h2 className="form-title">Login</h2>
      <form onSubmit={handleSubmit}>
        {errMsg && <p  className="err-msg">{errMsg}</p>}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            onChange={handlechange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            onChange={handlechange}
          />
        </div>
        <div className="login-link" style={{ marginBottom: "10px" }}>
          <Link to="/forgot-password">Forgot Password ?</Link>
        </div>
          <button type="submit" className="login-button">
            {isLoading ? "Please Wait" : "Login"}
          </button>
      </form>
    </div>
  );
}

export default LoginForm;
