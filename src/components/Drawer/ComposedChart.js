import React from 'react';
import {
    ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, Legend, Scatter, ResponsiveContainer } from 'recharts';
import Title from "./Title";

export default function Chart(props) {
    let areaDataKey = "amt";
    let barDataKey = "pv";
    let lineDataKey = "uv";
    let xAxisDataKey = "name";

    let data = [
        {
            name: 'Page A', uv: 590, pv: 800, amt: 1400, cnt: 490,
        },
        {
            name: 'Page B', uv: 868, pv: 967, amt: 1506, cnt: 590,
        },
        {
            name: 'Page C', uv: 1397, pv: 1098, amt: 989, cnt: 350,
        },
        {
            name: 'Page D', uv: 1480, pv: 1200, amt: 1228, cnt: 480,
        },
        {
            name: 'Page E', uv: 1520, pv: 1108, amt: 1100, cnt: 460,
        },
        {
            name: 'Page F', uv: 1400, pv: 680, amt: 1700, cnt: 380,
        },
    ];

    let data2 = [
        {
            "class_name": "Effect",
            "goal": -97,
            "id": 523,
            "indicator": "What is the degree of satisfaction with the peace process?",
            "measure": "Perception that the peace process will afford people an appropriate say in local decisions in their community on key issues affecting daily life",
            "name": "Perception that the peace process will afford people an appropriate say in local decisions in their community on key issues affecting daily life Player1",
            "objective": "Public Satisfaction with Social Outcomes of Peace Process",
            "phase": "Strengthen Institutional Performance",
            "player": "Player1",
            "strat": "Social Well-Being",
            "value": 27
        },
        {
            "class_name": "Effect",
            "goal": 44,
            "id": 527,
            "indicator": "Are public offices corrupt?",
            "measure": "Perception of the degree of corruption and abuse of office by government leaders. (By identity group)",
            "name": "Perception of the degree of corruption and abuse of office by government leaders. (By identity group) Player1",
            "objective": "Political Impact of Illicit Wealth",
            "phase": "Diminish the Drivers of Conflict",
            "player": "Player1",
            "strat": "Sustainable Economy",
            "value": -20
        },
    ];
    if (props.data){
        console.log(props.data);
        areaDataKey = "value";
        barDataKey = "goal";
        lineDataKey = "value";
        xAxisDataKey = "player";
        data = props.data;
    }
    let title = null;
    if ( props.title ){
        title = props.title;
    }
    return (
        <React.Fragment>
            <Title>{title}</Title>
            <ResponsiveContainer>
                <ComposedChart
                    width={500}
                    height={400}
                    data={data}
                    margin={{
                        top: 20, right: 20, bottom: 20, left: 20,
                    }}
                >
                    <CartesianGrid stroke="#f5f5f5" />
                    <XAxis dataKey={xAxisDataKey} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey={areaDataKey} fill="#fff30f" stroke="#8884d8" />
                    <Bar dataKey={barDataKey} barSize={20} fill="#413ea0" />
                    <Line type="monotone" dataKey={lineDataKey} stroke="#ff7300" />
                    {/* <Scatter dataKey="cnt" fill="red" /> */}
                </ComposedChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}