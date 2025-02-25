import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './Navbar.css'; 

const Navbar = () => {

  const { logout, role,isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    setTimeout(() => navigate('/login'), 100); 
  };

  return (
    <nav className="navbar">

      <div className="navbar-logo">
        <Link to="/">Food Delivery</Link>
      </div>

      <ul className="navbar-links">
        
        {!isLoggedIn &&
          <li>
          <Link to="/">Home</Link>
        </li>
        }

        {!isLoggedIn &&
          <li>
          <Link to="/menu-list">Menu</Link>
        </li>
        }

        { role === 'CUSTOMER'  &&
        <li>
        <Link to="/menu-list">Menu</Link>
        </li> 
        }

        { role === 'CUSTOMER'  &&
        <li>
        <Link to="/orders">My Orders</Link>
        </li> 
        }

        { role === 'DELIVERER'  &&
          <li>
          <Link to="/orders">My DELIVERIES</Link>
          </li> 
        }
        

        {role === 'STAFF' && isLoggedIn &&
        <li>
          <Link to="/user-list">Users</Link>
        </li>
        }

      {role === 'STAFF' && isLoggedIn &&
        <li>
          <Link to="/orders">Orders</Link>
        </li>
      }

      {role === 'STAFF' && isLoggedIn && 
        <li>
          <Link to="/menu">Menu</Link>
        </li> 
      }
        
      </ul>

      <div className="navbar-auth">
        {isLoggedIn ?
        <Link onClick={handleLogout}>Logout</Link> :

        <Link to="/login">Login</Link>
      }
      </div>
    </nav>
  );
};

export default Navbar;