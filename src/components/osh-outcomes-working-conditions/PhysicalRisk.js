import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import AdviceSection from '../common/AdviceSection';
class PhysicalRisk extends Component
{
	render()
	{
		return(
			<div>
				<AdviceSection literals={this.props.literals} section={["osh-outcomes-working-conditions","physical-risk"]} />
			</div>
		)
	}
}

export default PhysicalRisk;