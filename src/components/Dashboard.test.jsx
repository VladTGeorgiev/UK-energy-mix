import React from 'react';
import Dashboard from './Dashboard.jsx';
import renderer from 'react-test-renderer'

global.fetch = require('jest-fetch-mock');

describe('Dashboard', () => {
	it('should render Loading screen when there is no data loaded', () => {
		const tree = renderer.create(<Dashboard />).toJSON();
		expect(tree).toMatchSnapshot();
	});
});

