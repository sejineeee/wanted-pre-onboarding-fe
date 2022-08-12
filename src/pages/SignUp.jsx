import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ 
    email: '',
    password: ''
  });
  
  const onChangeForm = (e, key) => {
    setForm({...form, [key]: e.target.value});
  }

  const emailValidation = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const validation = emailValidation.test(form.email) && form.password.length >= 8;

  const createUser = async () => {
    try {
      const response = await axios.post('http://localhost:8080/users/create', form);
      alert(response.data.message);
      return navigate('/auth');
    } catch (error) {
      alert(error.response.data.details);
      navigate('/auth');
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
  
    if (!validation) {
      alert('이메일 형식과 비밀번호가 8자 이상인지 확인해주세요');
      return;
    }

    createUser();
  }

  return (
    <div className='container'>
      <h2>Sign up</h2>
      <form onSubmit={onSubmit}>
        <div className='email-box'>
          <label htmlFor="user-email">이메일</label>
          <input type="text" id="user-email" onChange={(e) => onChangeForm(e, 'email')} />
        </div>
        <div className='password-box'>
          <label htmlFor='user-password'>비밀번호</label>
          <input type='password' id="user-password" onChange={(e) => onChangeForm(e, 'password')} />
        </div>
        <button className='auth-button' type="submit" disabled={!validation}>회원가입</button>
      </form>
    </div>
  );
};

export default SignUp;