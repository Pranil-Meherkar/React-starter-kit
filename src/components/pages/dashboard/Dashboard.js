import React from 'react'
import FeedPageMain from '../mainfeedpage/FeedPageMain'
import './Dashboard.css'
// import FeedPage from '../feedpage/FeedPage'


const Dashboard = () => {
  let name = 'Aditya'
  return (
    <div className='dash-div'>
      <h3 className='dash-name'>Hello {name}!</h3>
    <FeedPageMain/>
    </div>
  )
}

export default Dashboard