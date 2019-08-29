import React, { Component } from 'react';
import './App.css';
import Popup from '../components/Popup/Popup';
import axios from 'axios'
// TODO Get rid of Cockpit folder moving everything to MiniDrawer
import Players from '../components/Players/Players';
import Graph from '../components/Graph/Graph';
import worlddata from '../components/WorldMap/world';
import WorldMap from '../components/WorldMap/WorldMap';
import MiniDrawer from '../components/Drawer/MiniDrawer'
import { geoCentroid } from 'd3-geo';
import { range } from 'd3-array';
import { scaleThreshold } from 'd3-scale'
import Move from '../components/Move/Move';
import Card from "../components/Drawer/Card";
import Grid from "@material-ui/core/Grid";
import Snackbar from '../components/SnackBar/SnackBar'
import CreateGamePopUp from '../components/CreateGame/CreateGamePopUp'
import DemoGame from '../assets/DemoGame.json'
import Stability from '../components/Stability/Stability'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import PrimaryColor from '@material-ui/core/colors/grey';
import SecondaryColor from '@material-ui/core/colors/amber';
import Spinner from '../components/Drawer/Spinner'

const appdata = worlddata.features
    .filter(d => geoCentroid(d)[0] < -20);

appdata
    .forEach((d,i) => {
        const offset = Math.random();
        d.launchday = i;
        d.data = range(30).map((p,q) => q < i ? 0 : Math.random() * 2 + offset)
    });

const colorScale = scaleThreshold().domain([5,10,20,30]).range(["#75739F", "#5EAFC6", "#41A368", "#93C464"]);
const theme = createMuiTheme({
    palette: {
        primary: PrimaryColor,
        secondary: SecondaryColor,
        type: 'dark'
    },
    status: {
        danger: 'orange',
    }
});

class App extends Component {
    constructor(props) {
        super(props);
        this.onResize = this.onResize.bind(this);
        this.onHover = this.onHover.bind(this);
        this.onBrush = this.onBrush.bind(this);
    }
    state = {
        availableGames: [],
        currentPlayer: "Player1",
        currentGame: DemoGame.gameState,
        moves: DemoGame.gameState.moves,
        playerCount: 5,
        players: DemoGame.gameState.players,
        resources: DemoGame.gameState.nodes,
        selectedGame: DemoGame.gameState.gameName,
        selectedResources: [],
        userType: "Master",
        screenWidth: 1000,
        screenHeight: 500,
        hover: "none",
        brushExtent: [0,40],
        blackBoard: "No Events",
        showResources: false,
        showPopup: false,
        showCreateGame: true,
        showSpinner: false,
        popUp: '234980d',
        showPlayerCard: false,
        showMapCard: false,
        showNetworkCard: false,
        showMoveCard: false,
        showResourceCard: false,
        showStabilityCard: false,
        showResourcePopUp: null,
        snackBarOpen: true,
        snackBarMessage: "Latest message",
        stabilityView: {}
    };

    onResize() {
        this.setState({ screenWidth: window.innerWidth, screenHeight: window.innerHeight - 120 })
    };

    onHover(d) {
        this.setState({ hover: d.id })
    };

    onBrush(d) {
        this.setState({ brushExtent: d })
    };

    addResourceToMove(nodeId){
        console.log("Current move resources:" + this.state.selectedResources);
        nodeId = nodeId.currentTarget.value;
        let newresources = [...this.state.selectedResources];
        newresources.push(nodeId);
        this.setState({selectedResources: newresources});
        this.state.snackBarMessage = (nodeId + " added to move");
        this.state.snackBarOpen = true;
    };

    setGames = (availableGames) => {
        console.log("[app.js] Set Game: " + availableGames);
        this.setState({availableGames : availableGames});
    };

    setViews = () => {
        let stabilityView = this.state.currentGame.nodes.filter(effect => {
            return (effect.class_name === "Effect")
        });
        this.setState({stabilityView: stabilityView});

    };

    deleteGameHandler = ( event ) => {
        let gameData = {"gameKey": Number(event.currentTarget.value)};
        axios.get("https://intcitium.com/game/delete_game",{
            mode: "cors",
            params: gameData
        })
            .then(res => {
                const gameMessage = res.data.message;
                console.log(gameMessage);
                console.log(res.data.gameState);
                let currentGame = {...this.state.currentGame};
                currentGame = res.data.gameState;
                let players = [...this.state.players];
                players = res.data.gameState.players;
                let nodes = [...this.state.currentGame.nodes];
                nodes = res.data.gameState.nodes;

                this.setState({currentGame : currentGame});
                this.setState({players : players });
                this.setState({resources : nodes });
            })
    };

