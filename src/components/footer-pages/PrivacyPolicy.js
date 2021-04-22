import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Link } from 'react-router-dom';

const footerPages = require('../../model/FP-i18n.json');
class PrivacyPolicy extends Component
{
	constructor(props)
	{
		super(props);

		this.state = {
            footerPages: footerPages
        }
	}

	componentDidMount()
	{
		// Update the title of the page
		document.title = this.props.literals.L359 +  " - " + this.props.literals.L22020 + " - " + this.props.literals.L363;
	}
	  
	render()
	{
		return(
			<div className="mainBody">
				<h1 className="title-section second-color ng-binding text-center">
					{this.props.literals.L359}
				</h1>
				<div className="container legal--notice--block">
					<h2 className="title-section main-color">
						{ReactHtmlParser(this.state.footerPages.organizational)}
					</h2>
					<div>
						{ReactHtmlParser(this.state.footerPages.Andrew)}
					</div>
					
					<h2 className="title-section main-color">
						{ReactHtmlParser(this.state.footerPages.Purpose)}
					</h2>
					<div>
						{ReactHtmlParser(this.state.footerPages.forThe)}
					</div>
					
					<h2 className="title-section main-color" >
						{ReactHtmlParser(this.state.footerPages.Type)}
					</h2>
					<div>{ReactHtmlParser(this.state.footerPages.Those)}</div>
					<div className="list--tag--block">{ReactHtmlParser(this.state.footerPages.ulTypeData)}</div>
					
					<h2 className="title-section main-color">{ReactHtmlParser(this.state.footerPages.LegalBasis)}</h2>
					<div>{ReactHtmlParser(this.state.footerPages.Council)}</div>
					
					<h2 className="title-section main-color">{ReactHtmlParser(this.state.footerPages.Lawfulness)}</h2>
					<div>{ReactHtmlParser(this.state.footerPages.TheProcessing)}</div>
					
					<h2 className="title-section main-color">{ReactHtmlParser(this.state.footerPages.DataRecipients)}</h2>
					<div>{ReactHtmlParser(this.state.footerPages.accessToPersonal)}</div>
					<div>{ReactHtmlParser(this.state.footerPages.DulyAppointed)}</div>
					<div>{ReactHtmlParser(this.state.footerPages.AllTheRecipients)}</div>
					
					<h2 className="title-section main-color">{ReactHtmlParser(this.state.footerPages.Cookies)}</h2>
					<div>{ReactHtmlParser(this.state.footerPages.cookiesText)}</div>

					<div className="box">
						<div id='box1'>
							<p>{ReactHtmlParser(this.state.footerPages.optOutComplete)}</p>
							<p>
								<input type='checkbox' data-ng-click="oculta()" /> <strong>{ReactHtmlParser(this.state.footerPages.textCheck2)}</strong>
							</p>
						</div>
					</div>
					
					<h2 className="title-section main-color">{ReactHtmlParser(this.state.footerPages.TheDataS)}</h2>
					<div>{ReactHtmlParser(this.state.footerPages.textDataSubjects)}</div>
					
					<h2 className="title-section main-color">{ReactHtmlParser(this.state.footerPages.InformationConservation)}</h2>
					<div>{ReactHtmlParser(this.state.footerPages.TheInformation)}</div>
					
					<h2 className="title-section main-color">{ReactHtmlParser(this.state.footerPages.SecurityMeasures)}</h2>
					<div>{ReactHtmlParser(this.state.footerPages.WeTakeAp)}</div>
					
					<h2 className="title-section main-color">{ReactHtmlParser(this.state.footerPages.Request)}</h2>
					<div>{ReactHtmlParser(this.state.footerPages.ForAnyF)}</div>
					
					<h2 className="title-section main-color">{ReactHtmlParser(this.state.footerPages.Recourse)}</h2>
					<div>{ReactHtmlParser(this.state.footerPages.DataSub)}</div>

					<h2 className="title-section main-color">{ReactHtmlParser(this.state.footerPages.Processing)}</h2>
					<div>{ReactHtmlParser(this.state.footerPages.DateAccess)}</div>
				</div>
			</div>
		)
	}
}
PrivacyPolicy.displayName = 'PrivacyPolicy';
export default PrivacyPolicy;