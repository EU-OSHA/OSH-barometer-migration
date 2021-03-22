import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import AdviceSection from '../common/AdviceSection';
class PreventionCompanies extends Component
{
	render()
	{
		return(
			<div>
				<AdviceSection literals={this.props.literals} section={["osh-outcomes-working-conditions","prevention-companies"]} />
			</div>
		)
	}
}

export default PreventionCompanies;