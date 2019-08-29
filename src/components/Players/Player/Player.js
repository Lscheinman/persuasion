import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/RemoveRedEye';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
    },
}));

export default function Player(props) {
    const classes = useStyles();

    return (
        <div>
            <Paper className={classes.root}>
                <Typography variant="h5" component="h3">
                    {props.name}
                </Typography>
                <Typography component="p">
                    Group: {props.group}<br/>
                    Icon: {props.icon}<br/>
                    Score: {props.score}
                </Typography>
                <Fab onClick={props.click} value={props.name}>
                    <AddIcon />
                </Fab>
            </Paper>
        </div>
    );
}