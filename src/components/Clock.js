import React, { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/es'; 
import './Clock.css';  

moment.locale('es'); 

const Clock = () => {
  const [time, setTime] = useState(moment().format('LTS'));
  const [date, setDate] = useState(moment().format('dddd, D [de] MMMM [de] YYYY'));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment().format('LTS'));
      setDate(moment().format('dddd, D [de] MMMM [de] YYYY'));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="clock-container">
      <div className="icon">
        <i className="fas fa-clock"></i>
      </div>
      <div className="date">{date}</div>
      <div className="time">{time}</div>
    </div>
  );
};

export default Clock;
