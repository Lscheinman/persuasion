import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PlayersIcon from '@material-ui/icons/People';
import MovesIcon from '@material-ui/icons/Games';
import MapsIcon from '@material-ui/icons/Layers';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import logo from "../../logo.svg";
import ViewResourceIcon from "@material-ui/icons/Widgets";
import AddResourceIcon from "@material-ui/icons/Add";
import StabilityIcon from "@material-ui/icons/ShowChartRounded";
import Grid from '@material-ui/core/Grid';

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexGrow: 1,
        opacity: 1
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
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
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

export default function MiniDrawer(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    let current_game = null;
    if (props.currentGame){
        current_game = props.currentGame;
    }
    let current_player = null;
    if (props.currentPlayer){
        current_player = props.currentPlayer;
    }
    let masterNextPlayerButton = null;
    if (props.userType === "Master"){
        masterNextPlayerButton = (
            <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
        );
    }

    function handleDrawerOpen() {
        setOpen(true);
    }

    function handleDrawerClose() {
        setOpen(false);
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <img src={logo} className="App-logo" alt="logo" />
                    <Typography variant="h6" noWrap>
                        {current_game} : {current_player}
                    </Typography>
                    {masterNextPlayerButton}
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
                open={open}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {props.createGame}
                    <ListItem button key="MapMenuButton">
                        <ListItemIcon>
                            <MapsIcon onClick={props.toggleMapCard}/>
                        </ListItemIcon>
                        <ListItemText primary="Maps" />
                    </ListItem>
                    <ListItem button key="ViewPlayersButton">
                        <ListItemIcon>
                            <PlayersIcon onClick={props.togglePlayerCard}/>
                        </ListItemIcon>
                        <ListItemText primary="Players" />
                    </ListItem>
                    <ListItem button key="viewStabilityButton">
                        <ListItemIcon>
                            <StabilityIcon onClick={props.toggleStabilityCard}/>
                        </ListItemIcon>
                        <ListItemText primary="Stability" />
                    </ListItem>
                    <ListItem button key="MovesMenuButton">
                        <ListItemIcon>
                            <MovesIcon onClick={props.toggleMoveCard}/>
                        </ListItemIcon>
                        <ListItemText primary="Moves" />
                    </ListItem>
                    <ListItem button key="viewResourcesButton">
                        <ListItemIcon>
                            <ViewResourceIcon onClick={props.toggleNetworkCard}/>
                        </ListItemIcon>
                        <ListItemText primary="Resources" />
                    </ListItem>
                    <ListItem button key="addResourceButton">
                        <ListItemIcon>
                            <AddResourceIcon onClick={props.toggleCard}/>
                        </ListItemIcon>
                        <ListItemText primary="Create" />
                    </ListItem>
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Grid container spacing={3}>
                    {props.stabilityDiv}
                    {props.playersDiv}
                    {props.movesDiv}
                    {props.worldMap}
                    {props.graphDiv}
                </Grid>
            </main>
        </div>
    );
}