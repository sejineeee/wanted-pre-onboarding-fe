import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/form.scss';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({email: "", password: ""});

  const onChangeForm = (e, key) => {
    setForm({...form, [key]: e.target.value})
  }
  
  const emailValidation = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  
  const isValid = emailValidation.test(form.email) && form.password.length >= 8;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) {
      return alert('이메일 형식과 비밀번호가 8자리 이상인지 확인해주세요.')
    }
    try {
      const response = await axios.post('http://localhost:8080/users/login', form);
      window.localStorage.setItem('login-token', response.data.token)
      alert(response.data.message);
      return navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='container'>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <div className='email-box'>
          <label htmlFor="user-email">이메일</label>
          <input type="text" id="user-email" onChange={(e) => onChangeForm(e, "email")} />
        </div>
        <div className='password-box'>
          <label htmlFor="user-password">비밀번호</label>
          <input type="password" id="user-password" onChange={(e) => onChangeForm(e, "password")} />
        </div>
        <button className="auth-button" type="submit" disabled={!isValid}>로그인</button>
      </form>
    </div>
  );
};

export default Login;