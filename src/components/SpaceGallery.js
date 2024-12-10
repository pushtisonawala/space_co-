import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SpaceGallery.css'; // Space gallery specific styles

const SpaceGallery = () => {
  const [spaceData, setSpaceData] = useState([]);

  useEffect(() => {
    // Fetching data from the backend API
    axios.get('http://localhost:5000/api/space')
      .then(response => {
        setSpaceData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the space data!', error);
      });
  }, []);

  return (
    <div className="space-gallery">
      <h2>Explore Our Space Gallery</h2>
      <div className="gallery-container">
        {spaceData.map(data => (
          <div key={data._id} className="space-card">
            <h3>{data.title}</h3>
            <p>{data.description}</p>
            {data.imageUrl && <img className="space-image" src={data.imageUrl} alt={data.title} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpaceGallery;
