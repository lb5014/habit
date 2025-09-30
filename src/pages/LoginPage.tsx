import React from 'react';
import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="auth-page">
      <LoginForm onSwitchToSignup={() => navigate('/signup')} />
    </div>
  );
};

export default LoginPage;


