import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Link } from 'react-router-dom';

const footerPages = require('../../model/FP-i18n.json');
class LegalNotice extends Component
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
		document.title = this.props.literals.L360 +  " - " + this.props.literals.L22020 + " - " + this.props.literals.L363;
	}
	  
	render()
	{
		return(
			<div className="mainBody">
				<h1 className="title-section second-color ng-binding text-center">
					{this.props.literals.L360}
				</h1>
				<div className="container legal--notice--block">
					
					<h2 className="title-section main-color">{ReactHtmlParser(this.state.footerPages.disclaimer)}</h2>
					<div>{ReactHtmlParser(this.state.footerPages.disclaimerText)}</div>

					<h3 className="title-section main-color" >{ReactHtmlParser(this.state.footerPages.copyrightNotice)}</h3>
					<div >{ReactHtmlParser(this.state.footerPages.copyrightNoticeText)}</div>
				</div>
			</div>
		)
	}
}
LegalNotice.displayName = 'LegalNotice';
export default LegalNotice;