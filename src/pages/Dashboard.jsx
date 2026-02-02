import { useState, useEffect, useCallback } from "react";
import { Button, Toast, ToastContainer, Alert, Spinner } from "react-bootstrap";
import { useCart } from "../context/CartContext.jsx";
import NavbarComponent from "../components/NavbarComponent.jsx";
import FooterComponent from "../components/FooterComponent.jsx";
import { FaArrowUp } from "react-icons/fa";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const { addToCart } = useCart();

  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const fetchTracks = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(`${API_URL}/api/tracks`);
      const data = await res.json();
      setTracks(data);
    } catch (err) {
      console.error("Error fetching tracks:", err);
      setError(true);

      setTracks([
        {
          id: 1,
          name: "Sample Track 1",
          artist_name: "Sample Artist",
          image: "https://via.placeholder.com/300"
        },
        {
          id: 2,
          name: "Sample Track 2",
          artist_name: "Sample Artist",
          image: "https://via.placeholder.com/300"
        }
      ]);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchTracks();
  }, [fetchTracks]);

  const handleAddToCart = (track) => {
    addToCart({
      idTrack: track.id,
      name: track.name,
      artist: track.artist_name,
      price: 1.99
    });

    setToastMessage(`Added "${track.name}" to cart!`);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2000);
  };

  const [showScrollTop, setShowScrollTop] = useState(false);
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="dashboard-page">
        <NavbarComponent />

        <div className="dashboard-bg-images">
          {[...Array(18)].map((_, i) => (
            <span key={i} className={`bg-img img-${i + 1}`} />
          ))}
        </div>

        <div className="dashboard-container">
          <div className="dashboard-header">
            <h1>Dashboard</h1>
            <p>Browse tracks and add them to your cart.</p>
          </div>

          {loading && (
            <div className="loading-wrapper">
              <Spinner animation="border" />
              <p>Loading tracks...</p>
            </div>
          )}

          {error && !loading && (
            <Alert
              variant="warning"
              className="d-flex justify-content-between align-items-center"
            >
              <span>Backend unavailable. Showing demo tracks.</span>
              <Button size="sm" variant="outline-dark" onClick={fetchTracks}>
                Retry
              </Button>
            </Alert>
          )}

          <div className="music-grid">
            {tracks.map((track) => (
              <div key={track.id} className="music-card">
                <img
                  src={track.image || "https://via.placeholder.com/300"}
                  alt={track.name}
                />
                <h3>{track.name}</h3>
                <p>{track.artist_name}</p>
                <Button
                  className="btn-add-cart"
                  onClick={() => handleAddToCart(track)}
                >
                  Add to Cart
                </Button>
              </div>
            ))}
          </div>
        </div>

        <ToastContainer position="top-end" className="p-3">
          <Toast
            show={toastVisible}
            bg="success"
            delay={2000}
            autohide
            onClose={() => setToastVisible(false)}
          >
            <Toast.Body className="text-white">{toastMessage}</Toast.Body>
          </Toast>
        </ToastContainer>

        <FooterComponent />
      </div>

      <button
        className={`scroll-top-btn ${showScrollTop ? "show" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
      >
        <FaArrowUp size={48} weight="bold" />
      </button>
    </>
  );
}
