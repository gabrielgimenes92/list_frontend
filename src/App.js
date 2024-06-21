import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [taskList, setTaskList] = useState();
  const [newTask, setNewTask] = useState();

  const updateTaskList = () => {
    axios.get('http://localhost:3000/api/tasks').then(function (response) {
      let newList = response.data;
      setTaskList(newList);
    });
  };

  const createTask = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:3000/api/tasks', {
        description: newTask,
      })
      .then(function (response) {
        updateTaskList();
      });
  };

  const deleteTask = (id) => {
    axios
      .delete(`http://localhost:3000/api/tasks/${id}`)
      .then(function (response) {
        updateTaskList();
      });
  };

  const handleToggleTaskCompleted = (id) => {
    console.log(`Toggled - id:${id}`);
  };

  useEffect(() => {
    updateTaskList();
  }, []);

  const handleChange = (event) => {
    setNewTask(event.target.value);
  };

  return (
    <div className="App">
      <div>
        <h1>To-do list</h1>
        <ul>
          {!taskList ? (
            <></>
          ) : (
            taskList.map((entry) => (
              <li id={entry._id}>
                <div className="description">{entry.description}</div>
                <input
                  className="checkbox"
                  type="checkbox"
                  onClick={() => {
                    handleToggleTaskCompleted(entry._id);
                  }}
                />
                <button
                  onClick={() => {
                    deleteTask(entry._id);
                  }}
                >
                  Delete
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
      {/* <button onClick={updateTaskList}>Update</button> */}

      <form onSubmit={createTask}>
        <label>
          Task description
          <input onChange={handleChange} />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default App;
