import { useEffect, useState } from "react";
import {Link, useNavigate, useParams  } from 'react-router-dom';
import { useAuth } from '../AuthContext';

function CreateUser(){
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [available, setAvailability] = useState('');
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
    const [userId, setUserId] = useState(null);
    const { id: user_id } = useParams();

    const [notificationMessage, setNotificationMessage] = useState(null);
    const [notificationType, setNotificationType] = useState(null);

    useEffect(() => {
      if (user_id) {
        fetch(`http://localhost:8080/api/users/${user_id}`)
          .then(response => response.json())
          .then(data => {
            setUserId(data.id);
            setFirstName(data.firstName);
            setLastName(data.lastName);
            setEmail(data.email);
            setPassword(data.password);
            setRole(data.role);
            setPhone(data.phone);
            setAddress(data.address);
            setAvailability(data.available);
          })
          .catch(error => console.error('Error fetching user:', error));
      }
    }, [user_id]);



    const handleSubmit = async (e) => {
      e.preventDefault();
    
      // Validate inputs
      if (!firstName || !lastName || !email || !password || !phone || !role) {
        setNotificationMessage("All fields are required.");
        setNotificationType("error");
        setTimeout(() => setNotificationMessage(null), 3000);
        return;
      }

      setNotificationMessage(null); // Clear previous notification
      setNotificationType(null);
    
      let response;
      try {

        if (userId) {
            const user = {
              id: user_id,
              firstName,
              lastName,
              email,
              password,
              role,
              phone,
              address: address,
              available: available,
            };

             response = await  fetch(`http://localhost:8080/api/users/${userId}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(user),
            });
        } else {

          const newUser = {
            firstName,
            lastName,
            email,
            password,
            role,
            phone,
            address: role !== "STAFF" ? address : null,
            available: role === "DELIVERER" ? available : null,
          };
           
          response = await fetch("http://localhost:8080/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
          });
        }

       
    
     
        if (response.ok) {
          const result = await response.json();
          {isLoggedIn ? 
            !user_id ? setNotificationMessage("User created successfully!") : setNotificationMessage("User updated successfully!")
 
          :
          setNotificationMessage("Account created successfully!");
          }
          setNotificationType("success");
          setTimeout(() => setNotificationMessage(null), 2000); // Hide notification after 3 seconds
    
          
          setFirstName('');
          setLastName('');
          setEmail('');
          setPassword('');
          setPhone('');
          setAddress('');
          setRole('');
          setAvailability('');

          setTimeout(() => {isLoggedIn ? 
            navigate('/user-list') :
            navigate('/login')
          }, 1000)

        } else {
          // Handle error if the response status is not OK
          const errorData = await response.json();
          {!user_id ? 
            setNotificationMessage(errorData.messages || "Failed to create user.") : 
            setNotificationMessage(errorData.messages || "Failed to update user.")
          }

          setNotificationType("error");
          setTimeout(() => setNotificationMessage(null), 3000); // Hide notification after 3 seconds
        }
      } catch (error) {
        // Handle network or other unexpected errors
        {!user_id ? 
          setNotificationMessage(errorData.messages || "Failed to create user.") : 
          setNotificationMessage(errorData.messages || "Failed to update user.")
        }
        setNotificationType("error");
        setTimeout(() => setNotificationMessage(null), 3000); // Hide notification after 3 seconds
      } 
    };
    




    return(
        <>
            <form  style={{backgroundColor: '#3333'}}>
               <div className="container-fluid d-flex min-vh-100 align-items-center justify-content-center row">
                  <div className="card border-secondary text-center row py-5 bg-light col-md-6">
            
                  {isLoggedIn ? 
                            !user_id ? 
                                <div className="card-header  mb-3 text-center col-md-12 h1 text-secondary">
                                    <h4>Create a User</h4>
                                </div> : 
                                <div className="card-header  mb-3 text-center col-md-12 h1 text-secondary">
                                    <h4>Update a User</h4>
                                </div> 
                      :
                  <div className="mb-3 text-center col-md-12 h1 text-secondary">
                    Create an Account
                  </div>
                }


            {notificationMessage && (
              <div className={`alert alert-${notificationType === 'success' ? 'success' : 'danger'} text-center`}>
                {notificationMessage}
              </div>
            )}
            <div className="card-body">
              <label className="form-label col-md-12">
                First Name
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="form-control"
                  type="text"
                  name="firstName"
                  id="firstName"
                />
              </label>
            </div>
            <div>
              <label className="form-label col-md-12">
                Last Name
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="form-control"
                  type="text"
                  name="lastName"
                  id="lastName"
                />
              </label>
            </div>
            {!user_id && 
            <div>
              <label className="form-label col-md-12">
                Phone
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-control"
                  type="tel"
                  name="phone"
                  id="phone"
                />
              </label>
            </div>
            }
            <div>
              <label className="form-label col-md-12">
                Username
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  type="text"
                  name="email"
                  id="email"
                />
              </label>
            </div>
            {!user_id && 
            <div>
              <label className="form-label col-md-12">
                Password
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  type="password"
                  name="password"
                  id="password"
                />
              </label>
            </div>
             }
  
            <div>
              <label className="form-label col-md-12">
                Role
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="form-control"
                >
                  <option value="">--SELECT ROLE--</option>
                  <option value="CUSTOMER">Customer</option>
                  <option value="STAFF">Staff</option>
                  <option value="DELIVERER">Deliverer</option>
                </select>
              </label>
            </div>
            
            {role != "STAFF" && role != "" && !user_id && 
            <div>
              <label className="form-label col-md-12">
                Address
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="form-control"
                  type="text"
                  name="address"
                  id="address"
                />
              </label>
            </div>
            }
            {role == "DELIVERER" && !user_id && 
            <div>
              <label className="form-label col-md-12">
                Available
                <select
                  value={available}
                  onChange={(e) => setAvailability(e.target.value)}
                  className="form-control"
                >
                  <option value="">--IS DELIVERER AVAILABLE--</option>
                  <option value={true}>YES</option>
                  <option value={false}>NO</option>
                </select>
              </label>
            </div>
            }
            <div className="text-center mt-3 mb-2">
              <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                Submit
              </button>
            </div>
            {/* Only render this footer if user is not logged in */}
            {!isLoggedIn && (
                            <div className=' card-footer text-center'>
                                <Link to='/login' className='text-info'>Already have an account? Sign In!</Link>
                            </div>
                        )}
          </div>
        </div>
      </form>
        </>
    )
}

export default CreateUser