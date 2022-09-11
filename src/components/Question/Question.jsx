import React from 'react'
import './Question.css'
const Question = (props) => {
  console.log(props)
  const options = props.options.map((option, i) =>
    <button
      id={`${props.id}O${i}`}
      className={`question-option ${
        i == props.selection ?
        "selected" :
        ""
      }`}
      key={`Opt${i}`}
      onClick={props.handleClick}
    >
      {option}
    </button>
  )
  return (
    <div className='question' id={props.id}>
      <div
        className='question-category'
      >
        {String(props.category)}
      </div>
      <div
        className='question-question'
      >
        {String(props.question)}
      </div>
      {options}
      <br></br>
    </div>
  )
}

export default Question