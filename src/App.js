import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [taskList, setTaskList] = useState();

  const updateTaskList = () => {
    axios.get('http://localhost:3000/api/tasks')
      .then(function (response) {
        let newList = response.data
        setTaskList(newList)
      })
  }

  useEffect(() => {
  },[taskList])

  // updateTaskList();

  return (
    <div className="App">
      <div>
        <h1>To-do list</h1>
        <ul>
          {!taskList ? <></> : 
            taskList.map((entry) => 
              <li id={entry._id}>{entry.description}</li>
            )
          }
        </ul>
      </div>
      <button onClick={updateTaskList}>Update</button>
    </div>
  );
}

export default App;
