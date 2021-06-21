import React, { Component, Fragment } from 'react';
import { getMethodologyIndicators, getMethodologyData } from '../../api';
import ReactHtmlParser from 'html-react-parser';
import { connect } from 'react-redux';
import { setMethodology } from '../../actions/';

import menuStructure from '../../model/menu.json';
import adviceSection from '../../model/adviceSection.json';

class Methodology extends Component {

	constructor(props)
	{
		super(props);

		this.state = {
			indicators: [],
			sections: [
				{
					id: 'generic-information', 
					name: 'L22001',
					firstSubsection: 'OSH authorities',
					firstIndicatorId: '27'
				},
				{
					id: 'osh-steering', 
					name: 'L22005',
					firstSubsection: 'Structure of each National strategy',
					firstIndicatorId: '46'
				},
				{
					id: 'osh-outcomes-working-conditions', 
					name: 'L22009',
					firstSubsection: 'Work accidents',
					firstIndicatorId: '53'
				},
				{
					id: 'osh-infrastructure', 
					name: 'L22016',
					firstSubsection: 'Enforcement capacity',
					firstIndicatorId: '285'
			}],
			openIndicator: false,
			dropdownRefContainer: React.createRef()
		}
	}

	getMethodologyIndicators(pSection)
	{
		getMethodologyIndicators(pSection).then((data) => {
			this.setState({indicators: data.resultset});
		})
	}

	getMethodologyData(pSection, pIndicatorID)
	{
		getMethodologyData(pSection, pIndicatorID).then((data) => {
			this.setState({methodology: data.resultset[0]});
		})
	}

	methodologySection(headerLiteralID, dataLiteralID)
	{
		if (this.props.literals[dataLiteralID] != null && this.props.literals[dataLiteralID] != 'null')
		{
			return (
				<Fragment>
					<h3>{this.props.literals[headerLiteralID]}</h3>
					<p>{ReactHtmlParser(this.props.literals[dataLiteralID])}</p>
				</Fragment>
			)
		}
		return '';
	}

	updateDimension = () => {
		const width = window.innerWidth;

		if (width > 990) {
			this.setState({
				openIndicator: false
			});
		}

	}

	componentDidMount()
	{
		// Update the title of the page
		document.title = this.props.literals.L22019 +  " - " + this.props.literals.L22020 + " - " + this.props.literals.L363;

		this.getMethodologyIndicators(this.props.methodology.subsection);
		this.getMethodologyData(this.props.methodology.subsection, this.props.methodology.indicator);

		window.addEventListener('resize', this.updateDimension);
		window.addEventListener('mousedown', this.handleClickOutside);
	}

