import { observer } from 'mobx-react-lite';
import React, { useState, ChangeEvent } from 'react'
import { Segment, Form, Button } from 'semantic-ui-react';

import { useStore } from '../../app/stores/store';


export default observer(function ActivityForm(){
    const {activityStore} = useStore();
    const {selectedActivity, closeForm, createActivity, updateActivity, loading} = activityStore;
    const initialState = selectedActivity ?? {
        id:'',
        title:'',
        date:'',
        description:'',
        category:'',
        city:'',
        venue:''
    }

    const [activity, setActivity] = useState(initialState);
    
    function handleSubmit(){
        activity.id ? updateActivity(activity) : createActivity(activity);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {name, value} = event.target;
        setActivity({...activity, [name]: value});
    }
    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input name='title' onChange={handleInputChange} value={activity.title} placeholder="Title"/>
                <Form.TextArea name='description' onChange={handleInputChange} value={activity.description} placeholder="Description"/>
                <Form.Input name='category' onChange={handleInputChange} value={activity.category} placeholder="Category"/>
                <Form.Input name='date' onChange={handleInputChange} value={activity.date} type="date" placeholder="Date"/>
                <Form.Input name='city' onChange={handleInputChange} value={activity.city} placeholder="city" />
                <Form.Input name='venue' onChange={handleInputChange} value={activity.venue} placeholder="venue" />
                <Button loading={loading}  floated='right' positive type='submit' content='Submit' />
                <Button onClick={() => closeForm()} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
})