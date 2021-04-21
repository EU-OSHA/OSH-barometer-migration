import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import AdviceSection from '../common/AdviceSection';

class WorkerInvolvement extends Component
{
	componentDidMount()
	{
		// Update the title of the page
		document.title = this.props.literals.L22015 +  " - " + this.props.literals.L22020 + " - " + this.props.literals.L363;
	}

	render()
	{
		return(
			<div className="worker-involvement">
				<AdviceSection literals={this.props.literals} section={["osh-outcomes-working-conditions","worker-involvement"]} />
			</div>
		)
	}
}
WorkerInvolvement.displayName = 'WorkerInvolvement';
export default WorkerInvolvement;