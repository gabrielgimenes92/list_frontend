import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [data, setData] = useState();
  const [test, setTest] = useState([
    {
      name: "name 1"
    },
    {
      name: "name 2"
    }
  ])

  const updateData = () => {
    axios.get('http://localhost:3000/api/products')
      .then(function (response) {
        let newData = response.data
        setData(newData)
      })
  }

  useEffect(() => {
    console.log(test);
  }, [data])

  return (
    <div className="App">
      <div>
        <h1>Hello</h1>
        <ul>
          {!data ? <></> : 
            data.map((entry) => 
              <div>
                <li>{entry.name}</li>
                <li>{entry.price}</li>
              </div>
            )
          }
        </ul>
      </div>
      <button onClick={updateData}>Update</button>
    </div>
  );
}

export default App;
