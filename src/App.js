import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

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

    if (event.target.checked == true) {
      axios.put(`${baseURI}/api/tasks/complete/${id}`);
    } else if (event.target.checked == false) {
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
                  onChange={(e) => handleToggleTaskCompleted(entry._id, e)}
                  defaultChecked={entry.checked}
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
