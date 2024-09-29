import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function App() {
  const [cats, setCats] = useState([]); // Stores fetched cat images
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(false); // Error state
  const [empty, setEmpty] = useState(false); // Empty state
  const [page, setPage] = useState(1); // Tracks the current page
  const navigate = useNavigate(); 

  const fetchData = async (newPage = 1) => {
    setLoading(true);
    setError(false);
    setEmpty(false);

    try {
      const response = await fetch(
        `https://api.thecatapi.com/v1/images/search?limit=4&page=${newPage}&order=Desc`
      );
      const data = await response.json();

      if (data.length === 0) {
        setEmpty(true);
      } else {
        setCats(data);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (loading || error) return;
    const newPage = page + 1;
    setPage(newPage);
    fetchData(newPage);
  };

  const handlePrevious = () => {
    if (page > 1 && !loading && !error) {
      const newPage = page - 1;
      setPage(newPage);
      fetchData(newPage);
    }
  };

  return (
    <div className="App">
      <div className="sticky-container">
        <h2>Cat Image Gallery</h2>

        <div className="button-container">
          <button onClick={() => navigate("/single-column")} disabled={loading}>
            Open Single Column Page
          </button>
          <button onClick={() => fetchData(1)} disabled={loading}>
            Fetch Cat Image
          </button>
        </div>
      </div>

      <div className="content">
        {error && (
          <div className="centered-message">
            <p className="error-message">🐾 Oops! Error fetching data! 🐾</p>
          </div>
        )}
        {empty && (
          <div className="centered-message">
            <p className="empty-message">😺 No data available! Please try again! 😺</p>
          </div>
        )}

        {!error && !empty && (
          <div className="grid-container">
            {cats.map((cat, index) => (
              <div key={index} className="card">
                <img
                  src={cat.url}
                  alt="Cat"
                  fetchPriority={index < 3 ? "high" : "low"}
                  style={{ borderRadius: "10px" }}
                />
              </div>
            ))}
          </div>
        )}

        {loading && <div className="loader"></div>}
      </div>

      {/* Pagination buttons at the bottom */}
      <div className="pagination-container">
        <button
          onClick={handlePrevious}
          disabled={page === 1 || loading || error}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={loading || error || empty}
          style={{ marginRight: "2%" }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
