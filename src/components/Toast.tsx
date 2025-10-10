import React, { useEffect, useState } from 'react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  onClose: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ 
  id, 
  type, 
  title, 
  message, 
  duration = 3000, 
  onClose 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // 애니메이션을 위한 지연
    const showTimer = setTimeout(() => setIsVisible(true), 100);
    
    // 자동 닫기
    const hideTimer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose(id);
    }, 300); // 애니메이션 시간과 맞춤
  };

  const getToastIcon = () => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return 'ℹ️';
    }
  };

  const getToastStyles = () => {
    const baseStyles = {
      opacity: isVisible && !isExiting ? 1 : 0,
      transform: isVisible && !isExiting ? 'translateX(0)' : 'translateX(100%)',
    };

    return baseStyles;
  };

  return (
    <div 
      className={`toast toast-${type}`}
      style={getToastStyles()}
      onClick={handleClose}
    >
      <div className="toast-content">
        <div className="toast-icon">
          {getToastIcon()}
        </div>
        <div className="toast-body">
          <div className="toast-title">{title}</div>
          {message && <div className="toast-message">{message}</div>}
        </div>
        <button 
          className="toast-close"
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
          aria-label="닫기"
        >
          ×
        </button>
      </div>
      <div className="toast-progress">
        <div 
          className="toast-progress-bar"
          style={{ 
            animationDuration: `${duration}ms`,
            animationPlayState: isExiting ? 'paused' : 'running'
          }}
        />
      </div>
    </div>
  );
};

export default Toast;
