import React from "react";
import {FaEdit,FaTrash} from 'react-icons/fa'



const Grocery = ({grocery,removeGrocery,editGrocery}) => {
    return( 
    <div className="list flex flex-col gap-2 p-2">
        {grocery.map((item)=>{
                // console.log(item);
                const {id,title} = item;
                return <div className="item flex justify-between gap-[200px]  hover:bg-slate-200 rounded-md transition-all duration-500" key={id}>
                <h4 className='ml-2 text-lg text-black font-thin'>{title}</h4>
                <div className="btn mr-2 my-2">
                <button className="btn text-green-400  mr-2 rounded-md" onClick={()=>editGrocery(id)} ><FaEdit/></button>
                <button className="btn text-red-400 rounded-md" onClick={()=>removeGrocery(id)}><FaTrash/></button>
                </div>
            </div>
            })}
        </div>
        )
    }
    

export default Grocery;