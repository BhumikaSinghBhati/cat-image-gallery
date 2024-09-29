import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./App.css";

function InfiniteScroll() {
  const [cats, setCats] = useState([]); // Stores fetched cat images
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(false); // Error state
  const [empty, setEmpty] = useState(false); // Empty state
  const [page, setPage] = useState(1); // Tracks the current page
  const limit = 5; 
  const navigate = useNavigate(); 

  const fetchData = async (newPage) => {
    setLoading(true);
    setError(false);
    setEmpty(false);
    try {
      const response = await fetch(
        `https://api.thecatapi.com/v1/images/search?limit=${limit}&page=${newPage}&order=Desc`
      );
      const data = await response.json();

      if (data.length === 0) {
        setLoading(false);
        setEmpty(true);
      } else {
        setCats((prevCats) => [...prevCats, ...data]); 
        setLoading(false);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(true);
      setLoading(false);
    }
  };

  const handleFetchImages = () => {
    setPage(1); 
    setCats([]); 
    fetchData(1); 
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchData(nextPage);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' 
    });
  };

  return (
    <div className="App">
      <div className="sticky-container">
      <h3 className="sticky-container__title">Single Column Cat Image Gallery</h3>

      <div className="button-container">
        <button onClick={() => navigate("/")} >
            Go to Pagination Page
        </button>

        <button
            onClick={handleFetchImages}
            disabled={loading} 
        >
            Fetch Cat Images
        </button>
      </div>
      </div>

      {error && (
        <div className="centered-message">
          <p className="error-message">
            🐾 Oops! Error fetching data! 🐾
          </p>
        </div>
      )}

      {empty && (
        <div className="centered-message">
          <p className="empty-message">😺 No data available! Please try again! 😺</p>
        </div>
      )}

      {!error && !empty && cats.length > 0 && (
        <div className="single-column-container">
          {cats.map((cat, index) => (
            <div key={index} className="single-column-card">
              <img
                src={cat.url}
                alt="Cat"
                fetchPriority={index < 3 ? "high" : "low"}
                style={{ borderRadius: '10px' }} 
              />
            </div>
          ))}
        </div>
      )}

      {!loading && cats.length > 0 && !error && (
        <button onClick={loadMore} style={{ marginTop: '20px', display: 'block', margin: '20px auto' }}>
          Load More
        </button>
      )}

      {loading && <div className="loader"></div>}

      {!loading && cats.length > 0 && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          &#8593; {/* Up arrow symbol */}
        </button>
      )}
    </div>
  );
}

export default InfiniteScroll;
