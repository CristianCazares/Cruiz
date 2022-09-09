import React, { useEffect, useState } from 'react'
import Question from '../Question/Question'
import "./Quiz.css"
const Quiz = () => {
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    const getQuestions = async () => {
      const res = await (await fetch("https://opentdb.com/api.php?amount=10")).json()
      setQuestions(res.results)
    }

    getQuestions()
  }, [])


  const questionElements = questions.map((question, i) => {
    return (
      <Question
        key={`Q${i}`}
        category={question.category}
        question={question.question}
        options={[...question.incorrect_answers, question.correct_answer]}
        correct={question.correct_answer}
      />
    )
  })

  return (
    <div>
      <h1>Quiz</h1>
      {questionElements}

      <button
        className='button'
      >
        Back
      </button>
      <button
        className='button'
      >
        Check answers
      </button>
    </div>
  )
}

export default Quiz