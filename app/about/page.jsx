import React from 'react'
import About from '../../components/About'
import Navbar from '../../components/Navbar'
import SmallFooter from '../../components/Footer'

export default function Page() {
  return (
    <div className='bg-slate-200'>
        <Navbar />
        <About />
        <SmallFooter />
    </div>
    
  )
}
