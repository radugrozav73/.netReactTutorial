import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import ActivityForm from '../../form/ActivityForm';
import ActivityDetails from '../details/ActivityDetails';
import ActivityList from './ActivityList';

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    handleSelectActivity: (id: string) => void;
    handleCancelSelectActivity: () => void;
    editMode:boolean;
    handleFormClose:()=>void;
    editSelectedActivity:(id?: string) => void;
    createOrEdit:(activity: Activity) => void;
    handleActivityDelete:(id:string) => void;
    submiting:boolean;
    target:string;
}

export default function ActivityDashboard(props: Props){
    return (
        <Grid >
            <Grid.Column width='10'>
                <ActivityList 
                target={props.target}
                submiting={props.submiting}
                handleActivityDelete={props.handleActivityDelete}
                handleSelectActivity={props.handleSelectActivity} 
                activities={props.activities}/>
            </Grid.Column>
            <Grid.Column width='6'>
                {props.selectedActivity && <ActivityDetails
                    handleCancelSelectActivity={props.handleCancelSelectActivity}
                    editSelectedActivity={props.editSelectedActivity}
                    activity={props.selectedActivity}/>}
                {props.editMode && <ActivityForm
                    selectedActivity={props.selectedActivity}
                    closeForm={props.handleFormClose}
                    createOrEdit={props.createOrEdit}
                    submiting = {props.submiting}
                />}
            </Grid.Column>
        </Grid>
    )
}