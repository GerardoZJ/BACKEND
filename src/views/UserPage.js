import React, { useState, useEffect } from 'react';
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, Row, Col } from 'reactstrap';
import axios from 'axios';
import PanelHeader from 'components/PanelHeader/PanelHeader.js';
import { useAuth } from '../components/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './User.css'; 

function User() {
  const { logout, user, setUser } = useAuth();

  const [profileData, setProfileData] = useState({
    id: '',
    nombre: '',
    correo: '',
    contrasena: '',
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        id: user.id,
        nombre: user.nombre,
        correo: user.correo,
        contrasena: user.contrasena, 
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put('http://localhost:5000/updateProfile', profileData);
      if (response.data.success) {
        alert('Datos actualizados correctamente');
        setUser(profileData); 
      } else {
        alert('Error al actualizar los datos');
      }
    } catch (error) {
      console.error('Error al actualizar los datos:', error);
      alert('Error al actualizar los datos');
    }
  };

  const handleLogout = () => {
    logout();
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <PanelHeader size="sm" />
      <div className="content user-container">
        <Row>
          <Col md="8">
            <Card>
              <CardHeader>
                <h5 className="title">Editar Perfil</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="px-1" md="6">
                      <FormGroup>
                        <label>Nombre</label>
                        <Input
                          name="nombre"
                          value={profileData.nombre}
                          onChange={handleChange}
                          placeholder="Nombre"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">Correo</label>
                        <Input
                          name="correo"
                          value={profileData.correo}
                          onChange={handleChange}
                          placeholder="Correo"
                          type="email"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Contraseña</label>
                        <Input
                          name="contrasena"
                          value={profileData.contrasena}
                          onChange={handleChange}
                          placeholder="Contraseña"
                          type="password"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <div className="image"></div>
              <CardBody>
                <div className="author">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <FontAwesomeIcon icon={faUser} className="avatar-icon" />
                    <h5 className="title">{user.nombre}</h5>
                  </a>
                  <p className="description">{user.correo}</p>
                </div>
              </CardBody>
              <hr />
              <div className="button-container">
                <Button color="primary" onClick={handleUpdate}>Actualizar</Button>
                <Button color="danger" onClick={handleLogout}>Cerrar Sesión</Button>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default User;
