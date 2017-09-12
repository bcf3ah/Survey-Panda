import React from 'react';

export default ({input, label, meta: {touched, error}}) => {
  return (
    <div>
      <label>{label}</label>
      <input {...input} style={{marginBottom: '10px'}}/>
      <div className="red-text" style={{marginBottom: '30px'}}>
        {touched && error}
      </div>
    </div>
  );
}
