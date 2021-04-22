import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import Methodology from '../common/Methodology';
import AdviceSection from '../common/AdviceSection';
import Related from '../common/Related.js';
class PreventionCompanies extends Component
{
	componentDidMount()
	{
		// Update the title of the page
		document.title = this.props.literals.L22014 +  " - " + this.props.literals.L22020 + " - " + this.props.literals.L363;
	}

	render()
	{
		return(
			<div className="prevention-companies">
				<AdviceSection literals={this.props.literals} section={["osh-outcomes-working-conditions","prevention-companies"]} />
				<Methodology />
				<Related literals={this.props.literals} section={["osh-outcomes-working-conditions","prevention-companies","risk-assessment"]} />
			</div>
		)
	}
}
PreventionCompanies.displayName = 'PreventionCompanies';
export default PreventionCompanies;