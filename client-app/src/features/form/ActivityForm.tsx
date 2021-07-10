import React, { useState, ChangeEvent } from 'react'
import { Segment, Form, Button } from 'semantic-ui-react';
import { Activity } from '../../app/models/activity';

interface Props {
    selectedActivity: Activity | undefined;
    closeForm: () => void;
    createOrEdit:(activity:Activity) => void;
    submiting:boolean;
}

export default function ActivityForm(props: Props){

    const initialState = props.selectedActivity ?? {
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
        props.createOrEdit(activity);
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
                <Button loading={props.submiting}  floated='right' positive type='submit' content='Submit' />
                <Button onClick={() => props.closeForm()} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
}