	componentDidUpdate(prevProps)
	{
		if (prevProps.methodology.section != this.props.methodology.section || prevProps.methodology.subsection != this.props.methodology.subsection 
			|| prevProps.methodology.indicatorID != this.props.methodology.indicatorID)
		{
			this.getMethodologyIndicators(this.props.methodology.subsection);
			this.getMethodologyData(this.props.methodology.subsection, this.props.methodology.indicatorID);
		}
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateDimension);
	}

	changeMethodology(section, subsection, indicator)
	{
		this.props.setMethodology(section,subsection,indicator);
	}

	handleClickOutside = (event) => {
		if (this.state.dropdownRefContainer.current && !this.state.dropdownRefContainer.current.contains(event.target)) {
			this.setState({
				openIndicator: false
			})
		}
	}

	openIndicatorsList = () => {
		this.setState({
			openIndicator: !this.state.openIndicator
		})
	}

    render() {
		let levels= [];
		for (let i = 0; i < menuStructure.length; i++)
		{
			if (menuStructure[i].id == this.props.methodology.section)
			{
				levels = menuStructure[i].levels;
			}
		}

        return (
			<div className="about-tool">
				<div className="container">
					<h1 className="title-section second-color text-center">{this.props.literals.L22019}</h1>
					{/*  SECTION MENU  */}
					<ul className="indicators--list--wrapper">
						{ this.state.sections.map((section) => (
							<li key={section.id} className={'indicators-item ' +(section.id==this.props.methodology.section?"active":"")}>
								<a onClick={(e) => this.changeMethodology(section.id, section.firstSubsection, section.firstIndicatorId)}>{this.props.literals[section.name]}</a>
								<div className="caret"></div>
							</li>
						))}
						{/*<li className="indicators-item" data-ng-repeat="section in sections" data-ng-className="{'active':(section.id == pSection)}">
							<a ui-sref="about-tool-detail-page({pSection: section.id, pSubsection: section.firstSubsection, pIndicator: section.firstIndicatorId})" 
							href data-ng-bind="i18nLiterals[section.name]" data-ng-click="changeSection(section.id)">{this.props.literals.L22007}</a>
							<div className="caret"></div>
						</li>*/}
					</ul>

					{/*  SUBSECTION MENU  */}			
					<ul className={`indicators--submenu--wrapper ${this.state.openIndicator ? 'open-list' : ''}`}  id="indicatorsSubmenu" onClick={this.openIndicatorsList} ref={this.state.dropdownRefContainer}>
						{levels.filter(level=>level.database_name!=undefined && level.database_name!='').map((subsection) => (
							<li key={subsection.id} className={'submenu--item '+(subsection.database_name==this.props.methodology.subsection?'active ':'')+(this.props.literals[subsection.name].length > 20?'multiline ':'')}>
								<a onClick={(e) => this.changeMethodology(this.props.methodology.section, subsection.database_name, subsection.firstIndicatorId)}>{this.props.literals[subsection.name]}</a>
							</li>
						))}
						{/*<li data-ng-className="{'active':(pSubsection == subsection.database_name),'multiline':(i18nLiterals[subsection.name].length > 20 )}" data-ng-repeat="subsection in subsections" className="submenu--item">
							<a ui-sref="about-tool-detail-page({pSection: pSection, pSubsection: subsection.database_name, pIndicator: subsection.firstIndicatorId})" href data-ng-bind="i18nLiterals[subsection.name]">{this.props.literals.L22007}</a>
						</li>*/}
					</ul>

					{/*  DROPDOWN LIST WITH INDICATORS  */}
					<form className="indicators--wrapper">
						<label htmlFor="indicators">{this.props.literals.L20623}</label>
						<div className="indicators-select">
							<select id="indicators" value={this.props.methodology.indicator} onChange={e=>this.changeMethodology(this.props.methodology.section, this.props.methodology.subsection, e.target.value)}>
								{this.state.indicators.map((indicator) => (
									<option key={indicator.indicatorID} value={indicator.indicatorID}>{this.props.literals[`L${indicator.diagram}`]}</option>
								))}
								{/*<option data-ng-repeat="indicator in indicators" data-ng-bind="i18nLiterals['L'+indicator.text]" value="{{indicator.id}}"></option>*/}
							</select>
						</div>
					</form>
					
					{
						this.state.methodology != undefined ?
						(
							<section className="methodology--grid--wrapper" >
								{this.methodologySection('L20720',`L${this.state.methodology.diagram}`)}
								{this.methodologySection('L20721',`L${this.state.methodology.description}`)}
								{this.methodologySection('L20722',`L${this.state.methodology.datasource}`)}
								{this.methodologySection('L20723',`L${this.state.methodology.specificTable}`)}
								{this.methodologySection('L20724',`L${this.state.methodology.url}`)}
								{this.methodologySection('L20728',`L${this.state.methodology.options_applied}`)}
								{this.methodologySection('L20725',`L${this.state.methodology.referenceYear}`)}
								{this.methodologySection('L20726',`L${this.state.methodology.lastUpdate}`)}
								{this.methodologySection('L20727',`L${this.state.methodology.coverage}`)}
								{this.methodologySection('L20730',`L${this.state.methodology.unitMeasure}`)}
								{this.methodologySection('L20729',`L${this.state.methodology.calculations}`)}
								{this.methodologySection('L20731',`L${this.state.methodology.visualisation}`)}
								{this.methodologySection('L20732',`L${this.state.methodology.additionalComments}`)}
							</section>
						) : (
							<section className="methodology--grid--wrapper" data-ng-className="indicatorIcons(pSubsection)">

							</section>
						)
					}
				</div>
			</div>            
        );
    }
}

function mapStateToProps(state){
    const { methodology } = state;
    return {
        methodology
    }
}

Methodology.displayName='Methodology';
export default connect(mapStateToProps, { setMethodology })(Methodology);