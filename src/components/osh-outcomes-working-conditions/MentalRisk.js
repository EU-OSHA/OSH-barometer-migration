import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import AdviceSection from '../common/AdviceSection';
class MentalRisk extends Component
{
	render()
	{
		return(
			<div>
				<AdviceSection literals={this.props.literals} section={["osh-outcomes-working-conditions","mental-risk"]} />
			</div>
		)
	}
}
MentalRisk.displayName = 'MentalRisk';
export default MentalRisk;