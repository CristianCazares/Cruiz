import React from 'react'
import "./LandingPage.css"
const LandingPage = (props) => {

  return (
    <div className='content'>
      <h1 className='title'>Cruiz</h1>
      <h4 className='description'>
        A quiz page, but made by Cris.
      </h4>
      <button
        className='start-button'
        onClick={props.handleClick}
        >
        Start a quiz
      </button>
    </div>
  )
}

export default LandingPage