import React from 'react';
import { Item, Segment, Button, Label } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default function ActivityList(){
    const {activityStore} = useStore();
    const {loading, deleteActivity, activitiesByDate} = activityStore;
    return (
        <Segment>
            <Item.Group divided>
                {activitiesByDate.map( item => (
                    <Item key={item.id}>
                        <Item.Content>
                            <Item.Header as='a'>{item.title}</Item.Header>
                            <Item.Meta>{item.date}</Item.Meta>
                            <Item.Description>
                                <div>{item.description}</div>
                                <div>{item.city}, {item.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                            <Button onClick={() => activityStore.selectActivity(item.id)} floated="right" content="View" color="blue"/>
                            <Button loading={loading} onClick={() => deleteActivity(item.id)} floated="right" content="Delete" color="red"/>
                                <Label basic content={item.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}