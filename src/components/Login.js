import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import './LoginRegister.css'; 
import logo from 'assets/img/logo.jpg'; 

const LoginRegister = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    contrasena: '',
  });

  const { login, register } = useAuth();

  const switchModeHandler = () => {
    setIsLoginMode(prevMode => !prevMode);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      if (isLoginMode) {
        await login(formData.correo, formData.contrasena);
      } else {
        await register({
          nombre: formData.nombre,
          correo: formData.correo,
          contrasena: formData.contrasena,
        });
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="login-register">
      <div className="left-panel">
        <img src={logo} alt="logo" className="logo" /> {}
        <h2>BIENVENIDO A SMART AQUATICS</h2>
        <p>Donde controlas tu alberca remota!</p>
      </div>
      <div className="right-panel">
        <h2>{isLoginMode ? 'Log In' : 'Register'}</h2>
        <form onSubmit={submitHandler}>
          {!isLoginMode && (
            <div>
              <label>Nombre</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={inputChangeHandler}
                required
              />
            </div>
          )}
          <div>
            <label>Email</label>
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={inputChangeHandler}
              required
            />
          </div>
          <div>
            <label>Contraseña</label>
            <input
              type="password"
              name="contrasena"
              value={formData.contrasena}
              onChange={inputChangeHandler}
              required
            />
          </div>
          <button type="submit">{isLoginMode ? 'Sign In' : 'Register'}</button>
        </form>
        <div className="toggle-container">
          <button onClick={switchModeHandler}>
            {isLoginMode ? 'Not a Member yet?' : 'Already have an account?'}
          </button>
          <div className="social-icons">
            <i className="fa fa-facebook"></i>
            <i className="fa fa-google"></i>
            <i className="fa fa-twitter"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
