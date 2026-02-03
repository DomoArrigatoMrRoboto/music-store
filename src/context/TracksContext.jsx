import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback
} from "react";

const TracksContext = createContext();

export const TracksProvider = ({ children }) => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const fetchTracks = useCallback(async () => {
    setLoading(true);
    setError(false);

    try {
      const res = await fetch(`${API_URL}/api/tracks`);
      if (!res.ok) throw new Error("Failed to fetch tracks");

      const data = await res.json();
      setTracks(data);
    } catch (err) {
      console.error("Tracks fetch error:", err);
      setError(true);

      setTracks([
        {
          id: 1,
          name: "Sample Track 1",
          artist_name: "Sample Artist",
          image: ""
        },
        {
          id: 2,
          name: "Sample Track 2",
          artist_name: "Sample Artist",
          image: ""
        }
      ]);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchTracks();
  }, [fetchTracks]);

  return (
    <TracksContext.Provider
      value={{ tracks, loading, error, refetch: fetchTracks }}
    >
      {children}
    </TracksContext.Provider>
  );
};

export const useTracks = () => {
  const context = useContext(TracksContext);
  if (!context) {
    throw new Error("useTracks must be used inside TracksProvider");
  }
  return context;
};
