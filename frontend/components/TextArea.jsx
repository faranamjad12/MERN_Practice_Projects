import React from 'react';

const TextArea = (props) => {
  const { rows, cols, hint, className, ...otherProps } = props;

  return (
    <textarea
      {...otherProps}
      rows={rows}
      cols={cols}
      placeholder={hint}
      className={className}
    ></textarea>
  );
};

export default TextArea;