import React from 'react';
import LoginForm from '../components/LoginForm';
import ThemeToggle from '../components/ThemeToggle';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="auth-page">
      <div className="theme-toggle-container">
        <ThemeToggle />
      </div>
      <LoginForm onSwitchToSignup={() => navigate('/signup')} />
    </div>
  );
};

export default LoginPage;


