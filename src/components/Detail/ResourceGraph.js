import React from 'react';
import {
    ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';

export default function Chart(props) {
    /* Data Model
    "color": "#f50505",
    "created": "Fri, 23 Aug 2019 05:02:25 GMT",
    "defence": 51,
    "hitpoints": 60,
    "offence": 15,
    "speed": 54,
    "value": 72,
    "xpos": 15.5128565,
    "ypos": 5.6852527,
    "zpos": 51
 */
    const data = [
        { name: 'OF', value: props.offence },
        { name: 'DE', value: props.defence },
        { name: 'HP', value: props.hitpoints },
        { name: 'VA', value: props.value },
        { name: 'SP', value: props.speed },
    ];

    return (
        <ComposedChart
            width={320}
            height={250}
            data={data}
            margin={{
                top: 20, right: 20, bottom: 20, left: 20,
            }}
        >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]}/>
            <Tooltip />
            <Bar dataKey="value" barSize={20} fill={props.color} />
        </ComposedChart>
    );
}