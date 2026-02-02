import { useTracks } from "../context/TracksContext.jsx";
import { useSearch } from "../context/SearchContext.jsx";
import NavbarComponent from "../components/NavbarComponent.jsx";
import FooterComponent from "../components/FooterComponent.jsx";
import { Button } from "react-bootstrap";
import { useCart } from "../context/CartContext.jsx";

export default function Search() {
  const { tracks } = useTracks();
  const { query } = useSearch();
  const { addToCart } = useCart();

  const results = tracks.filter(
    track =>
      track.name.toLowerCase().includes(query.toLowerCase()) ||
      track.artist_name.toLowerCase().includes(query.toLowerCase())
  );

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
        <h2>
          Search results for "{query}"
        </h2>

        {results.length === 0 && <p>No tracks found.</p>}

        <div className="music-grid">
          {results.map(track =>
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
