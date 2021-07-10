import React from 'react';
import { Card, Button, Image } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props {
    activity: Activity;
    handleCancelSelectActivity: () => void;
    editSelectedActivity:(id?: string) => void;
}

export default  function ActivityDetails(props: Props){
    return (
        <Card>
            <Image src={`/assets/categoryImages/${props.activity.category}.jpg`} wrapped ui={false} />
            <Card.Content>
            <Card.Header>{props.activity.title}</Card.Header>
            <Card.Meta>
                <span>{props.activity.date}</span>
            </Card.Meta>
            <Card.Description>
                {props.activity.description}
            </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group width='2'>
                <Button onClick={() => props.editSelectedActivity(props.activity.id)} content='Edit' basic color='blue'/>
                <Button onClick={() => props.handleCancelSelectActivity()} content='cancel' basic color='grey'/>
                </Button.Group>
            </Card.Content>
        </Card>
    )
}