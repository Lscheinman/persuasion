import React, { Component } from 'react';
const d3 = Object.assign({}, require("d3-scale"), require("d3"));

const settings = {
    width: 500,
    height: 300,
    padding: 30,
    numDataPoints: 50,
    maxRange: () => Math.random() * 1000
};

class Axis extends React.Component {
    componentDidMount() {
        this.renderAxis();
    }

    componentDidUpdate() {
        this.renderAxis();
    }

    renderAxis() {
        const node = React.findDOMNode(this.refs.axisContainer);
        const axis = d3.svg.axis()
            .orient(this.props.orient)
            .ticks(5)
            .scale(this.props.scale);

        d3.select(node).call(axis);
    }

    render() {
        return <g className="axis" ref="axisContainer" transform={this.props.translate} />
    }
}

class XYAxis extends Component {
    render() {
        return (
            <g className="xy-axis">
                <Axis
                    translate={`translate(0, ${this.props.height - this.props.padding})`}
                    scale={this.props.xScale}
                    orient="bottom"
                />
                <Axis
                    translate={`translate(${this.props.padding}, 0)`}
                    scale={this.props.xScale}
                    orient="left"
                />
            </g>
        );
    }
}

class DataCircles extends Component {
    renderCircle(coords) {
        return (
            <circle
                cx={this.props.xScale(coords[0])}
                cy={this.props.yScale(coords[1])}
                r={2}
                key={Math.random() * 1}
            />
        );
    }

    render() {
        return <g>{this.props.data.map(this.renderCircle.bind(this))}</g>
    }
}

class ScatterPlot extends Component {

    componentWillMount() {
        this.randomizeData();
    }

    randomizeData() {
        const randomData = d3.range(settings.numDataPoints).map(() => {
            return [Math.floor(Math.random() * settings.maxRange()), Math.floor(Math.random() * settings.maxRange())];
        });
        this.setState({data: randomData});
    }

    getXScale() {
        const xMax = d3.max(this.props.data, (d) => d[0]);

        return d3.scale.linear()
            .domain([0, xMax])
            .range([this.props.padding, (this.props.width - this.props.padding * 2)]);
    }

    getYScale() {
        const yMax = d3.max(this.props.data, (d) => d[1]);

        return d3.scale.linear()
            .domain([0, yMax])
            .range([this.props.height - this.props.padding, this.props.padding]);
    }

    render() {
        const xScale = this.getXScale();
        const yScale = this.getYScale();

        return (
            <svg width={this.props.width} height={this.props.height}>
                <DataCircles xScale={xScale} yScale={yScale} {...this.props} />
                <XYAxis xScale={xScale} yScale={yScale} {...this.props} />
            </svg>
        );
    }
}

export default ScatterPlot;
  