import { useState, useEffect } from "react";
import axios from 'axios';
import { useAuth } from '../AuthContext';

function MenuList() {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isLoggedIn, role, userId} = useAuth();
  const [isOrder, setIsOrder] = useState();
  const [deliverer, setDeliverer] = useState(null);
  const [deliverers, setDeliverers] = useState([]);
  const [menu, setMenu] = useState();

  
  useEffect(() => {
    async function fetchMenu() {
      try {
        const response = await fetch("http://localhost:8080/api/menus"); 
        if (!response.ok) {
          throw new Error("Failed to fetch menus");
        }
        const data = await response.json();
        setMenus(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMenu();
    fetchDeliverer();
  }, []);

  const fetchDeliverer = () => {
    axios.get('http://localhost:8080/api/users/role/deliverer').then((response) => {
      setDeliverers(response.data);
    });
  }

  const handleOrder = () => {
    const order = {
      customer: {id: userId},
      deliverer: {id: deliverer},
      menu,
      status: 'PENDING'
    }
    // Create a new order
    axios.post('http://localhost:8080/api/orders', order)
      .then(() => alert('Order placed successfully!'))
      .catch(() => alert('Failed to place order'));
      setIsOrder(false);
  };

  const toggleIsOrder = (menu) => {

    setIsOrder(!isOrder)
    setMenu(menu)

  }

  
  if (loading) {
    return <p>Loading menus...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container vh-100">
      <h1 className="text-center">Welcome To Today's Menu</h1>
      <div className="row">
        {menus.map((menu) => (
          <div key={menu.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-center">{menu.name}</h5>
                <p className="card-text text-center  flex-grow-1">{menu.description}</p>
                <div className="d-flex justify-content-between">
                    <p className="card-text">
                    <strong>Price: </strong>D{menu.price.toFixed(2)}
                    </p>
                    
                    {(isLoggedIn && role === 'CUSTOMER') && (
                      <button className="btn btn-primary" onClick={() => toggleIsOrder(menu)}>
                        Order Now
                      </button>
                )}
                </div> 
              </div>
            </div>
          </div>
        ))}
      </div>
      {isOrder &&
       <>
          <select
          value={deliverer || ""}
          onChange={(e) => setDeliverer(e.target.value)}
          className="form-control"
          >
          <option value="">--SELECT DELIVERER--</option>
          {deliverers.map((delivererOption, index) => (
          <option key={index} value={delivererOption.id}>
            {delivererOption.firstName} 
          </option>
           ))}
        </select>
        <button className="btn btn-primary mt-2"  onClick={() => handleOrder()}>Send Order</button>
        </>
      }
    </div>
  );
}

export default MenuList;
