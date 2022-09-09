import React, { useEffect, useState } from 'react'
import Question from '../Question/Question'
import "./Quiz.css"

const Quiz = (props) => {
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState([])

  useEffect(() => {
    const getQuestions = async () => {
      setLoading(true)
      await fetch("https://opentdb.com/api.php?amount=10")
        .then((res) => res.json())
        .then((data) => { 
          let q = []
          data.results.forEach(item => {
            q.push({
              ...item,
              selection: ""
            })
          });
          setQuestions(q) 
        })
        .finally(() => { setLoading(false) })
    }

    getQuestions()
  }, [])

  const selectOption = (e) => {
  }

  const questionElements = questions.map((question, i) => {
    const options = [...question.incorrect_answers, question.correct_answer]
    return (
      <Question
        key={`Q${i}`}
        category={question.category}
        question={question.question}
        options={options}
        correct={question.correct_answer}
        handleClick={(e) => selectOption(e)}
      />
    )
  })

  return (
    <div className='questions-container'>
      {loading ?
        <div className='loading'>Loading . . .</div>

        :

        <>
          <h1>Quiz</h1>
          {questionElements}

          <div className='buttons'>
            <button
              className='button'
              onClick={props.back}
            >
              Back
            </button>
            <button
              className='button right'
            >
              Check answers
            </button>
          </div>
        </>
      }
    </div>
  )
}

export default Quiz