    gameSelectHandler = ( event ) => {
        this.setState({spinner : true});
        let gameData = {"gameKey": Number(event.currentTarget.value)};
        axios.get("https://intcitium.com/game/get_game",{
            mode: "cors",
            params: gameData
        })
            .then(res => {
                const gameMessage = res.data.message;
                console.log(gameMessage);
                console.log(res.data.gameState);
                let currentGame = {...this.state.currentGame};
                currentGame = res.data.gameState;
                let players = [...this.state.players];
                players = res.data.gameState.players;
                let nodes = [...this.state.currentGame.nodes];
                nodes = res.data.gameState.nodes;
                this.setState({snackBarMessage : gameMessage});
                this.setState({currentGame : currentGame});
                this.setState({players : players });
                this.setState({resources : nodes });
                this.setViews();
                this.setState({spinner : false});
            })

    };

    nameChangedHandler = ( event, id ) => {
        const resourceIndex = this.state.resources.findIndex(r => {
            return r.id === id;
        });
        const resource = {
            ...this.state.resources[resourceIndex]
        };
        resource.name = event.target.value;
        console.log("RESOURCE"+ resource.name);

        const resources = [...this.state.resources];
        resources[resourceIndex] = resource;
        console.log("NEXT"+ resources[resourceIndex]);

        this.setState( {resources : resources});
    };

    componentDidMount() {
        // Game set up component can be hidden after set
        console.log(DemoGame);
        axios.get("https://intcitium.com/game",{
            mode: "cors"
        })
            .then(res => {
                const gameMessage = res.data.message;
                console.log(gameMessage);
                console.log(res.data.data);
                this.setGames(res.data.data);
                this.setViews();
            })
    };

    toggleResources = () => {
        const doesShow = this.state.showResources;
        this.setState({showResources: !doesShow});
    };

    toggleResourceCard = () => {
        const doesShow = this.state.showResourceCard;
        this.setState({showResourceCard: !doesShow});
    };

    togglePlayerCard = () => {
        const doesShow = this.state.showPlayerCard;
        this.setState({showPlayerCard: !doesShow });
    };

    toggleNetworkCard = () => {
        const doesShow = this.state.showNetworkCard;
        this.setState({ showNetworkCard: !doesShow });
    };

    toggleMapCard = () => {
        const doesShow = this.state.showMapCard;
        this.setState({ showMapCard: !doesShow });
    };

    toggleMoveCard = () => {
        const doesShow = this.state.showMoveCard;
        this.setState({ showMoveCard: !doesShow });
    };

    toggleStabilityCard = () => {
        const doesShow = this.state.showStabilityCard;
        this.setState({ showStabilityCard: !doesShow });
    };

    setupGame = (event) => {
        // Get the form data
        let gameForm = {"playerCount": Number(event.currentTarget.value)};
        axios.get("https://intcitium.com/game/setup_game",{
            mode: "cors",
            params: gameForm
        })
            .then(res => {
                const gameState = res.data.gameState;
                const resources = res.data.gameState.players[0].nodes;
                this.setState({ gameState : gameState });
                this.setState({ resources : resources });
            })
    };

    createMove = (moveData) => {
        console.log("[CreateMove] sending move data to url " + moveData);
        this.setState({spinner : true});
        let gameStab = this.state.stabilityView;
        console.log("[CreateMove] current game stability view " + gameStab.toString());
        axios.post("https://intcitium.com/game/create_move",{
            mode: "cors",
            params: moveData
        })
            .then(res => {
                const gameState = res.data.gameState;
                const resources = res.data.gameState.players[0].nodes;
                this.setState({ currentGame : gameState });
                this.setState({ resources : resources });
                this.setState({spinner : false});
                this.setState({players : res.data.gameState.players });
                this.setState({ snackBarMessage: res.data.gameState.result });
                this.setViews();
                console.log("[CreateMove] new game stability view " + this.state.stabilityView.toString())
            })
    };

    togglePlayerResources = (event) => {
        this.setState({currentPlayer : event.currentTarget.value});
    };

    togglePopup = () => {
        const doesShow = this.state.showPopup;
        this.setState({showPopup: !doesShow});
    };

    createResource = (event) => {
        console.log(event);
        const resources = [...this.state.resources];
        resources.push({
            id: Math.random()*99303,
            points: Math.random(),
            name: event.target[2].value,
            type: event.target[0].value,
            category: event.target[1].value}
        );
        this.setState( {resources : resources});
    };

