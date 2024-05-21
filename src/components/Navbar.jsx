import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-[#382f52]'>
      <div className='mycontainer  flex px-4 h-16 justify-around items-center '>


        <div className="logo font-bold text-[#ffffff]  text-2xl flex justify-center items-center">
          <span className='text-[#5931c7]'>&lt;</span>
          <span>Pass</span>
          <span className='text-[#5931c7]'>OP/&gt;</span>

        </div>
        {/* <ul className='flex justify-center items-center gap-6 text-[#ffffff] '>
          <li><a className='hover:font-bold' href="/">Home</a></li>
          <li><a className='hover:font-bold' href="#">About</a></li>
          <li><a className='hover:font-bold' href="#">Contact</a></li>
        </ul> */}
        <button className="github flex justify-center items-center gap-1 bg-[#f1e1ff] cursor-pointer rounded-full">
          <img className='p-1' src="icons/github.svg" alt="GitHub" />
          <span className='font-semibold px-1'>GitHub</span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
