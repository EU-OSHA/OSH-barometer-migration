import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import AdviceSection from '../common/AdviceSection';
class OverallOpinion extends Component
{
	render()
	{
		return(
			<div className="overall-opinion">
				<AdviceSection literals={this.props.literals} section={["osh-outcomes-working-conditions","overall-opinion"]} />
			</div>
		)
	}
}
OverallOpinion.displayName = 'OverallOpinion';
export default OverallOpinion;