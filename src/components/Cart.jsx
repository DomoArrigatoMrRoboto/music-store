import React from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { useCart } from "../context/CartContext.jsx";

export default function Cart({ show, handleClose }) {
  const { cart, removeFromCart, clearCart } = useCart();
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart 🛒</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {cart.length === 0 && <p>Your cart is empty.</p>}
        {cart.map((item) => (
          <div
            key={item.idTrack}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "0.5rem",
              alignItems: "center",
            }}
          >
            <div>
              <strong>{item.name}</strong>
              <br />
              Qty: {item.quantity}
            </div>
            <div>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
              <Button
                size="sm"
                variant="danger"
                onClick={() => removeFromCart(item.idTrack)}
                style={{ marginLeft: "0.5rem" }}
              >
                -
              </Button>
            </div>
          </div>
        ))}

        {cart.length > 0 && (
          <>
            <hr />
            <p>Total: ${total}</p>
            <Button variant="danger" onClick={clearCart}>
              Clear Cart
            </Button>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
}
