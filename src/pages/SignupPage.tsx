import React from 'react';
import SignupForm from '../components/SignupForm';
import { useNavigate } from 'react-router-dom';

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="auth-page">
      <SignupForm onSwitchToLogin={() => navigate('/login')} />
    </div>
  );
};

export default SignupPage;


