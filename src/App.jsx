import Header from './Header';
import SearchTask from './SearchTask';
import AddTask from './AddTask';
import Content from './Content'
import Footer from './Footer'
import { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasklist')) || []);
  const [newTask, setNewTask] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    localStorage.setItem('tasklist', JSON.stringify(tasks));
    console.log('change')
  }, [tasks])
  
  const addTask = (task) => {
    const id = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
    const myNewTask = { id, checked: false, task };
    const listTasks = [...tasks, myNewTask];
    setTasks(listTasks);
  }

  const handleCheck = (id) => {
    const listTasks = tasks.map((task) => task.id === id ? { ...task, checked: !task.checked } : task);
    setTasks(listTasks);
  }

  const handleDelete = (id) => {
    const listTasks = tasks.filter((task) => task.id !== id);
    setTasks(listTasks);
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
      <SearchTask
        search={search}
        setSearch={setSearch}
      />
      <Content 
        tasks={tasks.filter(task => ((task.task).toLowerCase()).includes(search.toLowerCase()))}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <Footer length={tasks.length} />
    </div>   
  );
}

export default App
