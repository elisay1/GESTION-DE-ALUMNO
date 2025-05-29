import './button.css';

export const Button = ({ onClick, text, type, disabled = false }) => {
  let buttonClass = 'generalButton';

  switch (type) {
    case 'add':
      buttonClass += ' turquoiseButton';
      break;
    case 'delete':
    case 'back':
      buttonClass += ' redButton';
      break;
    case 'edit':
      buttonClass += ' orangeButton';
      break;
    default:
      break;
  }

  return (
    <button
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};