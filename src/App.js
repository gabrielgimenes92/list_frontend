import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import loading from './assets/loading.gif';
import logo from './assets/logo.png';

function App() {
  const [taskList, setTaskList] = useState();
  const [newTask, setNewTask] = useState();
  const baseURI = 'https://list-backend-b0w2.onrender.com';

  const updateTaskList = () => {
    axios.get(`${baseURI}/api/tasks`).then(function (response) {
      let newList = response.data;
      setTaskList(newList);
    });
  };

  const createTask = (event) => {
    event.preventDefault();
    axios
      .post(`${baseURI}/api/tasks`, {
        description: newTask,
      })
      .then(function (response) {
        updateTaskList();
      });
  };

  const deleteTask = (id) => {
    axios.delete(`${baseURI}/api/tasks/${id}`).then(function (response) {
      updateTaskList();
    });
  };

  const handleToggleTaskCompleted = (id, event) => {
    console.log(event.target.checked);

    if (event.target.checked === true) {
      axios.put(`${baseURI}/api/tasks/complete/${id}`);
    } else if (event.target.checked === false) {
      axios.put(`${baseURI}/api/tasks/uncomplete/${id}`);
    }
    updateTaskList();
  };

  useEffect(() => {
    updateTaskList();
  }, []);

  const handleChange = (event) => {
    setNewTask(event.target.value);
  };

  return (
    <div className="appWrapper">
      <div id="background" />
      <div className="app">
        <div className="logoAndTitle">
          <img src={logo} />
          <h1>Task List</h1>
        </div>
        <div className="addTaskFormWrapper">
          <h2>What is next?</h2>
          <form onSubmit={createTask} className="addTaskForm">
            <input onChange={handleChange} placeholder="Buy more cat food" />
            <button type="submit">Add task</button>
          </form>
        </div>
        <ul>
          {!taskList ? (
            <img src={loading} alt="loading..."></img>
          ) : (
            taskList.map((entry) => (
              <li id={entry._id}>
                <div className="holder" />
                <input
                  className="checkbox"
                  type="checkbox"
                  onChange={(e) => handleToggleTaskCompleted(entry._id, e)}
                  defaultChecked={entry.checked}
                />
                <div className="description">{entry.description}</div>
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
    </div>
  );
}

export default App;
