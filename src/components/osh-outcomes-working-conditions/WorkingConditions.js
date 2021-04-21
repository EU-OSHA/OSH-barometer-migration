import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Link } from 'react-router-dom';
import AdviceSection from '../common/AdviceSection';

class WorkingConditions extends Component
{
	componentDidMount()
	{
		// Update the title of the page
		document.title = this.props.literals.L22013 +  " - " + this.props.literals.L22020 + " - " + this.props.literals.L363;
	}

	render()
	{
		return(
			<div className="working-conditions">
				<AdviceSection literals={this.props.literals} section={["osh-outcomes-working-conditions","working-conditions"]} />

				<section className="container-fluid background-gray section--page">
					<div className="container">
					<h2 className="title-section second-color">{this.props.literals.L20708}</h2>
					<section className="card--grid xxs-w1 w3 center-text">
						<div className="card--block--rounded">
							<Link className="icon--card overall-opinion-icon" to={"/osh-outcomes-working-conditions/overall-opinion/job-satisfaction/"}
								 // ui-sref="overall-opinion({pIndicator:'job-satisfaction', pSplit:'sector', pCountry1:country1,pCountry2:country2})"
							></Link>
							<h3 className="title--card main-color">
								<Link to={"/osh-outcomes-working-conditions/overall-opinion/job-satisfaction/"}
									// ui-sref="overall-opinion({pIndicator:'job-satisfaction', pSplit:'sector', pCountry1:country1,pCountry2:country2})"
								>{this.props.literals.L20709}</Link>
							</h3>
							<p>{this.props.literals.L20577}</p>
							<p className="btn--card--block">
								<Link to={"/osh-outcomes-working-conditions/overall-opinion/job-satisfaction/"}
									// ui-sref="overall-opinion({pIndicator:'job-satisfaction', pSplit:'sector', pCountry1:country1,pCountry2:country2})" 
									className="btn--card main-color">{ReactHtmlParser(this.props.literals.L480)}
								</Link>
							</p>
						</div>
						<div className="card--block--rounded">
							<Link className="icon--card mental-risk-icon" 
								// ui-sref="mental-risk"
								to={"/osh-outcomes-working-conditions/mental-risk/time-pressure/esener"}
							></Link>
							<h3 className="title--card main-color">
								<Link to={"/osh-outcomes-working-conditions/mental-risk/time-pressure/esener"}
									// ui-sref="mental-risk"
								>{this.props.literals.L20710}</Link>
								</h3>
							<p>{this.props.literals.L20578}</p>
							<p className="btn--card--block">
								<Link to={"/osh-outcomes-working-conditions/mental-risk/time-pressure/esener"}
									// ui-sref="mental-risk" 
									className="btn--card main-color">
									{ReactHtmlParser(this.props.literals.L480)}
								</Link>
							</p>
						</div>
						<div className="card--block--rounded">
							<Link className="icon--card physical-risk-icon" to={"osh-outcomes-working-conditions/working-conditions/physical-risk-vibrations-loud-noise-and-temperature/AT/0"}
								// ui-sref="physical-risk-vibrations-loud-noise-and-temperature({pIndicator: 'vibrations-loud-noise-and-temperature', pCountry1:country1, pCountry2: country2})"
							></Link>
							<h3 className="title--card main-color">
								<Link to={"osh-outcomes-working-conditions/working-conditions/physical-risk-vibrations-loud-noise-and-temperature/AT/0"}
									// ui-sref="physical-risk-vibrations-loud-noise-and-temperature({pIndicator: 'vibrations-loud-noise-and-temperature', pCountry1:country1, pCountry2: country2})"
								>{this.props.literals.L20711}</Link></h3>
							<p>{this.props.literals.L20579}</p>
							<p className="btn--card--block">
								<Link to={"osh-outcomes-working-conditions/working-conditions/physical-risk-vibrations-loud-noise-and-temperature/AT/0"}
									// ui-sref="physical-risk-vibrations-loud-noise-and-temperature({pIndicator: 'vibrations-loud-noise-and-temperature', pCountry1:country1, pCountry2: country2})" 
									className="btn--card main-color">
									{ReactHtmlParser(this.props.literals.L480)}
								</Link>
							</p>
						</div>
					</section>
					</div>

				</section>
			</div>
		)
	}
}
WorkingConditions.displayName = 'WorkingConditions';
export default WorkingConditions;