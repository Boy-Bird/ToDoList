import TaskList from './TaskList';

const Content = ({ tasks, handleCheck, handleDelete }) => {
  return (
    <>
      { tasks.length ? (
        <TaskList 
          tasks={tasks}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
      ) : (
        <p style={{marginTop:'2rem'}}>Your list is empty.</p>
      )}
    </>
  )
}

export default Content