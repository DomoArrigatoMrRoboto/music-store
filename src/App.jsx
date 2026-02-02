import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Search from "./pages/Search.jsx";
import Browse from "./pages/Browse.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";

import { TracksProvider } from "./context/TracksContext.jsx";
import { SearchProvider } from "./context/SearchContext.jsx";

export default function App() {
  return (
    <TracksProvider>
      <SearchProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/browse" element={<Browse />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </SearchProvider>
    </TracksProvider>
  );
}
