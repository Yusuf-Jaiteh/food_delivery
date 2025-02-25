import { useState } from "react";
import {Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function Login(){

    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const { login } = useAuth();

    const [notificationMessage, setNotificationMessage] = useState(null);
    const [notificationType, setNotificationType] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginData = { username, password };
    
        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData),
            });
    
            const result = await response.json();
    
            if (response.ok) {
               const { jwt, userId, role, username } = result;
               login(jwt, userId, role, username);
               setNotificationMessage("Login successfull");
               setNotificationType("success");
              setTimeout(() => setNotificationMessage(null), 1000);
              
              setUserName('');
              setPassword('');
    
              if(role === 'CUSTOMER'){
                setTimeout(() =>  navigate('/menu-list'), 1000); 
              } else if(role === 'STAFF'){
                setTimeout(() =>  navigate('/menu'), 1000); 
              } else{
                setTimeout(() =>  navigate('/orders'), 1000); 
              }
               
                
               
            } else {
              const errorData = await response.json();
              setNotificationMessage(errorData.message || "Failed to Login.");
              setNotificationType("error");
              setTimeout(() => setNotificationMessage(null), 3000); 
            }
        } catch (error) {
          setNotificationMessage("Invalid Credentials!.");
          console.log(error)
          setNotificationType("error");
          setTimeout(() => setNotificationMessage(null), 3000); 
        }
    };

    return(
        <>
            <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center" >
                <div className="card border-secondary text-center p-4 d-flex align-items-center justify-content-center bg-light" style={{ maxWidth: '600px', width: '100%', minHeight: '450px' }}>
                    <div>
                    <div className="card-header  mb-3 ">
                        <h4>Welcome to DeliverDish</h4>
                    </div>
                    <h5>Sign into your account</h5>
                    <div className="card-body">
                        <form>

                            {notificationMessage && (
                            <div className={`alert alert-${notificationType === 'success' ? 'success' : 'danger'} text-center`}>
                                {notificationMessage}
                            </div>
                            )}
                            <div className="form-group">
                                <input 
                                    value={username}
                                    onChange={(e) => setUserName(e.target.value)}
                                    type="text" 
                                    className="form-control mb-3" 
                                    required 
                                    placeholder="Enter your username" 
                                />
                                <input 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password" 
                                    className="form-control mb-3" 
                                    required 
                                    placeholder="Enter your password" 
                                />
                                <button onClick={handleSubmit} className="btn btn-primary w-100 mb-2" type="submit">Login</button>
                            </div>
                            <div className=' card-footer text-center'>
                                <Link to='/add-user' className='text-info'>Don't have an account? Sign Up!</Link>
                            </div>
                        </form>
                    </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Login