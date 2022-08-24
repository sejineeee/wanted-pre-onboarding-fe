import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const loginToken = window.localStorage.getItem('login-token');

  const onClickLogout = () => {
    window.localStorage.clear();
    navigate('/')
  }

  return (
    <Container>
      <Wrapper>
      <Title>
        <Link to='/'>Sejinee's Todo Homepage</Link>
      </Title>
        <Util>
          {
            loginToken ? <button onClick={onClickLogout}>로그아웃</button> : <Link to="/">로그인</Link>
          }
        <Link to="/sign-up">회원가입</Link>
        </Util>
      </Wrapper>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  width: 100%;
  height: 100px;
  margin: 0 auto;
  background-color: #AAC6BC;
`

const Wrapper = styled.div`
  width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Title = styled.h1`
  a {
    color: #3A413F;
    text-decoration: none;
  }
`

const Util = styled.div`
  width: 300px;
  a {
    margin-left: 30px;
    text-decoration: none;
    color: #3A413F;
    font-weight: bold;
  }
`
