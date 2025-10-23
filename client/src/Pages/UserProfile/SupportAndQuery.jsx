import React, { useState } from "react";
import "../../styles/SupportAndQuery.css";
import { useAddQueryMutation } from "../../features/supportAndQuery/SupportAndQueryApiSlice";
import { toast } from "react-toastify";

const SupportAndQuery = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    paymentid: "",
    message: "",
  });

  const [addUserQuery, {isLoading}] = useAddQueryMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try{
      e.preventDefault();
      const response = await addUserQuery(formData).unwrap();
      toast.success(response.message);
      setFormData({ name: "", email: "", subject: "", paymentid: "", message: "" });
    }catch(error){
      console.log('Faild on adding the query', error)
    }
  };



  return (
    <div className="support-form-container">
      <form className="support-form" onSubmit={handleSubmit}>
        <h2>Support and Query</h2>
        <p>We're here to help. Submit your query below.</p>

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="paymentid"
          placeholder="Enter Payment Id if applicable"
          value={formData.paymentid}
          onChange={handleChange}
        />

        <textarea
          name="message"
          placeholder="Enter your query."
          rows="5"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
        <div className="query-btn">
          <button type="submit">{isLoading ? 'Submiting....': 'Submit Query'}</button>
        </div>
      </form>
    </div>
  );
};

export default SupportAndQuery;
