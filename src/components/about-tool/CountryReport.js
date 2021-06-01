import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';

import fullReportIcon from '../../style/img/full-report-icon.png';

class CountryReport extends Component
{
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
										<h2>TODO {/* -- TODO: REPLACE WITH CURRENT COUNTRY NAME --*/}</h2>
										{/* -- FILTERS -- */}
										<form>
											<label for="report-country">Select one country</label>
											{/* -- SELECT WITH THE DIFFERENT COUNTRIES -- */}
										</form>
										<h3>Country Report</h3>
									</div>
								</section>
								<section className="index-page">
									<div className="title-page">
										<h2>TODO {/* -- TODO: REPLACE WITH CURRENT COUNTRY NAME --*/}</h2>
										<h3>Country Report Index</h3>
									</div>
									<p>This document contains the OSH Barometer Country Report Summary of <span>TODO{/*-- TODO: REPLACE WITH CURRENT COUNTRY NAME -- */}</span></p>
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
								<section className="osh-authorities TODO(Add country as Class)">
									<div className="title-page">
										<h2>{this.props.literals.L22001}</h2>
										<h3>{this.props.literals.L22002}</h3>
									</div>
									<div className="intro-page">
										<p>{this.props.literals.L22025}</p>
										<span>{this.props.literals.L20704}</span>
										<span>{this.props.literals.L20705} TODO - Add link to methodology with the OSH Authorities Section selected</span>
									</div>
									<div className="content-page">
										TODO - Add the content of the OSH Authorities page for the current country
									</div>
								</section>
								{/* -- ECONOMIC AND SECTOR PROFILE -- */}
								<section className="economic-sector-profile indicator1 TODO(Add country as Class)">
									<div className="title-page">
										<h2>{this.props.literals.L22001}</h2>
										<h3>{this.props.literals.L22003}</h3>
									</div>
									<div className="intro-page">
										<div>{ReactHtmlParser(this.props.literals.L22028)}</div>
										<span>{this.props.literals.L20696} {this.props.literals.L20704}</span>
										<span>{this.props.literals.L20705} TODO - Add link to methodology with the Economic Sector Profile Section selected</span>
									</div>
									<div className="content-page">
										TODO - Add the charts and the tables for Economic Sector Profile
										{/* Company Size */}
										{/* Activity Sector */}
										{/* Create a functional component in order to create the table, so it can be reused by other charts and sections */}
									</div>
								</section>
								<section className="economic-sector-profile indicator2 TODO(Add country as Class)">
									<div className="content-page">
										{/* Employment Rate */}
										{/* GDP per Capita */}
										{/* GDP per Capita EURO */}
										{/* Income per Capita */}
										{/* Income per Capita EURO */}
									</div>
								</section>
								{/* -- WORKFORCE PROFILE -- */}
								<section className="workforce-profile TODO(Add country as Class)">
									<div className="title-page">
										<h2>{this.props.literals.L22001}</h2>
										<h3>{this.props.literals.L22004}</h3>
									</div>
									<div className="intro-page">
										<div>{ReactHtmlParser(this.props.literals.L22030)}</div>
										<span>{this.props.literals.L20696} {this.props.literals.L20704}</span>
										<span>{this.props.literals.L20705} TODO - Add link to methodology with the Workforce Profile Section selected</span>
									</div>
									{/* TODO -- Add a table with the data for the current country and EU27_2020 in Workforce Profile */}
								</section>
								{/* -- NATIONAL STRATEGIES -- */}
								<section className="national-strategies TODO(Add country as Class)">
									<div className="title-page">
										<h2>{this.props.literals.L22005}</h2>
										<h3>{this.props.literals.L22007}</h3>
									</div>
									<div className="intro-page">
										<p>{this.props.literals.L22038}</p>
										<span>{this.props.literals.L20704}</span>
										<span>{this.props.literals.L20705} TODO - Add link to methodology with the National Strategies Section selected</span>
									</div>
									{/* TODO -- Add the data for the current country in National Startegies */}
								</section>
								{/* -- SOCIAL DIALOGUE -- */}
								<section className="social-dialogue TODO(Add country as Class)">
									<div className="title-page">
										<h2>{this.props.literals.L22005}</h2>
										<h3>{this.props.literals.L22008}</h3>
									</div>
									<div className="intro-page">
										<p>{this.props.literals.L22041}</p>
										<span>{this.props.literals.L20704}</span>
										<span>{this.props.literals.L20705} TODO - Add link to methodology with the Social Dialogue Section selected</span>
									</div>
									{/* TODO -- Add the data for the current country in Social Dialogue */}
								</section>
								{/* -- WORK ACCIDENTS -- */}
								<section className="work-accidents TODO(Add country as Class)">
									<div className="title-page">
										<h2>{this.props.literals.L22009}</h2>
										<h3>{this.props.literals.L22010}</h3>
									</div>
									<div className="intro-page">
										<p>{this.props.literals.L22050}</p>
										<span>{this.props.literals.L20704}</span>
										<span>{this.props.literals.L20705} TODO - Add link to methodology with the Work Accidents Section selected</span>
									</div>
									{/* TODO -- Add the charts for Work Accidents */}
								</section>
								{/* -- HEALTH PERCEPTION -- */}
								<section className="health-perception TODO(Add country as Class)">
									<div className="title-page multiline">
										<h2>{this.props.literals.L22009}</h2>
										<h3>{this.props.literals.L22011}</h3>
									</div>
									<div className="intro-page">
										<p>{this.props.literals.L22052}</p>
										<span>{this.props.literals.L20704}</span>
										<span>{this.props.literals.L20705} TODO - Add link to methodology with the Work Accidents Section selected</span>
									</div>
									{/* TODO -- Add the data for Health Perception */}
								</section>
								{/* -- OSH CULTURE -- */}
								<section className="osh-culture TODO(Add country as Class)">
									<div className="title-page multiline">
										<h2>{this.props.literals.L22009}</h2>
										<h3>{this.props.literals.L22012}</h3>
									</div>
									<div className="intro-page">
										<p>{this.props.literals.L22054}</p>
										<span>{this.props.literals.L20700}</span>
										<span>{this.props.literals.L20704}</span>
										<span>{this.props.literals.L20705} TODO - Add link to methodology with the Work Accidents Section selected</span>
									</div>
									{/* TODO -- Add the charts for OSH Culture */}
								</section>
								{/* -- WORKING CONDITIONS - OVERALL OPINION -- */}
								<section className="working-conditions overall-opinion TODO(Add country as Class)">
									<div className="title-page multiline">
										<h2>{this.props.literals.L22009}</h2>
										<h3>{this.props.literals.L22013}</h3>
									</div>
									<div className="intro-page">
										<p>{this.props.literals.L22054}</p>
										<span>{this.props.literals.L20700}</span>
										<span>{this.props.literals.L20704}</span>
										<span>{this.props.literals.L20705} TODO - Add link to methodology with the Work Accidents Section selected</span>
									</div>
									<h4 className="header3">{this.props.literals.L20709}</h4>
									<p>{this.props.literals.L20577}</p>
									<span>{this.props.literals.L20704}</span>
									<span>{this.props.literals.L20705} TODO - Add link to methodology with the Work Accidents Section selected</span>
									{/* TODO -- Add the charts for Overall Opinion */}
								</section>
								{/* -- WORKING CONDITIONS - MENTAL RISK */}
								<section className="working-conditions mental-risk TODO(Add country as Class)">
									<h4 className="header3">{this.props.literals.L20710}</h4>
									<p>{this.props.literals.L20578}</p>
									<p>
										<span>{this.props.literals.L20700}</span>
										<span>{this.props.literals.L20704}</span>
										<span>{this.props.literals.L20705} TODO - Add link to methodology with the Work Accidents Section selected</span>
									</p>
									{/* TODO -- Add the charts for Mental Risks */}
								</section>
								{/* -- WORKING CONDITIONS - PHYSICAL RISK */}
								<section className="working-conditions physical-risk TODO(Add country as Class)">
									<div className="intro-page">
										<h4 className="header3">{this.props.literals.L20711}</h4>
										<p>{this.props.literals.L20579}</p>
										<p>
											<span>{this.props.literals.L20700}</span>
											<span>{this.props.literals.L20704}</span>
											<span>{this.props.literals.L20705} TODO - Add link to methodology with the Work Accidents Section selected</span>
										</p>
									</div>
									{/* TODO -- Add the charts for Physical Risks */}
								</section>
								{/* -- PREVENTION IN COMPANIES */}
								<section className="prevention-in-companies TODO(Add country as Class)">
									<div className="title-page wrap">
										<h2>{this.props.literals.L22009}</h2>
										<h3>{this.props.literals.L22014}</h3>
									</div>
									<div className="intro-page">
										<p>{this.props.literals.L22058}</p>
										<span>{this.props.literals.L20702}</span>
										<span>{this.props.literals.L20704}</span>
										<span>{this.props.literals.L20705} TODO - Add link to methodology with the Work Accidents Section selected</span>
									</div>
									{/* TODO -- Add the charts for Prevention in Companies */}
								</section>
								{/* -- WORKER INVOLVEMENT */}
								<section className="worker-involvement TODO(Add country as Class)">
									<div className="title-page wrap multiline">
										<h2>{this.props.literals.L22009}</h2>
										<h3>{this.props.literals.L22015}</h3>
									</div>
									<div className="intro-page">
										<p>{this.props.literals.L22060}</p>
										<span>{this.props.literals.L20700}</span>
										<span>{this.props.literals.L20704}</span>
										<span>{this.props.literals.L20705} TODO - Add link to methodology with the Work Accidents Section selected</span>
									</div>
									<h4 className="header3">{this.props.literals.L22015}</h4>
									{/* TODO -- Add the charts for Worker involvement */}
								</section>
								{/* -- ENFORCEMENT CAPACITY */}
								<section className="enforcement-capacity TODO(Add country as Class)">
									<div className="title-page wrap">
										<h2>{this.props.literals.L22016}</h2>
										<h3>{this.props.literals.L22017}</h3>
									</div>
									<div className="intro-page">
										<p>{this.props.literals.L22063}</p>
										<p>{ReactHtmlParser(this.props.literals.L20699)}</p>
										<span>{this.props.literals.L20704}</span>
										<span>{this.props.literals.L20705} TODO - Add link to methodology with the Work Accidents Section selected</span>
									</div>
									{/* TODO -- Add the data for Enforcement Capacity */}
								</section>
								{/* -- OSH-STATISTICS -- */}
								<section className="enforcement-capacity TODO(Add country as Class)">
									<div className="title-page wrap">
										<h2>{this.props.literals.L22016}</h2>
										<h3>{this.props.literals.L22018}</h3>
									</div>
									<div className="intro-page">
										<p>{this.props.literals.L22065}</p>
										<span>{this.props.literals.L20704}</span>
										<span>{this.props.literals.L20705} TODO - Add link to methodology with the Work Accidents Section selected</span>
									</div>
									<div className="content-page">
										{/* TODO -- Add the data for OSH Statistics */}										
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