import { useEffect, useState } from 'react'
import  Grocery  from './Grocery'
import Modal from './modal'

const getItems = ()=>{
  let list = localStorage.getItem('groceryList')
  if(list){
    return(list = JSON.parse(localStorage.getItem('groceryList')))
  }else{
    return []
  }

}
function App() {
  const [grocery,setGrocery] = useState('');
  const [groceryList,setGroceryList] = useState(getItems());
  const [isEditing,setIsEditing] = useState(false);
  const [editId,setEditId] = useState(null);
  const [modal,setModal] = useState({show:false,msg:'',type:''});

  const handleSubmit = (e)=>{
    e.preventDefault()
    if(!grocery){
      setModal({show:true,msg:'Please enter a value',type:'danger'})
  } else if(grocery && isEditing){
    setGroceryList(groceryList.map((item)=>{
      if(item.id === editId){
        return {...item,title:grocery}
      }
      return item;
    }))
    setGrocery('');
    setEditId(null);
    setIsEditing(false);
    showModal(true,'Item edited successfully','success')
  }else{
    showModal(true,'Item added successfully','success')
    const newItem = {id:new Date().getTime().toString(),title:grocery}
    setGroceryList([...groceryList,newItem])
    setGrocery('');
  
  }
}

  const clearBud = ()=>{
    showModal(true,'All items cleared','danger')
    setGroceryList([]);
  }

  const removeGrocery = (id)=>{ 
    showModal(true,'Item removed successfully','danger')
    setGroceryList(groceryList.filter((item)=>item.id !== id))
  }

  const editGrocery = (id)=>{
    const editingItem = groceryList.find((item)=>item.id === id)
    setIsEditing(true)
    setEditId(id);
    setGrocery(editingItem.title)
  }

  useEffect(()=>{
    localStorage.setItem('groceryList',JSON.stringify(groceryList))
    // console.log(groceryList);
  },[groceryList])

  const showModal = (show=false,msg='',type='')=>{
  setModal({show,msg,type})
  }

  return (
    <>
    <main className="bg-gray-200 h-screen flex justify-center items-center ">
        <div className="bud shadow-lg shadow-black bg-white 0 p-4">
      {modal.show && <Modal {...modal} removeModal={showModal} groceryList={groceryList}/> }
      <h2 className='text-3xl font-sans font-bold text-center'>Grocery Bud</h2>
      <form onSubmit={handleSubmit} className="input-control my-12">
        <input value={grocery} onChange={(e)=>setGrocery(e.target.value)} type="text" className="input w-[400px] bg-slate-100 rounded-md p-2" placeholder="e.g. eggs"/>
        <button type='submit' className="btn bg-blue-400 p-2 ml-1 rounded-md">{
          isEditing?'Edit':'Submit'}</button>
      </form>
      {groceryList.length>0 && (
        <div className="clea flex flex-col justify-center items-center text-red-500 font-mono rounded-md">
          <Grocery grocery={groceryList} removeGrocery={removeGrocery} editGrocery={editGrocery}/>
      <button className='bg-red-200 hover:bg-red-400 hover:text-white duration-500  p-1 rounded-md' onClick={clearBud}>Clear Items</button></div>
      )}
        </div>
      </main>
    </>
  )
}

export default App
