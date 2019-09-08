import React from 'react';
import './Resource.css'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const resource = (props) => {
    return (
        <div>
            <Card className="card">
                <CardContent>
                    <h1>{props.name}</h1>
                    <p>Class: {props.ascope}</p>
                    <p>Domain: {props.crimefilled}</p>
                    <p>Type: {props.type}</p>
                    <p>Category: {props.category}</p>
                    <p>Score: {props.score}</p>
                    <p>Score: {props.offence}</p>
                    <p>Title: {props.title}</p>
                    <p>Location: {props.xpos} , {props.ypos} </p>
                    <p>Hitpoints: {props.hitpoints}</p>
                </CardContent>
                <CardActions>
                <p onClick={props.click}></p>
                    <Fab onClick={props.click} value={props.name}>
                        <AddIcon />
                    </Fab>
                <p>{props.children}</p>
                <input type="text" onChange={props.changed} value={props.name}/>
                </CardActions>
                </Card>
        </div>
    )
};

export default resource;