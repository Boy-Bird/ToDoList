import { FaPlus } from "react-icons/fa"

const AddTask = ({ newTask, setNewTask, handleSubmit }) => {
  return (
    <form className="addForm" onSubmit={handleSubmit}>
      <label htmlFor='addTask'>Add Task</label>
      <input 
        autoFocus
        id='addTask'
        type="text" 
        placeholder="Add Task"
        required
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button
        type='submit'
        aria-label='Add Task'
      >
        <FaPlus />
      </button>
    </form>

  )
}

export default AddTask