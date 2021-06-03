import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';

import fullReportIcon from '../../style/img/full-report-icon.png';

//Generic Information
import AuthoritiesReport from './country-report-sections/AuthoritiesReport';
import WorkforceProfileReport from './country-report-sections/WorkforceProfileReport';

// Steering of OSH
import SocialDialogueReport from './country-report-sections/SocialDialogueReport';

// OSH Outcomes and working conditions
import HealthPerceptionReport from './country-report-sections/HealthPerceptionReport';

//OSH Infrastructure
import StatisticsReport from './country-report-sections/StatisticsReport';

class CountryReport extends Component
{
	constructor(props)
	{
		super(props);

		this.state = {
			selectedCountryCode: 'AT',
			selectedCountryName: 39
		}
	}

	changeCountry = (event) =>
	{
		this.setState({ selectedCountryCode: event.target.value });
	}

	render()
	{
		return(
			<div className="full-country-report-page">
				<div className="header-logo"></div>
				<table className="full-content-report">
					<thead>
						<tr>
							<td>
								<div className="page-header-space"></div>
							</td>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								<section className="cover-page">
									<div className="content-cover">
										<div className="icon-full-report">
											<img src={fullReportIcon} />
										</div>
										<h1>{this.props.literals.L22020}</h1>
										<h2>{this.props.literals[`L${this.state.selectedCountryName}`]}</h2>
										{/* -- FILTERS -- */}
										<form>
											<label htmlFor="report-country">Select one country</label>
											<select id="report-country" onChange={this.changeCountry} value={this.state.selectedCountryCode}>
												<option value="AT">(AT) Austria</option>
												<option value="BE">(BE) Belgium</option>
												<option value="BG">(BG) Bulgaria</option>
												<option value="CH">(CH) Switzerland</option>
												<option value="CY">(CY) Cyprus</option>
												<option value="CZ">(CZ) Czechia</option>
												<option value="DE">(DE) Germany</option>
												<option value="DK">(DK) Denmark</option>
												<option value="EE">(EE) Estonia</option>
												<option value="EL">(EL) Greece</option>
												<option value="ES">(ES) Spain</option>
												<option value="FI">(FI) Finland</option>
												<option value="FR">(FR) France</option>
												<option value="HR">(HR) Croatia</option>
												<option value="HU">(HU) Hungary</option>
												<option value="IE">(IE) Ireland</option>
												<option value="IS">(IS) Iceland</option>
												<option value="IT">(IT) Italy</option>
												<option value="LT">(LT) Lithuania</option>
												<option value="LU">(LU) Luxembourg</option>
												<option value="LV">(LV) Latvia</option>
												<option value="MT">(MT) Malta</option>
												<option value="NL">(NL) Netherlands</option>
												<option value="NO">(NO) Norway</option>
												<option value="PL">(PL) Poland</option>
												<option value="PT">(PT) Portugal</option>
												<option value="RO">(RO) Romania</option>
												<option value="SE">(SE) Sweden</option>
												<option value="SI">(SI) Slovenia</option>
												<option value="SK">(SK) Slovakia</option>
											</select>
										</form>
										<h3>Country Report</h3>
									</div>
								</section>
								<section className="index-page">
									<div className="title-page">
										<h2>{this.props.literals[`L${this.state.selectedCountryName}`]}</h2>
										<h3>Country Report Index</h3>
									</div>
									<p>This document contains the OSH Barometer Country Report Summary of {this.props.literals[`L${this.state.selectedCountryName}`]}</p>
									<div className="index">
										<ul className="index-list">
											<li className="main-item">
												<span>{this.props.literals.L20719}</span>
												<ul>
													<li>{this.props.literals.L22120}</li>
												</ul>
											</li>
											<li className="main-item">
												<span>{this.props.literals.L22001}</span>
												<ul>
													<li>{this.props.literals.L22002}</li>
													<li>{this.props.literals.L22003}</li>
													<li>{this.props.literals.L22004}</li>
												</ul>
											</li>
											<li className="main-item">
												<span>{this.props.literals.L22005}</span>
												<ul>
													<li>{this.props.literals.L22007}</li>
													<li>{this.props.literals.L22008}</li>
												</ul>
											</li>
											<li className="main-item">
												<span>{this.props.literals.L22009}</span>
												<ul>
													<li>{this.props.literals.L22010}</li>
													<li>{this.props.literals.L22011}</li>
													<li>{this.props.literals.L22012}</li>
													<li>{this.props.literals.L22013}</li>
													<li>{this.props.literals.L22014}</li>
													<li>{this.props.literals.L22015}</li>
												</ul>
											</li>
											<li className="main-item">
												<span>{this.props.literals.L22016}</span>
												<ul>
													<li>{this.props.literals.L22017}</li>
													<li>{this.props.literals.L22018}</li>
												</ul>
											</li>
										</ul>
									</div>
								</section>
								<section className="introduction-page">
									<div className="title-page">
										<h2>{this.props.literals.L20719}</h2>
										<h3>{this.props.literals.L22120}</h3>
									</div>
									<div className="content-page-about-tool-content">
										{ReactHtmlParser(this.props.literals.L20737)}
									</div>
								</section>
								{/* -- OSH AUTHORITIES -- */}
								<section className={"osh-authorities "+this.state.selectedCountryCode}>
									<div className="title-page">
										<h2>{this.props.literals.L22001}</h2>
										<h3>{this.props.literals.L22002}</h3>
									</div>
									<div className="intro-page">
										<p>{this.props.literals.L22025}</p>
										<span>{this.props.literals.L20704}</span>
										<span><Link to="about-the-system/methodology">{this.props.literals.L20705}</Link></span>
									</div>
									<div className="content-page">
										<AuthoritiesReport country={this.state.selectedCountryCode} literals={this.props.literals}/>
									</div>
								</section>
								{/* -- ECONOMIC AND SECTOR PROFILE -- */}
								<section className={"economic-sector-profile indicator1 "+this.state.selectedCountryCode}>
									<div className="title-page">
										<h2>{this.props.literals.L22001}</h2>
										<h3>{this.props.literals.L22003}</h3>
									</div>
									<div className="intro-page">
										<div>{ReactHtmlParser(this.props.literals.L22028)}</div>
										<span>{this.props.literals.L20696} {this.props.literals.L20704}</span>
										<span><Link to="about-the-system/methodology">{this.props.literals.L20705}</Link></span>
									</div>
									<div className="content-page">
										TODO - Add the charts and the tables for Economic Sector Profile
										{/* Company Size */}
										{/* Activity Sector */}
										{/* Create a functional component in order to create the table, so it can be reused by other charts and sections */}
									</div>
								</section>
								<section className={"economic-sector-profile indicator2 "+this.state.selectedCountryCode}>
									<div className="content-page">
										{/* Employment Rate */}
										{/* GDP per Capita */}
										{/* GDP per Capita EURO */}
										{/* Income per Capita */}
										{/* Income per Capita EURO */}
									</div>
								</section>
								{/* -- WORKFORCE PROFILE -- */}
								<section className={"workforce-profile "+this.state.selectedCountryCode}>
									<div className="title-page">
										<h2>{this.props.literals.L22001}</h2>
										<h3>{this.props.literals.L22004}</h3>
									</div>
									<div className="intro-page">
										<div>{ReactHtmlParser(this.props.literals.L22030)}</div>
										<span>{this.props.literals.L20696} {this.props.literals.L20704}</span>
										<span><Link to="about-the-system/methodology">{this.props.literals.L20705}</Link></span>
									</div>
									<WorkforceProfileReport literals={this.props.literals} country={this.state.selectedCountryCode} />
								</section>
								{/* -- NATIONAL STRATEGIES -- */}
								<section className={"national-strategies "+this.state.selectedCountryCode}>
									<div className="title-page">
										<h2>{this.props.literals.L22005}</h2>
										<h3>{this.props.literals.L22007}</h3>
									</div>
									<div className="intro-page">
										<p>{this.props.literals.L22038}</p>
										<span>{this.props.literals.L20704}</span>
										<span><Link to="about-the-system/methodology">{this.props.literals.L20705}</Link></span>
									</div>
									{/* TODO -- Add the data for the current country in National Startegies */}
								</section>
								{/* -- SOCIAL DIALOGUE -- */}
								<section className={"social-dialogue "+this.state.selectedCountryCode}>
									<div className="title-page">
										<h2>{this.props.literals.L22005}</h2>
										<h3>{this.props.literals.L22008}</h3>
									</div>
									<div className="intro-page">
										<p>{this.props.literals.L22041}</p>
										<span>{this.props.literals.L20704}</span>
										<span><Link to="about-the-system/methodology">{this.props.literals.L20705}</Link></span>
									</div>
									<SocialDialogueReport literals={this.props.literals} country={this.state.selectedCountryCode} />
								</section>
								{/* -- WORK ACCIDENTS -- */}
								<section className={"work-accidents "+this.state.selectedCountryCode}>
									<div className="title-page">
										<h2>{this.props.literals.L22009}</h2>
										<h3>{this.props.literals.L22010}</h3>
									</div>
									<div className="intro-page">
										<p>{this.props.literals.L22050}</p>
										<span>{this.props.literals.L20704}</span>
										<span><Link to="about-the-system/methodology">{this.props.literals.L20705}</Link></span>
									</div>
									{/* TODO -- Add the charts for Work Accidents */}
								</section>
								{/* -- HEALTH PERCEPTION -- */}
								<section className={"health-perception "+this.state.selectedCountryCode}>
									<div className="title-page multiline">
										<h2>{this.props.literals.L22009}</h2>
										<h3>{this.props.literals.L22011}</h3>
									</div>
									<div className="intro-page">
										<p>{this.props.literals.L22052}</p>
										<span>{this.props.literals.L20704}</span>
										<span><Link to="about-the-system/methodology">{this.props.literals.L20705}</Link></span>
									</div>
									<HealthPerceptionReport literals={this.props.literals} country={this.state.selectedCountryCode} />
								</section>
								{/* -- OSH CULTURE -- */}
								<section className={"osh-culture "+this.state.selectedCountryCode}>
									<div className="title-page multiline">
										<h2>{this.props.literals.L22009}</h2>
										<h3>{this.props.literals.L22012}</h3>
									</div>
									<div className="intro-page">
										<p>{this.props.literals.L22054}</p>
										<span>{this.props.literals.L20700}</span>
										<span>{this.props.literals.L20704}</span>
										<span><Link to="about-the-system/methodology">{this.props.literals.L20705}</Link></span>
									</div>
									{/* TODO -- Add the charts for OSH Culture */}
								</section>
								{/* -- WORKING CONDITIONS - OVERALL OPINION -- */}
								<section className={"working-conditions overall-opinion "+this.state.selectedCountryCode}>
									<div className="title-page multiline">
										<h2>{this.props.literals.L22009}</h2>
										<h3>{this.props.literals.L22013}</h3>
									</div>
									<div className="intro-page">
										<p>{this.props.literals.L22054}</p>
										<span>{this.props.literals.L20700}</span>
										<span>{this.props.literals.L20704}</span>
										<span><Link to="about-the-system/methodology">{this.props.literals.L20705}</Link></span>
									</div>
									<h4 className="header3">{this.props.literals.L20709}</h4>
									<p>{this.props.literals.L20577}</p>
									<span>{this.props.literals.L20704}</span>
									<span><Link to="about-the-system/methodology">{this.props.literals.L20705}</Link></span>
									{/* TODO -- Add the charts for Overall Opinion */}
								</section>
								{/* -- WORKING CONDITIONS - MENTAL RISK */}
								<section className={"working-conditions mental-risk "+this.state.selectedCountryCode}>
									<h4 className="header3">{this.props.literals.L20710}</h4>
									<p>{this.props.literals.L20578}</p>
									<p>
										<span>{this.props.literals.L20700}</span>
										<span>{this.props.literals.L20704}</span>
										<span><Link to="about-the-system/methodology">{this.props.literals.L20705}</Link></span>
									</p>
									{/* TODO -- Add the charts for Mental Risks */}
								</section>
								{/* -- WORKING CONDITIONS - PHYSICAL RISK */}
								<section className={"working-conditions physical-risk "+this.state.selectedCountryCode}>
									<div className="intro-page">
										<h4 className="header3">{this.props.literals.L20711}</h4>
										<p>{this.props.literals.L20579}</p>
										<p>
											<span>{this.props.literals.L20700}</span>
											<span>{this.props.literals.L20704}</span>
											<span><Link to="about-the-system/methodology">{this.props.literals.L20705}</Link></span>
										</p>
									</div>
									{/* TODO -- Add the charts for Physical Risks */}
								</section>
								{/* -- PREVENTION IN COMPANIES */}
								<section className={"prevention-in-companies "+this.state.selectedCountryCode}>
									<div className="title-page wrap">
										<h2>{this.props.literals.L22009}</h2>
										<h3>{this.props.literals.L22014}</h3>
									</div>
									<div className="intro-page">
										<p>{this.props.literals.L22058}</p>
										<span>{this.props.literals.L20702}</span>
										<span>{this.props.literals.L20704}</span>
										<span><Link to="about-the-system/methodology">{this.props.literals.L20705}</Link></span>
									</div>
									{/* TODO -- Add the charts for Prevention in Companies */}
								</section>
								{/* -- WORKER INVOLVEMENT */}
								<section className={"worker-involvement "+this.state.selectedCountryCode}>
									<div className="title-page wrap multiline">
										<h2>{this.props.literals.L22009}</h2>
										<h3>{this.props.literals.L22015}</h3>
									</div>
									<div className="intro-page">
										<p>{this.props.literals.L22060}</p>
										<span>{this.props.literals.L20700}</span>
										<span>{this.props.literals.L20704}</span>
										<span><Link to="about-the-system/methodology">{this.props.literals.L20705}</Link></span>
									</div>
									<h4 className="header3">{this.props.literals.L22015}</h4>
									{/* TODO -- Add the charts for Worker involvement */}
								</section>
								{/* -- ENFORCEMENT CAPACITY */}
								<section className={"enforcement-capacity "+this.state.selectedCountryCode}>
									<div className="title-page wrap">
										<h2>{this.props.literals.L22016}</h2>
										<h3>{this.props.literals.L22017}</h3>
									</div>
									<div className="intro-page">
										<p>{this.props.literals.L22063}</p>
										<p>{ReactHtmlParser(this.props.literals.L20699)}</p>
										<span>{this.props.literals.L20704}</span>
										<span><Link to="about-the-system/methodology">{this.props.literals.L20705}</Link></span>
									</div>
									{/* TODO -- Add the data for Enforcement Capacity */}
								</section>
								{/* -- OSH-STATISTICS -- */}
								<section className={"enforcement-capacity "+this.state.selectedCountryCode}>
									<div className="title-page wrap">
										<h2>{this.props.literals.L22016}</h2>
										<h3>{this.props.literals.L22018}</h3>
									</div>
									<div className="intro-page">
										<p>{this.props.literals.L22065}</p>
										<span>{this.props.literals.L20704}</span>
										<span><Link to="about-the-system/methodology">{this.props.literals.L20705}</Link></span>
									</div>
									<div className="content-page">
										<StatisticsReport country={this.state.selectedCountryCode} literals={this.props.literals} />								
									</div>
								</section>
							</td>
						</tr>
					</tbody>
					<tfoot>
						<tr>
							<td>
								<div className="page-footer-space" />
							</td>
						</tr>
					</tfoot>
				</table>
				<p className="footer-pdf">
					<span>Santiago de Compostela 12, 5th floor - 48003 Bilbao × Spain</span>
            		<span>Tel. +34 944 358 400 × Fax +34 944 358 401 </span>
            		<span>information@osha.europa.eu - <a href="http://osha.europa.eu" target="_blank">http://osha.europa.eu</a></span>
				</p>
			</div>
		)
	}
}
CountryReport.displayName='CountryReport';
export default CountryReport;