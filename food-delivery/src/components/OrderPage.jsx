import { useState, useEffect } from "react";
const OrderPage = ({ user }) => {
    const [orders, setOrders] = useState([]);
  
    useEffect(() => {
      axios.get(`http://localhost:8080/api/orders/deliverer/${user.id}`).then((response) => {
        setOrders(response.data);
      });
    }, [user.id]);
  
    const markAsDelivered = (orderId) => {
      axios.put(`http://localhost:8080/api/orders/${orderId}/status`, { status: 'DELIVERED' })
        .then(() => alert('Order marked as delivered!'))
        .catch(() => alert('Error updating order status'));
    };
  
    return (
      <div>
        <h3>Your Orders</h3>
        <List>
          {orders.map((order) => (
            <ListItem key={order.id}>
              <ListItemText
                primary={`Order #${order.id} - ${order.menu.name}`}
                secondary={`Customer: ${order.customer.firstName} - Status: ${order.status}`}
              />
              {order.status === 'PENDING' && (
                <Button onClick={() => markAsDelivered(order.id)} variant="contained">Deliver</Button>
              )}
            </ListItem>
          ))}
        </List>
      </div>
    );
  };
  
  export default OrderPage;
  