import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Link } from 'react-router-dom';

class Accesibility extends Component
{
	render()
	{
		return(
			<div>
				<h1 class="title-section second-color ng-binding text-center">
				{this.props.literals.L694}
				</h1>
				<div class="container legal--notice--block">
					<h2 class="title-section main-color" data-ng-bind-html="i18n.accessKeys"></h2>
					<div data-ng-bind-html="i18n.accessKeysText1"></div>
					
					<h3 class="title--card second-color" data-ng-bind-html="i18n.availableAccessKeys"></h3>
					<div data-ng-bind-html="i18n.availableAccessKeysList" class="list--tag--block"></div>
					
					<h3 class="title--card second-color" data-ng-bind-html="i18n.differentWebBrowsers"></h3>
					<div class="tableAccesibility" data-ng-bind-html="i18n.table"></div>
				</div>
			</div>
		)
	}
}

export default Accesibility;