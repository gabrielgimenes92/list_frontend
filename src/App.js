import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import loading from './assets/loading.gif';
import logo from './assets/logo.png';
import Trash from './assets/Trash.js';
import Edit from './assets/Edit.js';

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
      })
      .then(setNewTask(''));
  };

  const deleteTask = (id) => {
    axios.delete(`${baseURI}/api/tasks/${id}`).then(function (response) {
      updateTaskList();
    });
  };

  const editTask = (id) => {
    return;
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
            <input
              onChange={handleChange}
              placeholder="Buy more cat food"
              value={newTask}
            />
            <button type="submit">Add task</button>
          </form>
        </div>
        <ul>
          <h2>Tasks</h2>
          {!taskList ? (
            <img
              src={loading}
              alt="loading..."
              style={{ margin: '1rem auto', maxWidth: '100%', height: '5rem' }}
            ></img>
          ) : (
            taskList.map((entry) => (
              <li id={entry._id}>
                <div className="holder">
                  <spam className="circle" />
                  <spam className="circle" />
                  <spam className="circle" />
                  <spam className="circle" />
                  <spam className="circle" />
                  <spam className="circle" />
                </div>
                <label className="checkboxDescriptionWrapper">
                  <input
                    className="checkbox"
                    type="checkbox"
                    onChange={(e) => handleToggleTaskCompleted(entry._id, e)}
                    defaultChecked={entry.checked}
                  />
                  <span className="description">{entry.description}</span>
                </label>
                <div className="buttons">
                  <div
                    className="defaultButton editButton"
                    onClick={() => {
                      editTask(entry._id);
                    }}
                  >
                    <Edit className="icon" />
                    <p>Edit</p>
                  </div>
                  <div
                    className="defaultButton deleteButton"
                    onClick={() => {
                      deleteTask(entry._id);
                    }}
                  >
                    <Trash />
                    <p>Delete</p>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
