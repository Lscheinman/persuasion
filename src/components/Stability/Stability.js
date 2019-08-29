import React from 'react';
import Button from "@material-ui/core/Button";
import Chart from '../Drawer/ComposedChart'
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexGrow: 1,
        opacity: 1
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 340,
    }
}));

export default function Stability (props) {
    const data = props.stabilityView;
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    console.log(data);
    return(
        <div width="800px">
            <Paper className={fixedHeightPaper}>
                <Chart
                    title="Player Stability (MPICE)"
                    data={data}
                />
            </Paper>
        </div>
    );

}