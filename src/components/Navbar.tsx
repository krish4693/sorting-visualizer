import React from 'react'


const Navbar = ({generateNewArray}) => {
  return (
    <div className='flex items- justify-around'>
      <button onClick={generateNewArray}>
      <p >Generate New Array</p>

      </button>
        <p>Change Array Size</p>
        <p>Merge Sort</p>
        <p>Sort</p>
    </div>
  )
}

export default Navbar