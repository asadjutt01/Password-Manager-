import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';


const Manager = () => {
    const ref = useRef()
    const passwordref = useRef()
    const [form, setform] = useState({
        site: "", username: "", password: ""
    })
    const [passwordArray, setpasswordArray] = useState([])


    const getpassword = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        console.log(passwords)
        setpasswordArray(passwords)
        
    }

    useEffect(() => {
        getpassword()

    }, [])


    const showpassword = () => {
        // alert("Show the password")

        if (ref.current.src.includes("icons/eyecross.svg")) {
            ref.current.src = "icons/eye.svg"
            passwordref.current.type = "text"

        }
        else {
            ref.current.src = "icons/eyecross.svg"
            passwordref.current.type = "password"
        }
        // ref.current.src = "icons/eyecross.svg"
    }

    const savepassword = async() => {
        // console.log(form)
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {


            

            //  await fetch("http://localhost:3000/",{method:"DELETE", headers:{"Content-Type":"application/json"},body:JSON.stringify({id:form.id})})
            // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))

            setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            await fetch("http://localhost:3000/",{method:"POST", headers:{"Content-Type":"application/json"},body:JSON.stringify({...form, id: uuidv4() })})
            

            console.log([...passwordArray, form])
            setform({ site: "", username: "", password: "" })
            toast('Password Saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }


    }
    const editpassword = async(id) => {
        console.log("Editing password with id", id)
        setform(passwordArray.filter(i => i.id === id)[0])
        // setform({...passwordArray.filter(i => i.id === id)[0], id:id})
        setpasswordArray(passwordArray.filter(item => item.id !== id))
        let res = await fetch("http://localhost:3000/",{method:"DELETE", headers:{"Content-Type":"application/json"},body:JSON.stringify({id })})
        toast('Password Edited!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });

    }
    const deletepassword = async(id) => {
        console.log("Deleting password with id", id)
        let c = confirm("Do You Really Want to Delete Your Password ")
        if (c) {
            setpasswordArray(passwordArray.filter(item => item.id !== id))

            // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => { item.id !== id })))
            let res = await fetch("http://localhost:3000/",{method:"DELETE", headers:{"Content-Type":"application/json"},body:JSON.stringify({id })})
            // console.log([...passwordArray, form])
            toast('Password Deleted Successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const copytext = (text) => {
        toast('Copied to Clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition="Bounce"

            />
            {/* Same as */}
            <ToastContainer />

            <div class="absolute inset-0 -z-10 h-full w-full "><div class="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#5931c7,transparent)]"></div></div>

            <div className='md:mycontainer  sm:px-20   bg-[#766c92]  my-2 rounded-3xl min-h-[85vh]'>
                <div className="logo font-bold text-[#ffffff]   flex justify-center items-center flex-col">
                    <div className='text-4xl'>
                        <span className='text-[#5931c7]'>&lt;</span>
                        <span>Pass</span>
                        <span className='text-[#5931c7]'>OP/&gt;</span>
                    </div>
                    <span className='text-[#5931c7] text-xl'>
                        Your Own Password Manager
                    </span>


                </div>
                <div className='text-black flex flex-col items-center px-16 py-2 md:gap-8 gap-1'>
                    <input value={form.site} onChange={handlechange} placeholder='Enter Website URL' className='py-1 p-4 border-2 border-[#5931c7] rounded-full w-full' type="text" name="site" id='site' />
                    <div className='flex w-full flex-col md:flex-row justify-between gap-1 md:gap-8'>
                        <input value={form.username} onChange={handlechange} placeholder='Enter Username' className='py-1 p-4 border-2 border-[#5931c7] rounded-full w-full' type="text" name="username" id='username' />
                        <div className="relative">
                            <input ref={passwordref} value={form.password} onChange={handlechange} placeholder='Enter Password' className='py-1 p-4 border-2 border-[#5931c7] rounded-full w-full' type="password" name="password" id='password' />
                            <span className='absolute right-[3px] top-[5px] cursor-pointer' onClick={showpassword}>
                                <img ref={ref} className='p-1' width={27} src="icons/eye.svg" alt="eye" />
                            </span>
                        </div>

                    </div>

                    <button onClick={savepassword} className='flex text-white justify-center items-center border-2 rounded-full px-5 md:px-8 py-1 md:py-2 w-fit bg-[#5931c7] hover:bg-[#8467d4] border-[#5931c7]'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                            colors="primary:#ffffff"
                        >
                        </lord-icon>
                        Save
                    </button>

                </div>
                <div className="passwords">
                    <h2 className='py-2 px-2 text-white font-bold text-2xl'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div className='p-4 underline text-white flex justify-center font-bold text-2xl'>No Passwords to Show</div>}

                    {passwordArray.length !== 0 && <div className='px-2 max-h-[40vh] overflow-y-auto'><table className="table-auto w-full  rounded-md overflow-hidden mb-2">
                        <thead className=' bg-[#5931c7] rounded-lg text-white'>
                            <tr>
                                <th className='text-center px-2 py-2'>Site</th>
                                <th className='text-center px-2 py-2'>Username</th>
                                <th className='text-center px-2 py-2'>Passwords</th>
                                <th className='text-center px-2 py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-[#a694d8] text-white'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='text-center  px-1 py-2'>
                                        <div className='flex justify-center items-center'>
                                            <a href={item.site} target='_blank'>{item.site}</a>
                                            <img className='invert copybutton  cursor-pointer' onClick={() => { copytext(item.site) }} width={20} src="icons/copy.svg" alt="copysvg" />
                                        </div>

                                    </td>
                                    <td className='text-center px-1 py-2'>
                                        <div className='flex justify-center items-center'>
                                            <span>{item.username}</span>
                                            <img className='invert copybutton hover:border-[#5931c7] cursor-pointer' onClick={() => { copytext(item.username) }} width={20} src="icons/copy.svg" alt="copysvg" />
                                        </div>

                                    </td>
                                    <td className='text-center px-1 py-2'>
                                        <div className='flex justify-center items-center'>
                                            <span>{"*".repeat(item.password.length)}</span>
                                            <img className='invert copybutton hover:stroke-[#5931c7] cursor-pointer' onClick={() => { copytext(item.password) }} width={20} src="icons/copy.svg" alt="copysvg" />
                                        </div>

                                    </td>
                                    <td className=' px-1 py-2'>
                                        <div className='flex justify-center  items-center gap-1'>

                                            <button onClick={() => { editpassword(item.id) }} className='flex justify-center  items-center text-white border-2 bg-[#5931c7] hover:bg-[#8467d4] border-[#5931c7] px-2 py-1  rounded-full'>
                                                <span>
                                                    <img width={20} className='invert' src="icons/edit.svg" alt="Editsvg" />
                                                </span>

                                            </button>

                                            <button onClick={() => { deletepassword(item.id) }} className='flex justify-center items-center text-white border-2 bg-[#5931c7] hover:bg-[#8467d4] border-[#5931c7] px-1 py-1  rounded-full'>
                                                <span>
                                                    <img width={15} className='invert' src="icons/delete.svg" alt="Deletesvg" />
                                                </span>


                                            </button>


                                        </div>

                                    </td>
                                </tr>

                            })}


                        </tbody>
                    </table></div>}

                </div>
            </div>
        </>
    )
}

export default Manager
