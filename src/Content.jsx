import { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
const Content = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      checked: true,
      task: "Study 7 hours"
    },
    {
      id: 2,
      checked: false,
      task: "Practice DSA"
    },
    {
      id: 3,
      checked: false,
      task: "Practice Guitar"
    }
  ]);

  const handleCheck = (id) => {
    const listTasks = tasks.map((task) => task.id === id ? { ...task, checked: !task.checked } : task);
    setTasks(listTasks);
    localStorage.setItem('tasklist', JSON.stringify(listTasks));
  }

  return (
    <main>
      <ul>
        {tasks.map((task) => (
          <li className='task' key={task.id}>
            <input
              type='checkbox'
              onChange={() => handleCheck(task.id)}
              checked={task.checked}
            /> 
            <label
              style={(task.checked) ? {textDecoration: 'line-through'} : null}
              onDoubleClick={() => handleCheck(task.id)}
            >{task.task}</label>
            <FaTrashAlt 
              role='button' 
              tabIndex='0' 
            />
          </li>
        ))}
      </ul>
    </main>
  )
}

export default Content