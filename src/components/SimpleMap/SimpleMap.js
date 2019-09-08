import React from 'react';
import {
    ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Cell
} from 'recharts';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';

export default function SimpleMap(props)  {

    const colors = scaleOrdinal(schemeCategory10).range();

    const handleClickOpen = (nodeId) => {
        let details = data.filter(
            node => node.id == nodeId.id);
        let nodeDict = {...details[0]};
        props.nodeClicked(nodeDict);
    };
    //Demo data can be deleted after proper testing
    let data = [
        { xpos: 100, ypos: 200, z: 200 },
        { xpos: 120, ypos: 100, z: 260 },
        { xpos: 170, ypos: 300, z: 400 },
        { xpos: 140, ypos: 250, z: 280 },
        { xpos: 150, ypos: 400, z: 500 },
        { xpos: 110, ypos: 280, z: 200 },
    ];
    if(props.nodes){
        data = props.nodes;
    }

    return (
        <ScatterChart
            width={500}
            height={500}
            margin={{
                top: 20, right: 20, bottom: 20, left: 20,
            }}
        >
            <CartesianGrid />
            <XAxis type="number" dataKey="xpos" name="Latitude" unit="lat" />
            <YAxis type="number" dataKey="ypos" name="Longitude" unit="lng" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name="A school" data={data} fill="#8884d8" onClick={handleClickOpen}>
                {
                    data.map((entry, index) => <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />)
                }
            </Scatter>
        </ScatterChart>
    );
}
