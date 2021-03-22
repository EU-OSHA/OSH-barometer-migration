import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import AdviceSection from '../common/AdviceSection';

class Regulation extends Component
{
	render()
	{
		return(
			<div className="regulation">
				<AdviceSection literals={this.props.literals} section={["osh-steering","regulation"]} />

				<section className="coming-soon"></section>
			</div>
		)
	}
}

export default Regulation;