import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';

class Regulation extends Component
{
	render()
	{
		return(
			<div className="regulation">
				<section data-ng-if="state.current.name != 'home'" id="not-home-cover" className="advice--icon--block advice--block-not-home background-main-light container-fluid section--page">
					<div className="container horizontal-nopadding">
						<div className="text-advice left-text col-md-8 col-sm-8 col-xs-12  nopadding">
						<h1 className="main-color left-text">
							{this.props.literals.L22105}
						</h1>
						<p>
							{ReactHtmlParser(this.props.literals.L22106)}
						</p>
						</div>
						<div className="icon--advice regulation-icon hide-mobile col-sm-4 col-md-4"></div>
					</div>
				</section>
				<section className="coming-soon"></section>
			</div>
		)
	}
}

export default Regulation;