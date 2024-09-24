import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './productcard.css';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion'; 
import { addToCart, removeFromCart, clearCart, deleteFromCart } from './cartSlice'; 
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast, Toaster } from 'react-hot-toast';

const Cart = () => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const itemCounter = (id) => {
    return items.filter((item) => item.id === id).length;
  };

  const handleAddItem = (item) => {
    dispatch(addToCart(item));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleDeleteItem = (id) => {
    dispatch(deleteFromCart(id));
    toast.error("Removed successfully")
  };

  const placeOrder = () => {
    if (items.length === 0) {
      toast.error("Your cart is empty! Add items before placing an order.");
    } else {
      dispatch(clearCart());
      toast.success("Order placed successfully");
    }
  };

  return (
    <div className='align-items-center'>
      <Toaster /> {/* Add Toaster for toast messages */}
      <h2>Your Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="container">
          <div className="row">
            {Array.from(new Set(items.map(item => item.id))).map((id) => {
              const item = items.find((item) => item.id === id); // Get unique item
              const count = itemCounter(id); // Get item count
              
              return (
                <div key={id} className="col-md-4 col-sm-6 col-lg-3 mb-4">            
                  <div className="card product-card shadow-sm">
                    <div className="image-container">
                      <img 
                        src={item.image} 
                        className="card-img-top product-img" 
                        alt={item.title} 
                      />
                    </div>

                    <div className="card-body align-items-center">
                      <h5 className="card-title">{item.title}</h5>
                                            <h5 className="price-badge">$ {item.price}</h5>
                      
                      <div className="quantity-control d-flex align-items-center justify-content-between">
                        <motion.button 
                          onClick={() => handleRemoveItem(id)} 
                          whileHover={{ scale: 1.1 }} 
                          className="btn btn-light mr-3"
                        >
                          <strong style={{ fontSize: '1.5rem' }}>-</strong>
                        </motion.button>

                        <h5 className="m-0" style={{ fontSize: '1.5rem' }}>{item.quantity}</h5>
                        
                        <motion.button 
                          onClick={() => handleAddItem(item)} 
                          whileHover={{ scale: 1.1 }} 
                          className="btn btn-dark ml-3"
                        >
                          <strong style={{ fontSize: '1.5rem' }}>+</strong>
                        </motion.button>
                      </div>
                      
                      <motion.button 
                        onClick={() => handleDeleteItem(id)} 
                        className="delete-btn"
                        style={{
                          backgroundColor: 'rgba(255, 0, 0, 0.6)', 
                          borderRadius: '50%',
                          border: 'none',
                          width: '40px',
                          height: '40px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          bottom: '-10px', 
                          backdropFilter: 'blur(10px)', 
                          boxShadow: '0 0 10px rgba(255, 0, 0, 0.5)',
                        }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <RiDeleteBin6Line size={20} color='white' />
                      </motion.button>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Center the Place Orders button */}
      <div className="d-flex justify-content-center mt-4">
        <button className="btn btn-dark" onClick={placeOrder}>Place Orders</button>
      </div>
    </div>
  );
};

export default Cart;
