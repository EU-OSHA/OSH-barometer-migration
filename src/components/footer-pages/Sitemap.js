import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Link } from 'react-router-dom';

const menu = require('../../model/menu.json');


class Sitemap extends Component
{
	constructor(props)
	{
		super(props);
		console.log('props', props);
		
		this.state = {
            menu: menu
        }
	}

	firstLevelElement(pElement) 
	{
		if (!pElement.levels)
		{
			if (pElement.id=='home')
			{
				return (
					<Link to={pElement.link}>{ReactHtmlParser(pElement.name)}</Link>
				)	
			}
			else
			{
				return (<Link to={pElement.link}>{this.props.literals[pElement.name]}</Link>)
			}
			
		}
		else
		{
			return [
				<span>{this.props.literals[pElement.name]}</span>,
				<ul>
					{pElement.levels.filter(level=>level.link!=undefined).map((level, i)=>
						<li key={'level-'+i}>
							<Link to={level.link}>{this.props.literals[level.name]}</Link>
						</li>
					)}
				</ul>
			]
		}
	}

	render()
	{
		return(
			<div className="mainBody">
				<h1 className="title-section second-color ng-binding text-center">{this.props.literals.L356}</h1>
				<section className="container site--map--block" >
					<ul>
						{this.state.menu.map((element, i) => 
							<li key={'element-'+i}>
								{this.firstLevelElement(element)}
							</li>
						)}
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
							<Link to="privacy-notice">
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