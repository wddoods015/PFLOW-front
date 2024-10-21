// src/components/VerifyEmail.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const VerifyEmail = () => {
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [message, setMessage] = useState('');
    const location = useLocation();

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const emailParam = query.get('email');
        setEmail(emailParam || '');
    }, [location.search]);

    const handleVerify = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('https://pflow.ddns.net/api/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, verificationCode }),
            });

            const result = await response.json();
            setMessage(result.message || 'An error occurred.');
        } catch (error) {
            setMessage('An error occurred: ' + error.message);
        }
    };

    return (
        <div>
            <h2>Verify Email</h2>
            <form onSubmit={handleVerify}>
                <label>Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        readOnly
                    />
                </label>
                <br />
                <label>Verification Code:
                    <input
                        type="text"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        required
                    />
                </label>
                <br />
                <button type="submit">Verify</button>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default VerifyEmail;
