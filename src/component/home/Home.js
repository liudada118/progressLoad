import React from 'react'
import { Link } from 'react-router-dom'
import './home.css'
export default function Home() {
  return (
    <div className="App">
      <Link className='leftA' to='/Compact'><div className="contentItem Compact font">Compact</div></Link>
      <Link to='/Billboard'><div className="contentItem Billboard font">Billboard</div></Link>
    </div>
  )
}
