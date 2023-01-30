import React from 'react';
import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import '../styles/register.css';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading())
      const res = await axios.post('/api/v1/user/login', values);
      window.location.reload();
      dispatch(hideLoading())
      if (res.data.success) {
        localStorage.setItem('token', res.data.token)
        message.success('Login Successfully!');
        navigate('/');
        
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error);
      message.error('Something went wrong!');
    }
  };
  return (
    <div className="form-container">
      <Form layout="vertical" className="register-form" onFinish={onFinishHandler}>
        <h3>Login</h3>
        <Form.Item label="Email" name="email">
          <Input type="email" required />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password" required />
        </Form.Item>
        <Link to="/register">Not a user register here</Link>
        <button className="btn btn-primary" type="submit">
          Log In
        </button>
      </Form>
    </div>
  );
};

export default Login;
