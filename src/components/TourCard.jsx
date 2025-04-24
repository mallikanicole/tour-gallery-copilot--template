import React from 'react';

function TourCard({ tour, onRemove }) {
  // Destructure the tour object to extract its properties
  const { id, name, info, image, price } = tour;

  return (
    <div className="tour-card">
      {/* Display the tour image */}
      <img src={image} alt={name} className="tour-image" />
      <div className="tour-details">
        {/* Display the tour name and price */}
        <h2>{name}</h2>
        <h4>${price}</h4>
        {/* Display the tour information */}
        <p>{info}</p>
        {/* Button to remove the tour, calls onRemove with the tour's id */}
        <button onClick={() => onRemove(id)} className="btn">
          Not Interested
        </button>
      </div>
    </div>
  );
}

export default TourCard;