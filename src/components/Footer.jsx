import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-[#382f52] fixed bottom-0 w-full p-2'>
      <div className='mycontainer  flex flex-col py-2 px-4 h-20 justify-around items-center '>


        <div className="logo font-bold text-[#ffffff]  text-3xl flex justify-center items-center">
          <span className='text-[#5931c7]'>&lt;</span>
          <span>Pass</span>
          <span className='text-[#5931c7]'>OP/&gt;</span>

        </div>
       
        <div className='flex text-white items-center justify-center md:text-2xl text-sm my-1'>
            <span>Created With Love</span> <img className='px-2' width={45} src="icons/redheart.svg" alt="Redheart" /> <span>by asadthecoder</span>
        </div>
      </div>
    
    </footer>
  )
}

export default Footer
