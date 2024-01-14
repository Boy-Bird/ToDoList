import TaskList from './TaskList';

const Content = ({ tasks, handleCheck, handleDelete }) => {
  return (
    <main>
      { tasks.length ? (
        <TaskList 
          tasks={tasks}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
      ) : (
        <p style={{marginTop:'2rem'}}>Your list is empty.</p>
      )}
    </main>
  )
}

export default Content