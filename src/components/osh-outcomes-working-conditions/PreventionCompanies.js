import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import Methodology from '../common/Methodology';
import AdviceSection from '../common/AdviceSection';
import Related from '../common/Related.js';
class PreventionCompanies extends Component
{
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