    render() {

        let popup = null;
        if ( this.state.showPopup ){
            popup = (
                <div>
                    {this.state.resources.map(resource => {
                        return <Popup
                            key={Math.random()}
                            text={resource.name}
                            close={this.togglePopup}
                            create={(event) => this.createResource(event)}
                        />
                    })}
                </div>
            );
        }
        const filteredAppdata = appdata
            .filter((d,i) => d.launchday >= this.state.brushExtent[0] && d.launchday <= this.state.brushExtent[1]);
        //Game Map Card
        let WorldMapDiv = null;
        if ( this.state.showMapCard ) {
            const WorldMapContent = (
                <WorldMap
                    data={filteredAppdata}
                    hoverElement={this.state.hover}
                    onHover={this.onHover}
                    colorScale={colorScale}
                    size={[this.state.screenWidth / 2, this.state.screenHeight / 2]}/>
            );

            WorldMapDiv = (
                <Grid item>
                    <Card
                        content={WorldMapContent}
                        avatar="W"
                        title="World Map"
                        subheader="Common Operating Picture"
                    />
                </Grid>
            )
        }
        //Card to view each player individually
        let PlayersDiv = null;
        if ( this.state.showPlayerCard ) {
            const spinner = (<Spinner/>);
            const PlayersContent = (
                <Players
                    players={this.state.players}
                    clicked={this.togglePlayerResources}
                />
            );
            PlayersDiv = (
                <Grid item>
                    <Card
                        content={PlayersContent}
                        avatar="P"
                        title="Players"
                        subheader="Game Master View"
                    />
                </Grid>
            );
        }
        // Resources and relationships Card
        let GraphDiv = null;
        if ( this.state.showNetworkCard ) {
            const GraphDivContent = (
                <Graph
                    nodes={this.state.currentGame.nodes}
                    links={this.state.currentGame.links}
                    changed={() => this.nameChangedHandler}
                    addResourceToMove={(event, nodeId) => this.addResourceToMove(event, nodeId)}
                />
            );
            GraphDiv = (
                <Grid item>
                    <Card
                        content={GraphDivContent}
                        avatar="N"
                        title="Network Analysis"
                        subheader="Resources and Connectivity"
                    />
                </Grid>
            );
        }
        // Move Creator with Select lists of Resources, Targets, and Effects
        let MovesDiv = null;
        if ( this.state.showMoveCard ) {
            const MovesContent = (
                <Move
                    selectedResources={this.state.selectedResources}
                    availableResources={this.state.currentGame.nodes.filter(resource => {
                        return (resource.player === this.state.currentPlayer && resource.class_name === "Resource")
                    })}
                    availableTargets={this.state.currentGame.nodes.filter(resource => {
                        return (resource.player !== this.state.currentPlayer && resource.class_name === "Resource")
                    })}
                    availableEffects={this.state.currentGame.nodes.filter(effect => {
                        return (effect.player === this.state.currentPlayer && effect.class_name === "Effect")
                    })}
                    gameKey={this.state.currentGame.key}
                    playerKey={this.state.currentPlayer}
                    createMove={(moveData) => this.createMove(moveData)}
                />
            );
            // TODO Card content to be tabs
            MovesDiv = (
                <Grid item width="100%">
                    <Card
                        content={MovesContent}
                        avatar="M"
                        title="Move Creator"
                        subheader="Cost Benefit Analysis"
                        createMove="true"
                        analysis={this.state.stabilityView}
                    />
                </Grid>
            );
        }
        const createGamePopUp = (
            <CreateGamePopUp
                availableGames={this.state.availableGames}
                selected={(event) => this.gameSelectHandler(event)}
                deleted={(event) => this.deleteGameHandler(event)}
                create={(event) => this.setupGame(event)}
            />
        );
        // Overall Game state in metrics where players are measured on proximity to effect priority score
        let StabilityDiv = null;
        if ( this.state.showStabilityCard ) {

            const stabilityContent = (
                <Stability
                    stabilityView={this.state.stabilityView}
                />
                );
            StabilityDiv = (
                <Grid item xs={12} md={8} lg={9}>
                    <Card
                        content={stabilityContent}
                        avatar="S"
                        title="Stability"
                        subheader="Player goal progress"
                    />
                </Grid>
            );
        }
        // Message for notifcations
        let snackBar = null;
        if ( this.state.snackBarOpen ){
            snackBar = (
                <Snackbar
                    open="true"
                    message={this.state.snackBarMessage}
                />
            )
        }

        let spinner = null;
        if ( this.state.showSpinner ) {
            spinner = <Spinner/>
        }
    return (
        <MuiThemeProvider theme={theme}>
            <div className="App">
                <div className="appLayer">
                    <MiniDrawer
                        toggleResources={this.toggleResources}
                        togglePopup={this.togglePopup}
                        setupGame={this.setupGame}
                        playerCount={this.state.playerCount}
                        changed={() => this.nameChangedHandler}
                        availableGames={this.state.availableGames}
                        currentGame={this.state.currentGame.gameName}
                        currentPlayer={this.state.currentPlayer}
                        userType={this.state.userType}
                        worldMap={WorldMapDiv}
                        playersDiv={PlayersDiv}
                        graphDiv={GraphDiv}
                        movesDiv={MovesDiv}
                        stabilityDiv={StabilityDiv}
                        createGame={createGamePopUp}
                        togglePlayerCard={this.togglePlayerCard}
                        toggleResourceCard={this.toggleResourceCard}
                        toggleMoveCard={this.toggleMoveCard}
                        toggleMapCard={this.toggleMapCard}
                        toggleNetworkCard={this.toggleNetworkCard}
                        toggleStabilityCard={this.toggleStabilityCard}
                    />
                </div>
                {popup}
                {snackBar}
                {spinner}
            </div>
        </MuiThemeProvider>
    );
  }
}

export default App;
