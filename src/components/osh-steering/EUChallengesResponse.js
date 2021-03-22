import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Link } from 'react-router-dom';
import AdviceSection from '../common/AdviceSection';
import Methodology from '../common/Methodology';

class EUChallengesResponse extends Component
{
	render()
	{
		return(
			<div>
				<AdviceSection literals={this.props.literals} section={["osh-steering","eu-challenges-response"]} />

				<Methodology />
			</div>
		)
	}
}

export default EUChallengesResponse;