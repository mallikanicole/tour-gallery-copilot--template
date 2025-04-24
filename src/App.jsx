import { useState, useEffect } from 'react';
import Gallery from './components/Gallery';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  // State to store the list of tours
  const [tours, setTours] = useState([]);
  // State to manage the loading status
  const [loading, setLoading] = useState(true);
  // State to store any error messages
  const [error, setError] = useState(null);

  // Function to fetch tours data from the API
  const fetchTours = async () => {
    setLoading(true); // Set loading to true before fetching
    try {
      const response = await fetch('https://course-api.com/react-tours-project');
      if (!response.ok) {
        // Throw an error if the response is not successful
        throw new Error('Failed to fetch tours');
      }
      const data = await response.json();
      setTours(data); // Update the tours state with fetched data
      setError(null); // Clear any previous errors
    } catch (err) {
      // Handle any errors during the fetch
      setError(err.message);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  // useEffect to fetch tours data when the component mounts
  useEffect(() => {
    fetchTours();
  }, []);

  // Function to remove a tour from the list
  const removeTour = (id) => {
    setTours((prevTours) => prevTours.filter((tour) => tour.id !== id));
  };

  // Display a loading message while data is being fetched
  if (loading) {
    return <h2>Loading...</h2>;
  }

  // Display an error message if there is an error
  if (error) {
    return <h2>Error: {error}</h2>;
  }

  // Display a message and a refresh button if no tours are left
  if (tours.length === 0) {
    return (
      <div className="no-tours">
        <h2>No Tours Left</h2>
        <button onClick={fetchTours} className="btn">
          Refresh
        </button>
      </div>
    );
  }

  // Render the main content with the Gallery component
  return (
    <>
      {/* Header with Vite and React logos */}
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <h2>Tours</h2>
        {/* Pass tours data and removeTour function to the Gallery component */}
        <Gallery tours={tours} onRemove={removeTour} />
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
