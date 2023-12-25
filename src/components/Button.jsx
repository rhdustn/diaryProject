import React from "react";

const Button = ({ text, type, onClick }) => {

    const BtnType=['positive', 'negative'].includes(type)? type:'defalut'
  return (
    <button className={`MyButton MyButton_${type}`} onClick={onClick}>
      {text}
    </button>
  );
};

Button.defaultProps = {
  type: "default",
};

export default Button;