import { useEffect, useState } from "react";
import axios from 'axios';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

const App = () => {

  const [itemText, setItemText] = useState('');
  const [todoList, setTodoList] = useState([]);
//   const [updateItemText, setUpdateItemText] = useState('');
// const [isUpdating, setIsUpdating] = useState('');



  const addItem = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.post('http://localhost:3000/api/item', {item: itemText})
      setTodoList(prev => [...prev, res.data]);
      setItemText('');
    }catch(err){
      console.log(err);
    }
  } 



  useEffect(()=>{
    const getItemsList = async () => {
      try{
        const res = await axios.get('http://localhost:3000/api/item')
        setTodoList(res.data);
        console.log('render')
      }catch(err){
        console.log(err);
      }
    }
    getItemsList()
  },[]);


  const deleteItem = async (id) => {
    try{
      const res = await axios.delete(`http://localhost:3000/api/item/${id}`)
      const newTodoList = todoList.filter(item=> item._id !== id);
      setTodoList(newTodoList);
    }catch(err){
      console.log(err);
    }
  }  


  // const updateItem = async (e) => {
  //   e.preventDefault()
  //   console.log('isUpdating:', isUpdating); // Debug line
  // console.log('updateItemText:', updateItemText); // Debug line
  //   try{
  //     const res = await axios.put(`http://localhost:3000/api/item/${isUpdating}`, {item: updateItemText})
  //     console.log(res.data)
  //     const updatedItemIndex = todoList.findIndex(item => item._id === isUpdating);
  //     const updatedItem = todoList[updatedItemIndex].item = updateItemText;
  //     setUpdateItemText('');
  //     setIsUpdating('');
  //   }catch(err){
  //     console.log(err);
  //   }
  // }
  



  // const renderUpdateForm = () => (
  //   <form className="update-form" onSubmit={(e) => updateItem(e)}>
  //     <input type="text" placeholder="Update Todo Task" onChange={e=>{setUpdateItemText(e.target.value)}} value={updateItemText} />
  //     <button className="btn" type="submit">Update Todo</button>
  //   </form>
  // )
  


  return (
    <div className="App">
      <h1 className="heading">Todo List</h1>
      <div>
      <form action="" onSubmit={e => addItem(e)}>
        <div className="set-todo">
        <input type="text" placeholder="Enter Your Task" value={itemText} onChange={e => setItemText(e.target.value)} />
        <button type="submit" className="btn btn-custome">Add Todo</button>
        </div>
        <div className="todo-list-box">
            {
              todoList.map(item => (
              <div className="todo-item" key={item._id}>
              {/* {
              isUpdating === item._id
              ? renderUpdateForm()
              : <> */}
              <p>{item.item}</p>
              <button className="btn-edit" onClick={()=>{setIsUpdating(item._id)}}><AiFillEdit className="icon-edit"/></button>
              <button className="btn-del" onClick={()=> deleteItem(item._id)}><AiFillDelete className="icon-del"/></button>
              {/* </>
              } */}
            </div>
            ))
            }
           
        </div>
      </form>
      </div>
    </div>
  )
}

export default App