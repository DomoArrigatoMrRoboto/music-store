import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Container,
} from "react-bootstrap";
import { FaMusic, FaShoppingCart } from "react-icons/fa";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";
import { useSearch } from "../context/SearchContext.jsx";
import { useNavigate, Link } from "react-router-dom";
import Cart from "./Cart.jsx";

export default function NavbarComponent() {
  const { isAuthenticated, logout } = useAuth();
  const { cart } = useCart();
  const { setQuery } = useSearch();
  const [searchTerm, setSearchTerm] = useState("");
  const [showCart, setShowCart] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleCartShow = () => setShowCart(true);
  const handleCartClose = () => setShowCart(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setQuery(searchTerm);
      navigate("/search");
      setSearchTerm("");
    }
  };

  return (
    <>
      <Navbar variant="dark" fixed="top" className="navbar-transparent py-2">
        <Container fluid className="px-2 px-sm-3">
          <Navbar.Brand
            as={Link}
            to="/"
            className="d-flex align-items-center gap-2 navbar-brand-neon"
          >
            <FaMusic size={24} />
            <span className="d-none d-sm-inline">The Music Store</span>
          </Navbar.Brand>
          <Form
            className="d-flex flex-grow-1 mx-2"
            style={{ maxWidth: "500px", minWidth: "120px" }}
            onSubmit={handleSearchSubmit}
          >
            <FormControl
              type="search"
              placeholder="Search..."
              className="me-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button type="submit" className="btn-nav btn-nav-primary">
              Search
            </Button>
          </Form>
          <Nav className="d-flex align-items-center gap-2 flex-shrink-0">
            <Button
              onClick={handleCartShow}
              className="btn-nav-accent d-flex align-items-center gap-1 position-relative cart-btn"
            >
              <FaShoppingCart />
              <span className="d-none d-md-inline">Cart</span>
              {cart.length > 0 && (
                <span className="cart-badge">{cart.length}</span>
              )}
            </Button>

            {isAuthenticated && (
              <Button className="btn-nav btn-nav-logout" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </Nav>
        </Container>
      </Navbar>

      <Cart show={showCart} handleClose={handleCartClose} />
    </>
  );
}
