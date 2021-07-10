import React, {useState, useEffect} from 'react';
import agent from "../API/agent";
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import {Activity} from '../models/activity';
import Navbar from './Navbar';
import './Style.css';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import LoadingComponent from './LoadingComponent';


function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submiting, setSubmiting] = useState(false);
  const [target, setTarget] = useState('');

  useEffect( () => {
    agent.Activities.list().then(res =>{ 
      let activities: Activity[] = [];
      res.forEach((el: Activity) => {
        el.date = el.date.split('T')[0];
        activities.push(el);
      });
      setActivities(activities);
      setLoading(false);
    }).catch ( e => {
      console.log(e);
    })
  }, []);

  function handleSelectActivity(id: string){
    setSelectedActivity(activities.find(x => x.id === id));
  }

  function handleCancelSelectActivity(){
    setSelectedActivity(undefined);
  }

  function editSelectedActivity(id?: string){
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClose(){
    setEditMode(false);
  }

  function handleActivityDelete(id: string){
    setSubmiting(true);
    setTarget(id);
    agent.Activities.delete(id).then( res =>{
        setActivities([...activities.filter(x => x.id !== id)]);
        setSubmiting(false);
    }).catch( e => {
      setSubmiting(false);
    });
  }

  function handleCreateEditActivity(activity: Activity){
    setSubmiting(true);
    if(activity.id){
      agent.Activities.update(activity).then( () =>{
          activity.id ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
          : setActivities([...activities, activity]);
          setEditMode(false);
          setSelectedActivity(activity);
          setSubmiting(true);
      }).catch(er => {
        setSubmiting(false);
      })
    }
    else {
      const active = activity;
      active.id = uuid();
      agent.Activities.update(active).then( () =>{
        activity.id ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
        : setActivities([...activities, active]);
        setEditMode(false);
        setSelectedActivity(active);
        setSubmiting(true);
    }).catch(er => {
      setSubmiting(false);
    })
    }
  }

  if(loading) return <LoadingComponent content='Loading App'></LoadingComponent>

  return (
    <React.Fragment>
      <Navbar 
        editSelectedActivity={editSelectedActivity}
      />
      <Container style={{marginTop:'7em'}} >
        <ActivityDashboard
          editMode = {editMode}
          selectedActivity={selectedActivity} 
          handleSelectActivity = {handleSelectActivity}
          handleCancelSelectActivity = {handleCancelSelectActivity}
          activities={activities}
          editSelectedActivity={editSelectedActivity}
          handleFormClose={handleFormClose}
          createOrEdit={handleCreateEditActivity}
          handleActivityDelete={handleActivityDelete}
          submiting={submiting}
          target={target}
          />
      </Container>
    </React.Fragment>
  );
}

export default App;
