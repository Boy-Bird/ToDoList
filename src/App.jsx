import Header from './Header';
import AddTask from './AddTask';
import Content from './Content'
import Footer from './Footer'
import { useState } from 'react';

function App() {
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
  const [newTask, setNewTask] = useState('');

  const setAndSaveTasks = (newTasks) => {
    setTasks(newTasks);
    localStorage.setItem('tasklist', JSON.stringify(newTasks));
  }

  const addTask = (task) => {
    const id = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
    const myNewTask = { id, checked: false, task };
    const listTasks = [...tasks, myNewTask];
    setAndSaveTasks(listTasks);
  }

  const handleCheck = (id) => {
    const listTasks = tasks.map((task) => task.id === id ? { ...task, checked: !task.checked } : task);
    setAndSaveTasks(listTasks);
  }

  const handleDelete = (id) => {
    const listTasks = tasks.filter((task) => task.id !== id);
    setAndSaveTasks(listTasks);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!newTask) return;
    addTask(newTask);
    setNewTask('');
  }

  return (
    <div className="App">
      <Header title="Task List"/>
      <AddTask 
        newTask={newTask}
        setNewTask={setNewTask}
        handleSubmit={handleSubmit}
      />
      <Content 
        tasks={tasks}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <Footer length={tasks.length} />
    </div>   
  );
}

export default App
