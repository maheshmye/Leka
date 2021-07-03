import React from 'react'

/**
* @author
* @function Input
**/

const Input = (props) => {
  return(
    <div>
        <input type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange} />
    </div>
   )

 }

export default Input