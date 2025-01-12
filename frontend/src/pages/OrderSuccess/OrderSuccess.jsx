import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./OrderSuccess.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId } = location.state || {};
  const { url, token } = useContext(StoreContext);

  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId || !token) return;
      try {
        const response = await axios.get(`${url}/api/order/${orderId}`, {
          headers: { token },
        });
        if (response.data.success) {
          setOrderDetails(response.data.data);
        } else {
          setError("Failed to fetch order details. Please try again later.");
        }
      } catch (err) {
        setError("An error occurred while fetching order details.");
      }
    };

    fetchOrderDetails();
  }, [orderId, token, url]);

  return (
    <div className="order-success">
      <h1>Order Placed Successfully!</h1>
      <img src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExczhjcnRxdmh6djg0ZGEzdDc2ajNkcmJ4cm0wYjdsZ3B0bXkxZDEwcSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dFC5P4RUiTHxAi5Ds4/giphy.gif" alt="Order Success" className="success-gif" />
      {orderId ? (
        <>
          <p>Your order ID is: <strong>{orderId}</strong></p>
          {orderDetails ? (
            <div className="order-details">
              <p><strong>Total Amount:</strong> ${orderDetails.amount}.00</p>
              <p><strong>Status:</strong> {orderDetails.status}</p>
              <h3>Items:</h3>
              <ul>
                {orderDetails.items.map((item, index) => (
                  <li key={index}>{item.name} x {item.quantity}</li>
                ))}
              </ul>
            </div>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : (
            <p>Loading order details...</p>
          )}
          <p>Thank you for your purchase!</p>
        </>
      ) : (
        <p>We couldn't retrieve your order details. Please check your email for confirmation or contact support.</p>
      )}
      <button className="home-button" onClick={() => navigate('/')}>Return to Home</button>
    </div>
  );
};

export default OrderSuccess;
