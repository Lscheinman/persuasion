import React from 'react';
import MultipleSelect from "../Select/Select";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
/*
The Move Creator provides the form from which all resources, effects, targets (RET) and selected round are entered by the
player. The form consists of 3 multi-select drop down for each of the RET and a range slider for the round. The slider
range should always start from the current round and extend 25 rounds out. Therefore rounds in the past can't be selected
and rounds to far in the future can't be made. Other components will be able to modify the form by adding RET from their
own menus. For example, the Detail component will allow an RET to be added dependent on the ownership of the RET.
TODO Move all the onChange functionality to the App and pass down to the Detail
 1) Dropping resources into the Move Creator to give potential moves
 2) Starting a move from a breadcrumb/progressive menu
 4) Cost Benefit Analysis
 TODO : Do live view that simulates chart (MPICE stability) based on chosen values Set component state to the current
 stability and then run local calculations that setState of data.
 */

export default function Move(props) {
    let currentRound = null;
    if(props.current_round){
        currentRound = props.current_round;
    } else {
        currentRound = 0;
    }

    const handleSubmit = () => {
        let moveData = {
            "targetKeys": props.selectedTargets.value,
            "resourceKeys": props.selectedResources.value,
            "effectKeys": props.selectedEffects.value,
            "playerKey": props.playerKey,
            "gameKey": props.gameKey,
            "round": props.selectedRound
        };
        console.log(moveData);
        props.createMove(moveData);
    };

    return (
        <div>
            <div className="flex-container">
                <div>
                    <MultipleSelect
                        names={props.availableResources}
                        value={props.selectedResources}
                        selectType="Resources"
                        onChange={props.handleOnChangeResources}
                    />
                </div>
                <div>
                    <MultipleSelect
                        names={props.availableTargets}
                        value={props.selectedTargets}
                        selectType="Targets"
                        onChange={props.handleOnChangeTargets}
                    />
                </div>

            </div>
            <div className="flex-container">
                <div>
                    <MultipleSelect
                        names={props.availableEffects}
                        value={props.selectedEffects}
                        selectType="Effects"
                        onChange={props.handleOnChangeEffects}
                    />
                </div>
                <div>
                    <Typography id="discrete-slider" gutterBottom>
                        Round
                    </Typography>
                    <Slider
                        defaultValue={currentRound}
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="auto"
                        step={1}
                        marks
                        min={currentRound}
                        max={currentRound + 25}
                        onChange={props.handleOnChangeRound}
                    />
                </div>
            </div>
            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
            >
                Submit
            </Button>
        </div>
    );
}