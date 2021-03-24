import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Link } from 'react-router-dom';


class Sitemap extends Component
{
	render()
	{
		return(
			<div>
				<h1 className="title-section second-color ng-binding text-center">{this.props.literals.L356}</h1>
				<section className="container site--map--block" >
					<ul>
						<li ng-repeat="level0 in structure">
							<Link role="button" ng-if="!level0.levels && level0.id != 'home'" to='{{ level0.sref }}({pLanguage: pLanguage})' data-ng-bind-html="i18n_literals[level0.name]"></Link> 
							<Link role="button" ng-if="!level0.levels && level0.id == 'home'" to='{{ level0.sref }}({pLanguage: pLanguage})' data-ng-bind-html="i18n_literals[level0.name]"></Link>
							<span ng-if="!!level0.levels && level0.id != 'home'" data-ng-bind-html="i18n_literals[level0.name]"></span>
							<ul ng-if="level0.levels">
								<li ng-repeat="level1 in level0.levels">
									<Link ng-if="level1.target" data-ng-bind-html="i18n_literals[level1.name]"></Link>
									<Link ng-if="level1.sref" to='{{ level1.sref }}({pLanguage: pLanguage, pIndicator: level1.indicator})' data-ng-bind-html="i18n_literals[level1.name]"></Link>
								</li>
							</ul>
						</li>
						<li>
							<Link to="site-map">
							{ReactHtmlParser(this.props.literals.L356)}
							</Link>
						</li>
						<li>
							<Link target="_blank" href="https://osha.europa.eu/{{pLanguage}}/contact-us">
							{ReactHtmlParser(this.props.literals.L357)}
							</Link>
						</li>
						<li>
							<Link to='accessibility'>
							{ReactHtmlParser(this.props.literals.L358)}
							</Link>
						</li>
						<li>
							<Link to="privacy-policy">
							{ReactHtmlParser(this.props.literals.L359)}
							</Link>
						</li>
						<li>
						<Link to='/legal-notice'>
							{ReactHtmlParser(this.props.literals.L360)}
						</Link>
						</li>
					</ul>
				</section>
			</div>
		)
	}
}
Sitemap.displayName = 'Sitemap';
export default Sitemap;