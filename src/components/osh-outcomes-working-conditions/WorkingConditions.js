import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Link } from 'react-router-dom';

class WorkingConditions extends Component
{
	render()
	{
		return(
			<div>
				<section id="not-home-cover" className="advice--icon--block advice--block-not-home background-main-light container-fluid">
					<div className="container horizontal-nopadding">
						<div className="left-text col-md-8 col-sm-8 col-xs-12 nopadding">
							<h1 className="main-color left-text">{this.props.literals.L22013}</h1>
							<p>{this.props.literals.L22056}</p>
							<span>{this.props.literals.L20700}</span>
							<span>{this.props.literals.L20704} </span> 
							<span>
								<Link 
									// ui-sref="about-tool-detail-page({pSection: 'osh-outcomes-working-conditions', pSubsection: 'overall_opinion', pIndicator: '65'})"
									to={"osh-outcomes-working-conditions/overall_opinion/job-satisfaction/AT/0/sector"}>
									{this.props.literals.L20705}
								</Link>
							</span>
						</div>
						<div className="icon--advice working-conditons-icon hide-mobile col-sm-4 col-md-4"></div>
					</div>
				</section>

				<section className="container-fluid background-gray section--page">
					<div className="container">
					<h2 className="title-section second-color">{this.props.literals.L20708}</h2>
					<section className="card--grid xxs-w1 w3 center-text">
						<div className="card--block--rounded">
							<Link className="icon--card overall-opinion-icon" to={"osh-outcomes-working-conditions/overall_opinion/job-satisfaction/AT/0/sector"}
								// ui-sref="overall-opinion({pIndicator:'job-satisfaction', pSplit:'sector', pCountry1:country1,pCountry2:country2})"
							></Link>
							<h3 className="title--card main-color">
								<Link to={"osh-outcomes-working-conditions/overall_opinion/job-satisfaction/AT/0/sector"}
									// ui-sref="overall-opinion({pIndicator:'job-satisfaction', pSplit:'sector', pCountry1:country1,pCountry2:country2})"
								>{this.props.literals.L20709}</Link>
							</h3>
							<p>{this.props.literals.L20577}</p>
							<p className="btn--card--block">
								<Link to={"osh-outcomes-working-conditions/overall_opinion/job-satisfaction/AT/0/sector"}
									// ui-sref="overall-opinion({pIndicator:'job-satisfaction', pSplit:'sector', pCountry1:country1,pCountry2:country2})" 
									className="btn--card main-color">{ReactHtmlParser(this.props.literals.L480)}
								</Link>
							</p>
						</div>
						<div className="card--block--rounded">
							<Link className="icon--card mental-risk-icon" 
								// ui-sref="mental-risk"
								to={"osh-outcomes-working-conditions/mental-risk/time-pressure/esener"}
							></Link>
							<h3 className="title--card main-color">
								<Link to={"osh-outcomes-working-conditions/mental-risk/time-pressure/esener"}
									// ui-sref="mental-risk"
								>{this.props.literals.L20710}</Link>
								</h3>
							<p>{this.props.literals.L20578}</p>
							<p className="btn--card--block">
								<Link to={"osh-outcomes-working-conditions/mental-risk/time-pressure/esener"}
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

export default WorkingConditions;