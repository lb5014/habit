import React from 'react';
import SignupForm from '../components/SignupForm';
import ThemeToggle from '../components/ThemeToggle';
import { useNavigate } from 'react-router-dom';

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="auth-page">
      <div className="theme-toggle-container">
        <ThemeToggle />
      </div>
      <SignupForm onSwitchToLogin={() => navigate('/login')} />
    </div>
  );
};

export default SignupPage;


