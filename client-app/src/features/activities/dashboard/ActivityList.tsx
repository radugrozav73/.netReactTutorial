import React from 'react';
import { Item, Segment, Button, Label } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props {
    activities: Activity[];
    handleSelectActivity: (id: string) => void;
    handleActivityDelete: (id: string) => void;
    submiting:boolean;
    target:string;
}

export default function ActivityList(props:Props){
    return (
        <Segment>
            <Item.Group divided>
                {props.activities.map( item => (
                    <Item key={item.id}>
                        <Item.Content>
                            <Item.Header as='a'>{item.title}</Item.Header>
                            <Item.Meta>{item.date}</Item.Meta>
                            <Item.Description>
                                <div>{item.description}</div>
                                <div>{item.city}, {item.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                            <Button onClick={() => props.handleSelectActivity(item.id)} floated="right" content="View" color="blue"/>
                            <Button loading={item.id === props.target ? true : false} onClick={() => props.handleActivityDelete(item.id)} floated="right" content="Delete" color="red"/>
                                <Label basic content={item.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}