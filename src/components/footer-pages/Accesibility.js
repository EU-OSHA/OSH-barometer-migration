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
	render()
	{
		return(
			<div className="mainBody">
				<h1 class="title-section second-color ng-binding text-center">
				{this.props.literals.L694}
				</h1>
				<div class="container legal--notice--block">
					<h2 class="title-section main-color">{this.state.footerPages.accessKeys}</h2>
					<div data-ng-bind-html="i18n.accessKeysText1">{ReactHtmlParser(this.state.footerPages.accessKeysText1)}</div>
					
					<h3 class="title--card second-color">{ReactHtmlParser(this.state.footerPages.availableAccessKeys)}</h3>
					<div data-ng-bind-html="i18n.availableAccessKeysList" class="list--tag--block">{ReactHtmlParser(this.state.footerPages.availableAccessKeysList)}</div>
					
					<h3 class="title--card second-color">{ReactHtmlParser(this.state.footerPages.differentWebBrowsers)}</h3>
					<div class="tableAccesibility">{ReactHtmlParser(this.state.footerPages.table)}</div>
				</div>
			</div>
		)
	}
}
Accesibility.displayName = 'Accesibility';
export default Accesibility;