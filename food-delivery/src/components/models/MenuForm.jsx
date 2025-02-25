import { useEffect, useState } from "react";
import {Link, useNavigate, useParams  } from 'react-router-dom';
import { useAuth } from '../AuthContext';

function MenuForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [menuId, setMenuId] = useState(null);
  const { id: menu_id } = useParams();

  useEffect(() => {
    if (menu_id) {
      fetch(`http://localhost:8080/api/menus/${menu_id}`)
        .then(response => response.json())
        .then(data => {
          setMenuId(data.id);
          setName(data.name);
          setDescription(data.description);
          setPrice(data.price);
          
        })
        .catch(error => console.error('Error fetching menu:', error));
    }
  }, [menu_id]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!name || !description || !price) {
        setError("Please fill in all fields.");
        setTimeout(() => setError(null), 3000); // Hide error after 3 seconds
        return;
      }
    setLoading(true);
    setError(null);
    setSuccess(null);

    let response;
    try {

      if(menuId) {
        const menuData = {
          id: menu_id,
          name,
          description,
          price: parseFloat(price), 
        };

          response = await fetch(`http://localhost:8080/api/menus/${menuId}`, {  
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(menuData),
        });

      } else {

        const menuData = {
          name,
          description,
          price: parseFloat(price), // Convert price to float
        };

          response = await fetch("http://localhost:8080/api/menus", {  // Adjust the API URL as needed
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(menuData),
        });

      }


      if (!response.ok) {
        throw new Error("Failed to create menu.");
      }

      const result = await response.json();
      {!menu_id ? 
      setSuccess("Menu added successfully!") :
      setSuccess("Menu updated successfully!") 
      }
      setTimeout(() => setSuccess(null), 2000);
      setName("");
      setDescription("");
      setPrice("");
      setTimeout(() => navigate('/menu'), 2100);
    } catch (error) {
      setError(error.message);
      setTimeout(() => setError(null), 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center">Add New Menu</h1>

      {/* Display success or error message */}
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
           
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            id="price"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            
          />
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Adding..." : "Add Menu"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default MenuForm;
