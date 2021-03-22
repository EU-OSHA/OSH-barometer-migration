import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import AdviceSection from '../common/AdviceSection';

class WorkerInvolvement extends Component
{
	render()
	{
		return(
			<div>
				<AdviceSection literals={this.props.literals} section={["osh-outcomes-working-conditions","worker-involvement"]} />
			</div>
		)
	}
}

export default WorkerInvolvement;