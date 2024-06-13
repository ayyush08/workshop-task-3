import React,{useEffect} from 'react'

const Modal = ({type,msg,removeModal,groceryList}) => {
    useEffect(()=>{
        const timeout = setTimeout(()=>{
            removeModal()
        },3000)
        return ()=>clearTimeout(timeout)
    
    },[groceryList])
    return <div className="flex justify-center items-center">
        <div className={`${type=='success' ? 'bg-green-200' : 'bg-red-200'} text-center w-[30vw] rounded-full font-mono font-extralight`}>{msg}</div>
        </div>
}

export default Modal
