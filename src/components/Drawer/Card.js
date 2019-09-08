import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import {blueGrey} from '@material-ui/core/colors';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PlayIcon from '@material-ui/icons/PlayCircleFilledOutlined';
import Paper from "@material-ui/core/Paper";
import Chart from "./ComposedChart";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`wrapped-tabpanel-${index}`}
            aria-labelledby={`wrapped-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `wrapped-tab-${index}`,
        'aria-controls': `wrapped-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: '90%',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: blueGrey[500],
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

export default function GridCard(props) {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [expanded, setExpanded] = React.useState(false);
    const [experimentalState, setExperimentalState] = React.useState(null);
    const [value, setValue] = React.useState('one');

    function handleChange(event, newValue) {
        setValue(newValue);
    }

    function handleViewChange (event) {
        console.log(experimentalState);
        setExperimentalState({experimentalState: event})
    }

    function handleOpenClick(){
        console.log("fjfj");
    }

    function handleExpandClick() {
        setExpanded(!expanded);
    }
    let actionOne = (
        <IconButton aria-label="share" onClick={handleOpenClick}>
            <ShareIcon/>
        </IconButton>
    );
    let collapse = (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
                <Tabs value={value} onChange={handleChange} aria-label="wrapped label tabs example">
                    <Tab
                        value="one"
                        label="Stability"
                        wrapped
                        {...a11yProps('one')}
                    />
                    <Tab value="two" label="Map" {...a11yProps('two')} />
                    <Tab value="three" label="Links" {...a11yProps('three')} />
                    <Tab value="four" label="Detail" {...a11yProps('four')} />
                </Tabs>
                <TabPanel value={value} index="one">
                    Experimental stability
                    {analysisContent}
                </TabPanel>
                <TabPanel value={value} index="two">
                    TODO A Map of the selected items
                </TabPanel>
                <TabPanel value={value} index="three">
                    TODO Focused network diagram
                </TabPanel>
                <TabPanel value={value} index="three">
                    TODO Detail of any one selected item
                </TabPanel>
            </CardContent>
        </Collapse>
    );
    if(props.title === 'Effect' || props.title === 'Resource'){
        actionOne = (
            <IconButton aria-label="share" onClick={handleOpenClick}>
                <PlayIcon/>
            </IconButton>
        )
        collapse = null;
    }
    if(props.createMove){
        actionOne = (
            <IconButton aria-label="share" onClick={handleOpenClick}>
                <PlayIcon/>
            </IconButton>
        )
    }
    let analysisContent = null;
    if(props.analysis){
        analysisContent = (
            <Paper className={fixedHeightPaper}>
                <Chart
                    title="Player Stability (MPICE)"
                    data={props.analysis}
                    onClick={(event) => handleViewChange(event)}
                />
            </Paper>
        );
    }

    return (
        <Card className={classes.card} width={props.width}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {props.avatar}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={props.title}
                subheader={props.subheader}
            />
            <CardContent>
                {props.content}
            </CardContent>
            <CardActions disableSpacing>
                {actionOne}
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            {collapse}
        </Card>
    );
}