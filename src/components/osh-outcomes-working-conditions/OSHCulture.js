import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import AdviceSection from '../common/AdviceSection';
class OSHCulture extends Component
{
	render()
	{
		return(
			<div className="osh-culture">
				<AdviceSection literals={this.props.literals} section={["osh-outcomes-working-conditions","osh-culture"]} />
			</div>
		)
	}
}
OSHCulture.displayName = 'OSHCulture';
export default OSHCulture;