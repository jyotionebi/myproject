import React from 'react';

interface SimpleButtonProps {
  text: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  disabled?: boolean;
}

const SimpleButton: React.FC<SimpleButtonProps> = ({ 
  text, 
  onClick, 
  type = 'button',
  variant = 'primary',
  disabled = false 
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant}`}
    >
      {text}
    </button>
  );
};

export default SimpleButton;