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
	};

	componentDidMount () {
		window.addEventListener('resize', this.handleWindowSizeChange);
		API.fetchData().then((data) => {
			this.setState({
				data: data
			});
		});
	};

	componentWillUnmount () {
		window.removeEventListener('resize', this.handleWindowSizeChange);
	};

	handleWindowSizeChange = () => {
		this.setState({ width: window.innerWidth });
	};

	render () {
		const output = this.state.data.data === undefined ? null : this.state.data.data;
		const dashboardLayout = this.state.width < 1000 ? 1 : 2;

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
					<Divider hidden />
					<Header as="h1">UK Energy Mix</Header>
					<Divider />
					{output === null ? (
						<Container>
							<Divider hidden />
							<Dimmer active inverted>
								<Loader size="large">Loading</Loader>
							</Dimmer>
						</Container>
					) : (
						<Container>
							<Container className="dashboard">
								<Header as="h2">Fuel types overview</Header>
								<Grid divided="vertically">
									<Grid.Row columns={dashboardLayout}>
										<Grid.Column />
											<MixChart className="dashboard-chart" fuelData={output.generationmix} />
										<Grid.Column>
											<Divider hidden />
											<Divider hidden />
											<Label className="dashboard-date">
												<Divider hidden fitted />
												<Icon name="time" />
												Values for the period
												<Divider hidden fitted />
												from :
												<Divider hidden fitted />
												<Label color="yellow">{output.from}</Label>
												<Divider hidden fitted />
												to:
												<Divider hidden fitted />
												<Label color="yellow">{output.from}</Label>
											</Label>
										</Grid.Column>
									</Grid.Row>
								</Grid>
								<Divider />
							</Container>
							<Header as="h2">Fuel types sorted by percentage energy generated</Header>
							<Divider hidden />
						</Container>
					)}
				</Container>
			);
		};
	};
};

export { App };
