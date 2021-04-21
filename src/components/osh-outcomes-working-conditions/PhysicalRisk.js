import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import AdviceSection from '../common/AdviceSection';
class PhysicalRisk extends Component
{
	componentDidMount()
	{
		// Update the title of the page
		document.title = this.props.literals.L22013 +  " - " + this.props.literals.L22020 + " - " + this.props.literals.L363;
	}

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