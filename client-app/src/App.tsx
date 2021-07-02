import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

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
      <Header as='h2' icon='users' content='Reactivities' />
        <List>
          {activities.map( (el:any) => (
            <List.Item key={el.id}>{el.title}</List.Item>
          ))}
        </List>
    </div>
  );
}

export default App;
