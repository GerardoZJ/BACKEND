import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, CardFooter, CardTitle, Row, Col } from "reactstrap";
import { Line, Bar } from "react-chartjs-2";
import axios from 'axios';
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import CurrentTemperature from "components/CurrentTemperature.js";
import Clock from "components/Clock.js";

function Dashboard() {
  const [phData, setPhData] = useState([]);
  const [temperatureData, setTemperatureData] = useState([]);
  const [orpData, setOrpData] = useState([]);
  const [userId] = useState(1); 

  useEffect(() => {
    const fetchPhData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/ph-levels?usuario_id=${userId}`);
        setPhData(response.data);
      } catch (error) {
        console.error('Error fetching pH data:', error);
      }
    };

    const fetchTemperatureData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/temperature-levels?usuario_id=${userId}`);
        setTemperatureData(response.data);
      } catch (error) {
        console.error('Error fetching temperature data:', error);
      }
    };

    const fetchOrpData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/orp-levels?usuario_id=${userId}`);
        setOrpData(response.data);
      } catch (error) {
        console.error('Error fetching ORP data:', error);
      }
    };

    fetchPhData();
    fetchTemperatureData();
    fetchOrpData();
  }, [userId]);

  const formatPhData = {
    labels: phData.map(data => data.date),
    datasets: [{
      label: 'pH',
      data: phData.map(data => data.ph),
      fill: false,
      borderColor: 'rgba(75,192,192,1)',
      tension: 0.1
    }]
  };

  const formatTemperatureData = {
    labels: temperatureData.map(data => data.date),
    datasets: [{
      label: 'Temperature',
      data: temperatureData.map(data => data.temperature),
      fill: false,
      borderColor: 'rgba(255,99,132,1)',
      tension: 0.1
    }]
  };

  const formatOrpData = {
    labels: orpData.map(data => data.date),
    datasets: [{
      label: 'ORP',
      data: orpData.map(data => data.orp),
      fill: false,
      borderColor: 'rgba(54,162,235,1)',
      tension: 0.1
    }]
  };

  return (
    <>
      <PanelHeader size="lg" content={
        <div className="header-container">
          <div className="clock-container">
            <Clock />
            <CurrentTemperature userId={userId} />
          </div>
        </div>
      } />
      <div className="content">
        <Row>
          <Col xs={12} md={4}>
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Alcalinidad</h5>
                <CardTitle tag="h4">Medidor de pH</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line data={formatPhData} />
                </div>
              </CardBody>
              <CardFooter>
                <div className="stats">
                  <i className="now-ui-icons arrows-1_refresh-69" /> Tiempo real
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col xs={12} md={4}>
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Temperatura</h5>
                <CardTitle tag="h4">Temperatura</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line data={formatTemperatureData} />
                </div>
              </CardBody>
              <CardFooter>
                <div className="stats">
                  <i className="now-ui-icons arrows-1_refresh-69" /> Tiempo real
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col xs={12} md={4}>
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Oxidación</h5>
                <CardTitle tag="h4">Medidor de ORP</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar data={formatOrpData} />
                </div>
              </CardBody>
              <CardFooter>
                <div className="stats">
                  <i className="now-ui-icons arrows-1_refresh-69" /> Tiempo real
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
