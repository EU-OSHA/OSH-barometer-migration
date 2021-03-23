import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import Methodology from '../common/Methodology';
import AdviceSection from '../common/AdviceSection';
import Related from '../common/Related.js';

class WorkAccidents extends Component
{
	render()
	{
		return(
			<div>
				<AdviceSection literals={this.props.literals} section={["osh-outcomes-working-conditions","work-accidents"]} />

				<Methodology />

				<Related literals={this.props.literals} section={["osh-outcomes-working-conditions","work-accidents","non-fatal-work-accidents"]} />
			</div>
		)
	}
}

export default WorkAccidents;