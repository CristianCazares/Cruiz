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
          data.results.forEach((item, i) => {
            q.push({
              ...item,
              options: [...item.incorrect_answers, item.correct_answer],
              selection: undefined,
              id: i
            })
          });
          setQuestions(q)
        })
        .finally(() => { setLoading(false) })
    }

    getQuestions()
  }, [])

  const selectOption = (e) => {
    const id = e.target.id
    const qid = parseInt(id[1])
    const oid = parseInt(id[3])
    const prevQuestions = questions
    console.log("prev: ", prevQuestions[qid])
    prevQuestions[qid].selection = oid
    console.log("new: ", prevQuestions[qid])
    setQuestions(prevQuestions)
  }

  const checkAnswers = () => {
    questions.forEach(question => {
      if (question.options[question.selection] === question.correct_answer) {
        console.log("Correct")
      } else {
        console.log("Incorrect");
      }
    })
  }

  const handleClickBack = () => {
    setQuestions([])
    props.back()
  }

  return (
    <div className='questions-container'>
      {loading ?
        <div className='loading'>Loading . . .</div>

        :

        <>
          <h1>Quiz</h1>
          {questions.map((question, i) => {
            const options = [...question.incorrect_answers, question.correct_answer]
            return (
              <Question
                key={`Q${i}`}
                id={`Q${i}`}
                category={question.category}
                question={question.question}
                options={options}
                correct={question.correct_answer}
                handleClick={(e) => selectOption(e)}
                selection={question.selection}
              />
            )
          })}

          <div className='buttons'>
            <button
              className='button'
              onClick={handleClickBack}
            >
              Back
            </button>
            <button
              className='button right'
              onClick={checkAnswers}
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