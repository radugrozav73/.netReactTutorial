import React from 'react';
import {Button, Menu, Container } from 'semantic-ui-react';

interface Props{
    editSelectedActivity:() => void;
}

export default function NavBar(props: Props) {
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight:'20px'}}/>
                    Reactivities
                </Menu.Item>
                <Menu.Item name='Activities'/>
                <Menu.Item>
                    <Button onClick={() => props.editSelectedActivity()} positive content="Create Activity"/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}