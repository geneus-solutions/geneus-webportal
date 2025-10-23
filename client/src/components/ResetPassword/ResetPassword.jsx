import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ResetPassword.css'; // Import the CSS file

const ResetPasswordPage = () => {
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    // console.log('Token:', id);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/reset-password/${id}`, { password });
            if (response.status === 200) {
                setMessage('Password has been reset successfully. Please log in.');
                setTimeout(() => {
                    navigate('/login'); // Redirect to login page
                }, 3000); // Redirect after 3 seconds
            } else {
                setMessage(response.data || 'Error resetting password');
            }
        } catch (error) {
            console.log(error);
            setMessage('Error resetting password');
        }
    };

    return (
        <div className="reset-password-container mt-5"> {/* Use the new wrapper class */}
            <div className="card shadow">
                <div className="card-body">
                    <h2 className="text-center text-primary">Reset Password</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">New Password:</label>
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Reset Password</button>
                    </form>
                    {message && <p className="mt-3 text-center text-success">{message}</p>}
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;