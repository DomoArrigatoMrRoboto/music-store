import { useTracks } from "../context/TracksContext.jsx";
import NavbarComponent from "../components/NavbarComponent.jsx";
import FooterComponent from "../components/FooterComponent.jsx";
import { Button, Spinner } from "react-bootstrap";
import { useCart } from "../context/CartContext.jsx";

export default function Browse() {
  const { tracks, loading } = useTracks();
  const { addToCart } = useCart();

  const handleAddToCart = track => {
    addToCart({
      idTrack: track.id,
      name: track.name,
      artist: track.artist_name,
      price: 1.99
    });
  };

  return (
    <div className="dashboard-page">
      <NavbarComponent />

      <div className="dashboard-container">
        <h2>Browse Music</h2>

        {loading &&
          <div className="loading-wrapper">
            <Spinner animation="border" />
            <p>Loading tracks...</p>
          </div>}

        <div className="music-grid">
          {tracks.map(track =>
            <div key={track.id} className="music-card">
              <img
                src={track.image || "https://via.placeholder.com/300"}
                alt={track.name}
              />
              <h3>
                {track.name}
              </h3>
              <p>
                {track.artist_name}
              </p>
              <Button onClick={() => handleAddToCart(track)}>
                Add to Cart
              </Button>
            </div>
          )}
        </div>
      </div>

      <FooterComponent />
    </div>
  );
}
