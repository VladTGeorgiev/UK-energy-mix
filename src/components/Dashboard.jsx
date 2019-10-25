import React, { Component } from 'react';
import { Header, Divider, Label, Container, Dimmer, Loader, Icon, Grid } from 'semantic-ui-react';
import API from '../adapters/API.jsx';
import MixChart from './MixChart.jsx';
import FuelCard from './FuelCard.jsx';

class Dashboard extends Component {
	constructor (props) {
		super(props);
		this.state = {
			data: {},
			width: window.innerWidth
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
				<Container textAlign="center">
					<Divider hidden />
					<Header as="h1">UK Energy Mix</Header>
					<Divider />
					{output === null ? (
						<Container>
							<Divider hidden />
							<Dimmer active inverted>
								<Loader size="large">Loading...</Loader>
							</Dimmer>
						</Container>
					) : (
						<Container>
							<Container>
								<Header as="h2">Fuel types overview</Header>
								<Grid divided="vertically">
									<Grid.Row columns={dashboardLayout}>
										<Grid.Column>
											<MixChart fuelData={output.generationmix} />
										</Grid.Column>
										<Grid.Column>
											<Divider hidden />
											<Divider hidden />
											<Label>
												<Icon name="time" />
												<Divider hidden fitted />
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
							<FuelCard fuelSource={output.generationmix} windowWidth={this.state.width} />
						</Container>
					)}
				</Container>
			);
		};
	};
};

export default Dashboard;
