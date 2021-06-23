import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ReactHtmlParser from 'react-html-parser';


class GeneralInformation extends Component
{
	componentDidMount()
	{
		// Update the title of the page
		document.title = this.props.literals.L22019 +  " - " + this.props.literals.L22020 + " - " + this.props.literals.L363;
	}

	render()
	{
		return(
			<div className="about-tool">
				<div className="container">
					<h1 className="title-section second-color text-center">{this.props.literals.L22019}</h1>
					<h2>{this.props.literals.L20735}</h2>
					<section className="about-tool-content">
						{ReactHtmlParser(this.props.literals.L20737)}
					</section>
					<p className="btn--wrapper text-center">
						<Link className="btn-default btn-main-color text-center" to={'/about-the-system/methodology'} >{this.props.literals.L20736}</Link>
					</p>
				</div>
			</div>
		)
	}
}

GeneralInformation.displayName = 'GeneralInformation';
export default GeneralInformation;