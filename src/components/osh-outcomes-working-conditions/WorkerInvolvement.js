import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import AdviceSection from '../common/AdviceSection';

class WorkerInvolvement extends Component
{
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