import React from 'react'
import Answer from '../Answer'
const Question = (props) => {
  const options = props.options.map((option, i) =>
    <button
      className='question-option'
      key={`Opt${i}`}
    >
      {option}
    </button>
  )
  return (
    <div>
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