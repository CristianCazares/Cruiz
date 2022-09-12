import React from 'react'
import './Question.css'

const Question = (props) => {
  const options = props.options.map((option, i) =>
    <button
      id={`${props.id}O${i}`}
      className={`question-option ${i == props.selection ?
        " selected " :
        ""
        }
        ${setOptionResultClass(option)}
        `}
      key={`Opt${i}`}
      onClick={props.handleClick}
      disabled={props.isChecked}
    >
      {option}
    </button>
  )

  function setOptionResultClass(option) {
    if (!props.isChecked) {
      return ""
    }

    let classString = " disabled "

    if (option === props.correct) {
      classString += " correct "
    }

    if (option === props.options[props.selection]){
      if (option !== props.correct){
        classString += " incorrect "
      }
    }

    if (props.selection === undefined){
      classString += " incorrect "
    }




    return classString
  }



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