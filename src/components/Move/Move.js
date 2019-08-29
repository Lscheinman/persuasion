import React from 'react';
import MultipleSelect from "../Select/Select";
import Button from '@material-ui/core/Button';
/*
TODO
 1) Dropping resources into the Move Creator to give potential moves
 1b) Option to create move from target or resource
 2) Starting a move from a breadcrumb/progressive menu
 3) Target Selection
 4) Cost Benefit Analysis
 TODO : Do live view that simulates chart (MPICE stability) based on chosen values Set component state to the current
 stability and then run local calculations that setState of data.
 */

export default function Move(props) {

    // TODO child component

    const [selectedResources, setSelectedResources] = React.useState([]);
    const [selectedTargets, setSelectedTargets] = React.useState([]);
    const [selectedEffects, setSelectedEffects] = React.useState([]);

    const handleOnChangeResources = (event) => {
        setSelectedResources(event);
    };

    const handleOnChangeTargets = (event) => {
        setSelectedTargets(event);
    };

    const handleOnChangeEffects = (event) => {
        setSelectedEffects(event);
    };

    const handleSubmit = () => {
        let moveData = {
            "targetKeys": selectedTargets.value,
            "resourceKeys": selectedResources.value,
            "effectKeys": selectedEffects.value,
            "playerKey": props.playerKey,
            "gameKey": props.gameKey
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
                        selectType="Resources"
                        onChange={handleOnChangeResources}
                    />
                </div>
                <div>
                    <MultipleSelect
                        names={props.availableTargets}
                        selectType="Targets"
                        onChange={handleOnChangeTargets}
                    />
                </div>

            </div>
            <div className="flex-container">
                <div>
                    <MultipleSelect
                        names={props.availableEffects}
                        selectType="Effects"
                        onChange={handleOnChangeEffects}
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