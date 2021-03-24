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
	render()
	{
		return(
			<div>
				<h1 class="title-section second-color ng-binding text-center">
					{this.props.literals.L360}
				</h1>
				<div class="container legal--notice--block">
					
					<h2 class="title-section main-color">{ReactHtmlParser(this.state.footerPages.disclaimer)}</h2>
					<div data-ng-bind-html="i18n.disclaimerText">{ReactHtmlParser(this.state.footerPages.disclaimerText)}</div>

					<h3 class="title-section main-color" >{ReactHtmlParser(this.state.footerPages.copyrightNotice)}</h3>
					<div >{ReactHtmlParser(this.state.footerPages.copyrightNoticeText)}</div>
				</div>
			</div>
		)
	}
}
LegalNotice.displayName = 'LegalNotice';
export default LegalNotice;