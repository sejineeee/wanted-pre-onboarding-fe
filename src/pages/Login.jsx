import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/form.scss';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const onChangeForm = (e, key) => {
    setForm({ ...form, [key]: e.target.value });
  };

  const emailValidation = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  const isValid = emailValidation.test(form.email) && form.password.length >= 8;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) {
      return alert('이메일 형식과 비밀번호가 8자리 이상인지 확인해주세요.');
    }
    try {
      const response = await axios.post(
        'https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/auth/signin',
        form
      );
      console.log(response);
      window.localStorage.setItem('login-token', response.data.access_token);
      navigate('/todo');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const hasLoginToken = !!window.localStorage.getItem('login-token');
    if (hasLoginToken) {
      navigate('/todo');
    }
  }, []);

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <div className="email-box">
          <label htmlFor="user-email">이메일</label>
          <input
            type="text"
            id="user-email"
            onChange={(e) => onChangeForm(e, 'email')}
          />
        </div>
        <div className="password-box">
          <label htmlFor="user-password">비밀번호</label>
          <input
            type="password"
            id="user-password"
            onChange={(e) => onChangeForm(e, 'password')}
          />
        </div>
        <button className="auth-button" type="submit" disabled={!isValid}>
          로그인
        </button>
      </form>
    </div>
  );
};

export default Login;
