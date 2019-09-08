import React from 'react';
import {
    ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    Legend, Scatter
} from 'recharts';

export default function Chart(props) {
    let goal = props.goal;
    let value = props.value;

    let yMax = 100;
    let yMin = -100;
    let barColor = "#00c403";
    let statusScore = Math.abs(props.value - props.goal);
    let bubble = {
        "x": 1,
        "y": props.goal,
        "z": 200
    };
    console.log(statusScore);
    if (statusScore >= 10 && statusScore <= 20) {
        barColor = "#48c400";
    } else if(statusScore > 20 && statusScore <= 30) {
        barColor = "#83c400";
    } else if(statusScore > 30 && statusScore <= 40) {
        barColor = "#adc400";
    } else if(statusScore > 40 && statusScore <= 50) {
        barColor = "#c4ad00";
    } else if(statusScore > 50 && statusScore <= 60) {
        barColor = "#edb600";
    } else if(statusScore > 60 && statusScore <= 70) {
        barColor = "#c77700";
    } else if(statusScore > 70 && statusScore <= 80) {
        barColor = "#c76000";
    } else if(statusScore > 80 && statusScore <= 90) {
        barColor = "#c23000";
    } else if(statusScore > 90) {
        barColor = "#8c0700";
    }
    console.log("Bar" + barColor);
    if ( props.value > 100 ){
        yMax = props.value + 10;
    }
    if ( props.value < -100 ){
        yMin = props.value - 10;
    }
    const data = [
        {
            name: 'Goal', status: value, goal: goal
        }
    ];

    return (
        <ComposedChart
            width={150}
            height={250}
            data={data}
            margin={{
                top: 20, right: 20, bottom: 20, left: 20,
            }}
        >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="name" />
            <YAxis domain={[yMin, yMax]}/>
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="status" stroke={barColor} />
            <Scatter dataKey="goal" data={bubble} fill={barColor} fill-opacity="0.4" shape="star" />
        </ComposedChart>
    );
}