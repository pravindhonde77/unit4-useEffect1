import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';


const Todos = () => {
    const [newTodo, setNewTodo] = useState("");
   
    const[todos,setTodos]=useState([]);

  const saveInfo=()=>{
    //CALL API TO SAVE THIS INFORMATION IN BACKEND
    fetch("http://localhost:8080/todos",{
      method:"POST",
      headers:{
        "content-type":"application/json"
      },
        body:JSON.stringify({
          text:newTodo,
          isCompleted:false,
        }),
    })
    .then((r)=>r.json())
   .then((d)=>{
    setTodos([...todos,d]);
    setNewTodo("");
   });
  };

useEffect(()=>
{
    fetch("http://localhost:8080/todos?_page=1&_limit=5")
    .then((r)=>r.json())
    .then((d)=>{
     setTodos(d);
  });
},[]);  
  return (
    <div>
        Todos 
        <div>
            <input value={newTodo}
            onChange={({target})=>setNewTodo(target.value)}
            />
            <button onClick={saveInfo}>+</button>
            
            {todos.map((todo)=>(
                <div key={todo.id}>{todo.text}</div>
            ))}
        </div>

    </div>
  )
}

export default Todos;