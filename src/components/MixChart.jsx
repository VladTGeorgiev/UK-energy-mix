import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

class CustomizedLabel extends PureComponent {
	render () {
		const { x, y, stroke, value } = this.props;

		return (
			<text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
				{value}%
			</text>
		);
	}
}

class CustomizedAxisTick extends PureComponent {
	render () {
		const { x, y, stroke, payload } = this.props;

		return (
			<g transform={`translate(${x},${y})`}>
				<text x={0} y={0} dy={16} textAnchor="start" fill="#666" transform="rotate(+35)">
					{payload.value}
				</text>
			</g>
		);
	}
}

export default class Example extends PureComponent {
	static jsfiddleUrl = 'https://jsfiddle.net/alidingling/5br7g9d6/';

	render () {
		const data = [];

		this.props.fuelData.map((fuelSource) => data.push({ name: fuelSource.fuel, percentage: fuelSource.perc }));
		return (
			<LineChart
				width={500}
				height={300}
				data={data}
				margin={{
					top: 20,
					right: 30,
					left: 20,
					bottom: 10
				}}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" height={60} tick={<CustomizedAxisTick />} />
				<YAxis />
				<Tooltip />
				<Legend />
				<Line type="monotone" dataKey="percentage" stroke="#8884d8" label={<CustomizedLabel />} />
			</LineChart>
		);
	}
}
