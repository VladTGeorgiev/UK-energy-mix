import React, { Component } from 'react';
import { Card, Divider, Label } from 'semantic-ui-react';

export default class FuelCard extends Component {
	render () {
		let cardLayout;
		const windowWidth = this.props.windowWidth;

		if (windowWidth < 600) {
			cardLayout = 2;
		} else if (windowWidth < 900) {
			cardLayout = 3;
		} else if (windowWidth < 1280) {
			cardLayout = 4;
		} else {
			cardLayout = 5;
		}

		return (
			<Card.Group itemsPerRow={cardLayout}>
				{this.props.fuelSource.sort((a, b) => a.perc - b.perc).reverse().map((fuelSource) => (
					<Card key={this.props.fuelSource.indexOf(fuelSource)}>
						<Label size="big" color="olive">
							{fuelSource.fuel.toUpperCase()}
						</Label>
						<Divider hidden />
						<Label size="big" color="teal" circular>
							{fuelSource.perc}%
						</Label>
						<Divider hidden fitted />
					</Card>
				))}
			</Card.Group>
		);
	}
}
