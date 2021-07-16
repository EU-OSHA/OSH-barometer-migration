import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Link } from 'react-router-dom';

const footerPages = require('../../model/FP-i18n.json');
class Accesibility extends Component
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
		document.title = this.props.literals.L358 +  " - " + this.props.literals.L22020 + " - " + this.props.literals.L363;
	}
	  
	render()
	{
		return(
			<div  className="mainBody">
				<h1 className="title-section second-color ng-binding text-center">
				{this.props.literals.L694}
				</h1>
				<div className="container legal--notice--block">
					<h2 className="title-section main-color">{this.state.footerPages.accessKeys}</h2>
					<div>{ReactHtmlParser(this.state.footerPages.accessKeysText1)}</div>
					
					<h3 className="title--card second-color">{ReactHtmlParser(this.state.footerPages.availableAccessKeys)}</h3>
					<div className="list--tag--block">{ReactHtmlParser(this.state.footerPages.availableAccessKeysList)}</div>
					
					<h3 className="title--card second-color">{ReactHtmlParser(this.state.footerPages.differentWebBrowsers)}</h3>
					<div className="tableAccesibility">{ReactHtmlParser(this.state.footerPages.table)}</div>
				</div>
			</div>
		)
	}
}
Accesibility.displayName = 'Accesibility';
export default Accesibility;