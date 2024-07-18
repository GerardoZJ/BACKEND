import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CurrentTemperature({ userId }) {
  const [temperature, setTemperature] = useState(null);

  useEffect(() => {
    const fetchTemperature = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/latest-temperature?usuario_id=${userId}`);
        setTemperature(response.data.temperature);
      } catch (error) {
        console.error('Error fetching temperature:', error);
      }
    };

    fetchTemperature();
  }, [userId]);

  return (
    <div className="current-temperature">
      <h2 className="temperature-location">Temperatura actual de tu alberca:</h2>
      <h2 className="temperature-value">
        {temperature !== null ? `${temperature}°C` : 'Loading...'}
      </h2>
    </div>
  );
}

export default CurrentTemperature;
