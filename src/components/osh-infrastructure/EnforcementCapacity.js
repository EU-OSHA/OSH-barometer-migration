import React, { Component } from 'react';
import AdviceSection from '../common/AdviceSection';
import Methodology from '../common/Methodology';
import Related from '../common/Related.js';

class EnforcementCapacity extends Component
{
	render()
	{
		return(
			<div className="country--profile--page enforcement-capacity">
				<AdviceSection literals={this.props.literals} section={["osh-infrastructure","enforcement-capacity"]} />

				<Methodology />
				<Related literals={this.props.literals} section={["osh-infrastructure","enforcement-capacity","establishments-inspected"]} />
			</div>
		)
	}
}
EnforcementCapacity.displayName = 'EnforcementCapacity';
export default EnforcementCapacity;