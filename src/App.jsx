import { useState } from 'react'
import LandingPage from './components/LandingPage'
import './App.css'
import Quiz from './components/Quiz'

function App() {
  const [quizStart, setQuizStart] = useState(false)

  const startAQuiz = () => {
    setQuizStart(prevQuizStat => !prevQuizStat)
  }

  const back = () => {
    setQuizStart(false)
  }

  return (
    <div className="App">
      {quizStart ?
        <Quiz /> :
        <LandingPage 
        handleClick={startAQuiz} 
        back={back}
        />}
    </div>
  )
}

export default App
