import React from 'react';
import Typography from '@material-ui/core/Typography';
import ResourceChart from '../Detail/ResourceGraph';
import EffectChart from '../Detail/EffectGraph';
import Box from '@material-ui/core/Box';
import AddToMove from '@material-ui/icons/PlaylistAdd'
import IconButton from "@material-ui/core/IconButton";

/*
The Detail view provides the user with statistical charts and summaries of the current selected node which is a Resource
or Effect. If the player matches the owner of selected node it will have different options than if the Resource of Effect
is owned by another player. For example an owner can add the selected node to a move as a Resource or Effect. If it does
not own it, the player can only add the selected node as a Target.
 */
export default function Detail(props) {

    let contentDiv = (
        <Typography variant="h5" component="h3">
            Name
        </Typography>
    );

    const handleAddEffectToMove= () => {
        props.handleOnChangeEffects(props.selectedNode);
    };

    const handleAddResourceToMove= () => {
        if(props.selectedNode.player === props.currentPlayer){
            props.handleOnChangeResources(props.selectedNode);
        } else {
            props.handleOnChangeTargets(props.selectedNode);
        }
    };

    if ( props.selectedNode.class_name === 'Effect' ){
        /*  Data Model
            "class_name": "Effect",
            "goal": 9,
            "id": 871,
            "indicator": "Is group-based inequality a source of conflict?",
            "measure": "Number of land occupations (by identity group",
            "name": "Number of land occupations (by identity group Player1",
            "objective": "Economic Inequality between Groups in Conflict",
            "phase": "Diminish the Drivers of Conflict",
            "player": "Player1",
            "strat": "Sustainable Economy",
            "value": 8
         */

        contentDiv = (
            <div>
                <Typography variant="h5" align="left" >
                    {props.selectedNode.strat}
                </Typography>
                <Typography variant="subtitle1" align="left" >
                    {props.selectedNode.objective}
                </Typography>
                <Box display="flex" flexDirection="row" p={1} m={1} >
                    <EffectChart
                        value={props.selectedNode.value}
                        goal={props.selectedNode.goal}
                    />
                    <Box display="flex" width="50%" flexDirection="column" p={1} m={1} >
                        <Typography variant="subtitle1" align="left" > Indicator </Typography>
                        <Typography variant="body2" align="left" >
                            {props.selectedNode.indicator}
                        </Typography>
                        <br/>
                        <Typography variant="subtitle1" align="left" > Measure </Typography>
                        <Typography variant="body2" align="left" >
                           {props.selectedNode.measure}
                        </Typography>
                    </Box>
                </Box>
                <IconButton aria-label="share" onClick={handleAddEffectToMove}>
                    <AddToMove/>
                </IconButton>
            </div>
        );
    }

    if ( props.selectedNode.class_name === 'Resource' ){
        /* Data Model
            "active": true,
            "ascope": "Person",
            "category": "Behavioral",
            "class_name": "Resource",
            "color": "#f50505",
            "created": "Fri, 23 Aug 2019 05:02:25 GMT",
            "crimefilled": "Cyber",
            "defence": 51,
            "deleted": null,
            "description": "Hacker Person Cyber",
            "group": "Nava Omrodiye",
            "hitpoints": 60,
            "icon": "TBD",
            "id": 875,
            "name": "Nava Omrodiye Person Cyber",
            "offence": 15,
            "player": "Player1",
            "speed": 54,
            "type": "Hacker",
            "value": 72,
            "xpos": 15.5128565,
            "ypos": 5.6852527,
            "zpos": 51
         */
        contentDiv = (
            <div>
                <Box display="flex" flexDirection="row" p={1} m={1} >
                    <Box display="flex" flexDirection="column" p={1} m={1} >
                        <Typography variant="h5" align="left" >
                            {props.selectedNode.crimefilled}
                        </Typography>
                        <Typography variant="subtitle1" align="left" >
                            {props.selectedNode.ascope}
                        </Typography>
                    </Box>
                    <Box display="flex" flexDirection="column" p={1} m={1} >
                        <Typography variant="h5" align="left" >
                            {props.selectedNode.type}
                        </Typography>
                        <Typography variant="subtitle1" align="left" >
                            {props.selectedNode.category}
                        </Typography>
                    </Box>
                </Box>
                <Box display="flex" flexDirection="row" p={1} m={1} >
                    <ResourceChart
                        active={props.selectedNode.active}
                        ascope={props.selectedNode.ascope}
                        category={props.selectedNode.category}
                        crimefilled={props.selectedNode.crimefilled}
                        color={props.selectedNode.color}
                        defence={props.selectedNode.defence}
                        hitpoints={props.selectedNode.hitpoints}
                        id={props.selectedNode.id}
                        offence={props.selectedNode.offence}
                        player={props.selectedNode.player}
                        speed={props.selectedNode.speed}
                        type={props.selectedNode.type}
                        value={props.selectedNode.value}
                    />
                </Box>
                <IconButton aria-label="share" onClick={handleAddResourceToMove}>
                    <AddToMove/>
                </IconButton>
            </div>
        );
    }
    return (
        <div>
            {contentDiv}
        </div>
    );
}