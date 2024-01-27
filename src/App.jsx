import Header from './Header';
import SearchTask from './SearchTask';
import AddTask from './AddTask';
import Content from './Content'
import Footer from './Footer'
import { useState, useEffect } from 'react';
import apiRequest from './apiRequest';

function App() {
  const API_URL = 'http://localhost:3500/tasks';

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [search, setSearch] = useState('');
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(API_URL);
        if(!response.ok) throw Error('Did not receive expected data');
        const listTasks = await response.json();
        setTasks(listTasks);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      }
    }

    fetchTasks();
  }, [])
  
  const addTask = async (task) => {
    const id = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
    const myNewTask = { id, checked: false, task };
    const listTasks = [...tasks, myNewTask];
    setTasks(listTasks);

    const postOptions = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(myNewTask)
    }
    const result = await apiRequest(API_URL, postOptions);
    if(result) setFetchError(result);
  }

  const handleCheck = async (id) => {
    const listTasks = tasks.map((task) => task.id === id ? { ...task, checked: !task.checked } : task);
    setTasks(listTasks);

    const myTask = listTasks.filter((task) => task.id === id);
    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ checked: myTask[0].checked})
    };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOptions);
    if(result) setFetchError(result);
  }

  const handleDelete = async (id) => {
    const listTasks = tasks.filter((task) => task.id !== id);
    setTasks(listTasks);

    const deleteOptions = { method: 'DELETE' };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, deleteOptions);
    if(result) setFetchError(result);
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
      <main>
        {fetchError && <p style={{color: "red"}}>{`Error: ${fetchError}`}</p>}
        {!fetchError && <Content 
          tasks={tasks.filter(task => ((task.task).toLowerCase()).includes(search.toLowerCase()))}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />}
      </main>
      <Footer length={tasks.length} />
    </div>   
  );
}

export default App
