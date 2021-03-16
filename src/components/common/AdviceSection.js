import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
class AdviceSection extends Component
{
	render()
	{
		return(

				<section data-ng-if="state.current.name != 'home'" id="not-home-cover" className="advice--icon--block advice--block-not-home background-main-light container-fluid section--page">
					<div className="container horizontal-nopadding">
						<div className="left-text col-md-8 col-sm-8 col-xs-12">
							<h1 className="main-color left-text" data-ng-bind="i18nLiterals.L22002">OSH authorities</h1>
							<p data-ng-bind="i18nLiterals.L22025" className="">This indicator is an overview of OSH authorities and relevant OSH institutions in the different Member States and at EU level.</p>
							<span data-ng-bind="i18nLiterals.L20704" className="">For further information refer to</span>&nbsp;
							<span><Link data-ng-bind="i18nLiterals.L20705" ui-sref="about-tool-detail-page({pSection: 'generic-information', pSubsection: 'osh_authorities', pIndicator: '27'})" className="" to="/about-the-system/methodology">Methodology</Link></span>
						</div>
						<div className="icon--advice forum-icon hide-mobile col-sm-4 col-md-4"></div>
					</div>
				</section>

		)
	}
}

export default AdviceSection;