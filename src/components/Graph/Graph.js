import React from 'react';
import { Graph } from 'react-d3-graph';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function netgraph(props) {
// graph payload (with minimalist structure)
    const [open, setOpen] = React.useState(false);
    const [nodeDetails, setDetails] = React.useState([]);
    const [selectedNode, setSelectedNode] = React.useState(null);
    const data = {
        nodes: [{id: "Calvin", data: 5, color: "red"}, {id: "Sally", data: 6}, {id: "Alice", data: 9}],
        links: [{source: "Calvin", target: "Sally"}, {source: "Calvin", target: "Alice"}],
    };
    if ( props.nodes ) {
        data.nodes = props.nodes;
        data.links = props.links;
    }

    const handleClickOpen = (nodeId) => {
        setSelectedNode(nodeId);
        let details = data.nodes.filter(
            node => node.id == nodeId);
        let nodeDetails = [];
        for(let i in details[0]){
            console.log(i, details[0][i]);
            nodeDetails.push(<p>{i} : {details[0][i]}</p>);
        }
        setDetails(nodeDetails);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

// the graph configuration, you only need to pass down properties
// that you want to override, otherwise default ones will be used
    const myConfig = {
        nodeHighlightBehavior: true,
        node: {
            size: 120,
            highlightStrokeColor: "blue",
        },
        link: {
            highlightColor: "lightblue",
        },
    };
// graph event callbacks
    const onClickGraph = function() {
        window.alert(`Clicked the graph background`);
    };

    const onDoubleClickNode = function(nodeId) {
        window.alert(`Double clicked node ${nodeId}`);
    };

    const onRightClickNode = function(event, nodeId) {
        window.alert(`Right clicked node ${nodeId}`);
    };

    const onMouseOverNode = function(nodeId) {
        //window.alert(`Mouse over node ${nodeId}`);
    };

    const onMouseOutNode = function(nodeId) {
        //window.alert(`Mouse out node ${nodeId}`);
    };

    const onClickLink = function(source, target) {
        window.alert(`Clicked link between ${source} and ${target}`);
    };

    const onRightClickLink = function(event, source, target) {
        window.alert(`Right clicked link between ${source} and ${target}`);
    };

    const onMouseOverLink = function(source, target) {
        //window.alert(`Mouse over in link between ${source} and ${target}`);
    };

    const onMouseOutLink = function(source, target) {
        //window.alert(`Mouse out link between ${source} and ${target}`);
    };
    return(
        <div>
            <Graph
                id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
                data={data}
                config={myConfig}
                onClickNode={handleClickOpen}
                onRightClickNode={onRightClickNode}
                onClickGraph={onClickGraph}
                onClickLink={onClickLink}
                onRightClickLink={onRightClickLink}
                onMouseOverNode={onMouseOverNode}
                onMouseOutNode={onMouseOutNode}
                onMouseOverLink={onMouseOverLink}
                onMouseOutLink={onMouseOutLink}
            />
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="draggable-dialog-title"
                addResourceToMove={props.addResourceToMove}
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    Resource detail
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {nodeDetails}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.addResourceToMove} color="primary" value={selectedNode}>
                        Add to Move
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default netgraph;