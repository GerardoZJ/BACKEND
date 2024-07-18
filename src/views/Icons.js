import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import "./CalendarDisplay.css"; 

function CalendarDisplay() {
  const [pHData, setPHData] = useState([]);
  const [maxPHDay, setMaxPHDay] = useState(null);

  useEffect(() => {
    const fetchPHData = async () => {
      const data = await fetchPHLevels();
      setPHData(data);
      const maxDay = getMaxPHDay(data);
      setMaxPHDay(maxDay);
    };

    fetchPHData();
  }, []);

  const fetchPHLevels = async () => {
    return [
      { date: '2024-06-01', ph: 7.2 },
      { date: '2024-06-02', ph: 7.8 },
      { date: '2024-06-03', ph: 7.1 },
    ];
  };

  const getMaxPHDay = (data) => {
    return data.reduce((max, current) => (current.ph > max.ph ? current : max), data[0]).date;
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateString = date.toISOString().split('T')[0];
      if (dateString === maxPHDay) {
        return 'highlight';
      }
    }
    return null;
  };

  return (
    <>
      <div className="calendar-header">
        <h2>Calendario de Mantenimiento</h2>
        <p>Donde controlas tu alberca remota!</p>
      </div>
      <div className="content calendar-container">
        <Row>
          <Col md={12}>
            <Card className="calendar-card">
              <CardHeader>
                <h5 className="title">Calendario</h5>
              </CardHeader>
              <CardBody>
                <Calendar tileClassName={tileClassName} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default CalendarDisplay;
