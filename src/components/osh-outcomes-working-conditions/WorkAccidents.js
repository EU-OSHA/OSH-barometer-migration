import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import Methodology from '../common/Methodology';
import AdviceSection from '../common/AdviceSection';
import Related from '../common/Related.js';
import SelectEconomic from '../common/charts/SelectEconomic';
import WorkAccidentsChart from '../common/charts/WorkAccidentsChart';

class WorkAccidents extends Component
{
	constructor(props) {
		super(props)

		this.state = {
			selectCountry1: this.props.initCountry,
			selectCountry2: '',
			indicatorTabs: [{ literalID: '310' }, { literalID: '311' }],
			selectedTab: '310',
			isSubMenuOpen: false,
		}
	}
	handleSearch = (callbackCountry1) => {
		this.setState({ selectCountry1: callbackCountry1 })
	}

	handleSearch2 = (callbackCountry2) => {
		this.setState({ selectCountry2: callbackCountry2 })
	}

	onClickIndicator = (e, indicator) => {
		e.preventDefault();

		this.setState({ selectedTab: `${indicator}` })
	}

	onClickSubMenu = (e) => {
		e.preventDefault();
		this.setState({ isSubMenuOpen: !this.state.isSubMenuOpen })
	}

	render()
	{
		return(
			<div className="work-accidents">
				<AdviceSection literals={this.props.literals} section={["osh-outcomes-working-conditions","work-accidents"]} />
				<form className="compare--block--form">
				<div className="compare--block work-accidents" >
					<div className="submenu--block container">
						<ul  className={`submenu--items--wrapper ${this.state.isSubMenuOpen ? 'open-list' : ''} `} >
							{this.state.indicatorTabs.map((indicator) => (
								<li onClick={this.onClickSubMenu} key={indicator.literalID} className={`submenu--item ${this.state.selectedTab == indicator.literalID ? 'active' : '' }`} >
									<a 
										className={this.state.selectedTab == indicator.literalID ? 'active' : ''} 
										onClick={(e) => this.onClickIndicator(e, indicator.literalID)} 
										>
										{this.props.literals[`L${indicator.literalID}`]} 
										</a>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className="line background-main-light" />

				{this.state.selectedTab == '310' && (
					<React.Fragment> 
						<ul className="compare--list">
							<SelectEconomic 
								handleSearch={this.handleSearch} 
								handleSearch2={this.handleSearch2} 
								charts={['20022']}
								indicator={'53'}
							/>
						</ul>

						<div className="line background-main-light" />
				</React.Fragment>
				)}

				<div className="container section--page card--grid xxs-w1 xs-w1 w1 center-text">
					<div className="card--block--chart">
						<div className="chart--block">
						{this.state.selectedTab == '310' ? (
							<WorkAccidentsChart 
							title={this.props.literals.L310}
							showDataLabel={true}
							percentage={true}
							type={'line'}
							chart={'20022'}
							indicator={'53'}
							selectedCountry1={this.state.selectCountry1}
							selectedCountry2={this.state.selectCountry2}
							colors={['#f6a400','#cbe2e3','#7b7b7d','#ffe300','#449fa2','#f3c564','#16983e','#003399']}
							/>
						) : (
							<WorkAccidentsChart 
							title={this.props.literals.L22196}
							showDataLabel={true}
							type={'column'}
							chart={'20023'}
							indicator={'54'}
							colors={['#f6a400','#cbe2e3','#7b7b7d','#ffe300','#449fa2','#f3c564','#16983e','#003399']}
							/>
						)}
						</div>
					</div>

					<div className="chart-legend">
						<p>{ this.state.selectedTab == '310' ? this.props.literals.L20565 : ReactHtmlParser(this.props.literals.L20566) }</p>
					</div>
				</div>

			</form>
				<Methodology />

				<Related literals={this.props.literals} section={["osh-outcomes-working-conditions","work-accidents","non-fatal-work-accidents"]} />
		</div>
		)
	}
}

WorkAccidents.displayName = 'WorkAccidents';
export default WorkAccidents;