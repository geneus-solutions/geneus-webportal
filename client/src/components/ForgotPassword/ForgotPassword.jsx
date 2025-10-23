import React, { useState } from 'react';
import axios from 'axios';
import './ForgotPassword.css'; 

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/forgot-password`, {
                email,
            });
            setMessage('The password reset link has been sent to your email ' + email);
        } catch (error) {
            console.log(error.response.data);
            setMessage(error.response.data);
        }
    };

    return (
        <div className="forgot-password container mt-5">
            <div className="card shadow">
                <div className="card-body">
                    <h2 className="text-center text-primary">Forgot Password</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email Address:</label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Submit</button>
                    </form>
                    {message && <p className="mt-3 text-center text-success">{message}</p>}
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;