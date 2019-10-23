import React, { Component } from 'react';
import { Header, Divider, Label, Container, Dimmer, Loader, Icon, Grid, GridColumn } from 'semantic-ui-react';
import API from './adapters/API.jsx';
import MixChart from './components/Dashboard/MixChart.jsx';
import FuelCard from './components/FuelDetails/FuelCard.jsx';

class App extends Component {
	constructor (props) {
		super(props);
		this.state = {
			data: {}
		};
	}

	componentDidMount () {
		API.fetchData().then((data) => {
			this.setState({
				data: data
			});
		});
	}

	render () {

		if (this.state.data.error) {
			return (
				<Container textAlign="center">
					<Divider hidden />
					<Header as="h1">UK Energy Mix</Header>
					<Divider hidden />
					<Label size="big" color="red">
						{this.state.data.error.code}
					</Label>
					<Divider hidden />
					<Label>{this.state.data.error.message}</Label>
				</Container>
			);
		} else {
			return (
				<Container>

				</Container>
			);
		}
	}
}

export { App };
