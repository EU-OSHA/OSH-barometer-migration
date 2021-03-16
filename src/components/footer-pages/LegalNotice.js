import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Link } from 'react-router-dom';

class LegalNotice extends Component
{
	render()
	{
		return(
			<div>
				<h1 class="title-section second-color ng-binding text-center">
					{this.props.literals.L360}
				</h1>
				<div class="container legal--notice--block">
					
					<h2 class="title-section main-color" data-ng-bind-html="i18n.disclaimer">{ReactHtmlParser(this.props.literals.disclaimer)}</h2>
					<div data-ng-bind-html="i18n.disclaimerText"></div>

					<h3 class="title-section main-color" data-ng-bind-html="i18n.copyrightNotice">{ReactHtmlParser(this.props.literals.copyrightNotice)}</h3>
					<div data-ng-bind-html="i18n.copyrightNoticeText"></div>
				</div>
			</div>
		)
	}
}

export default LegalNotice;