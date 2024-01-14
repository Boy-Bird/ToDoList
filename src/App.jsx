import Header from './Header';
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

  const handleCheck = (id) => {
    const listTasks = tasks.map((task) => task.id === id ? { ...task, checked: !task.checked } : task);
    setTasks(listTasks);
    localStorage.setItem('tasklist', JSON.stringify(listTasks));
  }

  const handleDelete = (id) => {
    const listTasks = tasks.filter((task) => task.id !== id);
    setTasks(listTasks);
    localStorage.setItem('tasklist', JSON.stringify(listTasks));
  }

  return (
    <div className="App">
      <Header title="Task List"/>
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
