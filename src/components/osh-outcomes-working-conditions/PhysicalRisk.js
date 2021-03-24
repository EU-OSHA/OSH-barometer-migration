import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import AdviceSection from '../common/AdviceSection';
class PhysicalRisk extends Component
{
	render()
	{
		return(
			<div className="physical-risk">
				<AdviceSection literals={this.props.literals} section={["osh-outcomes-working-conditions","physical-risk"]} />
			</div>
		)
	}
}
PhysicalRisk.displayName = 'PhysicalRisk';
export default PhysicalRisk;