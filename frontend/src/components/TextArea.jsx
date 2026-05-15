import React from 'react';

const TextArea = (props) => {
  const { rows, cols, hint, className,borderColor = 'gray', ...otherProps } = props;

  return (
    <textarea
      {...otherProps}
      rows={rows}
      cols={cols}
      placeholder={hint}
      className={className}
      style={{
        border: `2px solid ${borderColor}`,
        color:'#00593F'
      }}
    ></textarea>
  );
};

export default TextArea;