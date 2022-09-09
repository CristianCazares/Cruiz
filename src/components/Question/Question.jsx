import React from 'react'
import './Question.css'
const Question = (props) => {
  const options = props.options.map((option, i) =>
    <button
      className='question-option'
      key={`Opt${i}`}
      onClick={props.handleClick}
    >
      {option}
    </button>
  )
  return (
    <div className='question'>
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