import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Link } from 'react-router-dom';


class Sitemap extends Component
{
	render()
	{
		return(
			<div>
				<h1 class="title-section second-color ng-binding text-center">{this.props.literals.L356}</h1>
				<section class="container site--map--block" >
					<ul>
						<li ng-repeat="level0 in structure">
							<a role="button" ng-if="!level0.levels && level0.id != 'home'" ui-sref='{{ level0.sref }}({pLanguage: pLanguage})' data-ng-bind-html="i18n_literals[level0.name]"></a> 
							<a role="button" ng-if="!level0.levels && level0.id == 'home'" ui-sref='{{ level0.sref }}({pLanguage: pLanguage})' data-ng-bind-html="i18n_literals[level0.name]"></a>
							<span ng-if="!!level0.levels && level0.id != 'home'" data-ng-bind-html="i18n_literals[level0.name]"></span>
							<ul ng-if="level0.levels">
								<li ng-repeat="level1 in level0.levels">
									<a ng-if="level1.target" data-ng-bind-html="i18n_literals[level1.name]"></a>
									<a ng-if="level1.sref" ui-sref='{{ level1.sref }}({pLanguage: pLanguage, pIndicator: level1.indicator})' data-ng-bind-html="i18n_literals[level1.name]"></a>
								</li>
							</ul>
						</li>
						<li>
							<a ui-sref="site-map({pLanguage: pLanguage})">
							{ReactHtmlParser(this.props.literals.L356)}
							</a>
						</li>
						<li>
							<a target="_blank" href="https://osha.europa.eu/{{pLanguage}}/contact-us">
							{ReactHtmlParser(this.props.literals.L357)}
							</a>
						</li>
						<li>
							<a ui-sref='accessibility({pLanguage: pLanguage})'>
							{ReactHtmlParser(this.props.literals.L358)}
							</a>
						</li>
						<li>
							<a ui-sref="privacy-policy({pLanguage: pLanguage})">
							{ReactHtmlParser(this.props.literals.L359)}
							</a>
						</li>
						<li>
						<a ui-sref='legal-notice({pLanguage: pLanguage})'>
							{ReactHtmlParser(this.props.literals.L360)}
						</a>
						</li>
					</ul>
				</section>
			</div>
		)
	}
}

export default Sitemap;