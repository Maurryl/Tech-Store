import React, { useState } from 'react';
import './Footer.css';
import './Auth.css';

function Auth({ setUser, setIsAuthenticated }) {
    const [isRegistering, setIsRegistering] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [welcomeMessage, setWelcomeMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleAuth = async (e) => {
        e.preventDefault();
        const endpoint = isRegistering ? 'http://localhost:5555/register' : 'http://localhost:5555/login';
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (response.ok) {
                if (isRegistering) {
                    setIsRegistering(false); // Switch to login form after registration
                    alert('Registration successful! Please log in.');
                } else {
                    localStorage.setItem('token', data.access_token);
                    setUser({ username: data.username });
                    setIsAuthenticated(true);
                    setWelcomeMessage(`Welcome ${data.username}!`);
                    setTimeout(() => {
                        window.location.href = '/reviews';
                    }, 2000); // Redirect to reviews after 2 seconds
                }
            } else {
                setErrorMessage(data.error || 'An error occurred');
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('An error occurred');
        }
    };

    const toggleAuthMode = () => {
        setIsRegistering(!isRegistering);
        setErrorMessage(''); // Clear any previous error messages
    };

    return (
        <div className="auth-container">
            <div className="auth-wrapper">
                <h2>{isRegistering ? 'Register' : 'Login'}</h2>
                <form onSubmit={handleAuth}>
                    <div>
                        <label>Username:</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
                </form>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {welcomeMessage && <p className="welcome-message">{welcomeMessage}</p>}
                <p>
                    {isRegistering ? (
                        <>
                            Already have an account? <button className="auth-button" onClick={toggleAuthMode}>Login here</button>
                        </>
                    ) : (
                        <>
                            Don't have an account? <a href="#!" className="auth-link" onClick={toggleAuthMode}>Sign Up here</a>
                        </>
                    )}
                </p>
            </div>
        </div>
    );
}

export default Auth;
