import React, { useEffect, useState } from 'react'
import Question from '../Question/Question'
import "./Quiz.css"

const Quiz = (props) => {
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState([])
  const [check, setCheck] = useState(false)

  useEffect(() => {
    const getQuestions = async () => {
      setLoading(true)
      await fetch("https://opentdb.com/api.php?amount=10")
        .then((res) => res.json())
        .then((data) => {
          let q = []
          data.results.forEach((item, i) => {
            q.push({
              id: i,
              ...item,
              options: randomSort([...item.incorrect_answers, item.correct_answer]),
              selection: undefined,
            })
          })
          setQuestions(q)
        })
        .finally(() => { setLoading(false) })
    }

    getQuestions()
  }, [])


  const selectOption = (e) => {
    const id = e.target.id //Full id of an option: QXOJ. Where X = id question and J = id option
    const qid = parseInt(id[1]) //Only question id
    const oid = parseInt(id[3]) //Only option id
    const prevQuestions = []
    //Copy all the questions to have different
    // refference so the state actually changes
    questions.forEach(q => prevQuestions.push(q))

    //If the selection of a certain question ID
    prevQuestions[qid].selection =
      prevQuestions[qid].selection === oid ?
        undefined :
        oid

    setQuestions(prevQuestions)
  }

  function randomSort(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const random = Math.ceil(Math.random() * i)
      const k = arr[i]
      arr[i] = arr[random]
      arr[random] = k
    }
    return arr
  }

  const questionsElements = questions.map((question, i) => {
    return (
      <Question
        key={`Q${i}`}
        id={`Q${i}`}
        category={question.category}
        question={question.question}
        options={question.options}
        correct={question.correct_answer}
        handleClick={(e) => selectOption(e)}
        selection={question.selection}
        isCorrect={question.isCorrect}
        isChecked={check}
      />
    )
  })

  const checkAnswers = () => {
    setQuestions(prevQuestions => prevQuestions.map(question => {
      return {
        ...question,
        isCorrect: question.options[question.selection] === question.correct_answer
      }
    }))
    setCheck(true)
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
          {questionsElements}

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