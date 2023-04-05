import React from 'react'
import FeedPage from '../feedpage/FeedPage'

const Dashboard = () => {
  return (
    <div><div
      className="dashboard-header"
      style={{ display: "flex", justifyContent: "space-between", padding: "10vh 5vw", borderRadius: "5px" }}
    >
      <h1 className="dashboard-heading" style={{ fontSize: "2rem" }}>Dashboard</h1>
      
    </div>
    <FeedPage/>
    </div>
  )
}

export default Dashboard