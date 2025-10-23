import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import "./ContactUs.css";
import { toast } from "react-toastify";
import { useContactUsMutation } from "../features/contactUs/contactUsApiSlice";
import SocialLinkOption from "../components/ContactPage/SocialLInkOption";

const ContactUs = () => {
  const contacts = [
    {
      icon: <FaFacebook size={30} color="#1877F2" />, // Facebook emoji for now (you can replace with SVG later)
      title: "Facebook",
      description: "Join us on Facebook.",
      buttonText: "Visit Facebook",
      buttonLink: "https://www.facebook.com/geneus.solutions",
    },
    {
      icon: <FaInstagram size={30} color="#E4405F" />, // Instagram emoji
      title: "Instagram",
      description: "Follow us on Instagram.",
      buttonText: "Visit Instagram",
      buttonLink: "https://www.instagram.com/geneus.solutions",
    },
    {
      icon: <FaLinkedin size={30} color="#0A66C2" />,
      title: "LinkedIn",
      description: "Join us on LinkedIn.",
      buttonText: "Visit LinkedIn",
      buttonLink: "https://www.linkedin.com/company/geneus-solutions",
    },
    {
      icon: <MdEmail size={30} color="#EA4335" />,
      title: "Email Us",
      description: "Send us an email anytime.",
      buttonText: "Send Mail",
      buttonLink: "mailto:support@geneussolutions.in",
    },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    contactNumber: "",
    message: "",
  });
  // const [isPending, startTransition] = useTransition();
  // const [errorMsg, setErrorMsg] = useState();
  const [contactUs] =
    useContactUsMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // startTransition(async () => {
      try {
        const contactData = await contactUs(formData).unwrap();
        if (contactData?.ok) {
          setFormData({
            name: "",
            email: "",
            subject: "",
            contactNumber: "",
            message: "",
          });
        }
        // setErrorMsg("");
        toast.success("Thank you, Your message has been sent successfully");
      } catch (error) {
        console.log("this is error", error);
        // setErrorMsg(error?.data?.error);
      }
    // });
  };
  return (
    <section className="contact-map">
      <div className="contact-header">
        <h3 className="contact-link">
          Contact Us
        </h3>
        <h1>Get in touch with our team</h1>
        <p>We have the team and know-how to help you scale 10x faster.</p>
      </div>
   
      <div className="form-full-width">
        {/* <div className="contact-header">
          <h1>We'd love to hear from you</h1>
          <p>Fill out the form and our team will get back to you shortly.</p>
        </div> */}
        <form onSubmit={handleSubmit}>
          <div className="input-row">
            <div className="input-group">
              <label>Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="input-row">
            <div className="input-group">
              <label>Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Enter subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="input-row">
            <div className="input-group">
              <label>Contact Number</label>
              <input
                type="Number"
                id="contactNumber"
                name="contactNumber"
                placeholder="Enter Contact Number"
                value={formData.contactNumber}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Message */}
          <div className="input-row">
            <div className="input-group">
              <label>Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Write your message here..."
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
          </div>

          {/* Send Button */}
          <div style={{ textAlign: "center" }}>
            <button type="submit" className="contact-send-button">
              Send Message
            </button>
          </div>
        </form>
      </div>
      <SocialLinkOption contacts={contacts} />
      <div className="map-container">
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d266030.4014813481!2d77.47257226630136!3d12.951174118925985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1745840997330!5m2!1sen!2sin"
          width="100%"
          height="250"
          style={{ border: 0, borderRadius: "8px", marginTop: "2rem" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
};

export default ContactUs;
