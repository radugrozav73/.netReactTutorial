import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [activities, setActivities] = useState([]);

  useEffect( () => {
    axios.get('http://localhost:5000/api/activities').then(res =>{ 
      setActivities(res.data);
    }).catch ( e => {
      console.log(e);
    })
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <ul>
          {activities.map( (el:any) => (
            <li key={el.id}>{el.title}</li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
