// import React from 'react'

// const TextInput = () => {
//   return (
//     <input
//           placeholder="Search..."
//           className="w-full mb-4 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
//         />
//   )
// }

// export default TextInput

import React from "react";

const TextInput = (props) => {
  const { type = "text", hint, className, ...otherProps } = props;

  return (
    <input
      {...otherProps}
      type={type}
      placeholder={hint}
      className={className}
    />
  );
};

export default TextInput;
