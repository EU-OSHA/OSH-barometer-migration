import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'html-react-parser';
import { getMethodologyData } from '../../api';

class Accordion extends React.Component {
	constructor() {
	  super();
	  this._handleClick = this._handleClick.bind(this);
	}
	
	componentDidMount() {
	  this._handleClick();
	}
	
	_handleClick() {
	  const acc = this._acc.children;
	  //acc[0].classList.remove("active");

	  for (let i = 0; i < acc.length; i++) {		  
		let a = acc[i];
		a.onclick = () => acc[0].classList.toggle("active");
		a.onclick = () => a.classList.toggle("active");
	  }
	}
	
	render() {
	  return (
		<div 
		  ref={a => this._acc = a} 
		  onClick={this._handleClick}>
		  {this.props.children}
		</div>
	  )
	}
}

class Methodology extends Component
{
	constructor(props) {
		super(props);

		this.state = {
		}
	}

	getMethodologyData(pSection, pIndicatorID)
	{
		getMethodologyData(pSection, pIndicatorID).then((data) => {
			this.setState({methodology: data.resultset});
		})
	}

	componentDidMount()
	{
		this.getMethodologyData(this.props.section, this.props.indicator);
	}

	componentDidUpdate(prevProps)
	{
		if (this.props.indicator != prevProps.indicator)
		{
			this.getMethodologyData(this.props.section, this.props.indicator);
		}
	}

	methodologySection(numberOfIndicators, headerLiteralID, dataLiteralID)
	{
		if (this.props.literals[dataLiteralID] != null && this.props.literals[dataLiteralID] != 'null' && numberOfIndicators > 0)
		{
			return (
				<Fragment>
					{(numberOfIndicators == 1) ? (<h3>{this.props.literals[headerLiteralID]}</h3>) : (<h4>{this.props.literals[headerLiteralID]}</h4>)}
					<p>{ReactHtmlParser(this.props.literals[dataLiteralID])}</p>
				</Fragment>
			)
		}
		return '';
	}

	render()
	{
		let methodology = '';

		if (this.state.methodology != undefined)
		{
			if (this.state.methodology.length > 1)
			{
				methodology = (
					<div>
						{this.state.methodology.map((methodology) => (
							<Accordion>
								<h3 className="accordion-title">{this.props.literals[`L${methodology.diagram}`]}</h3>
								<div className="accordion-content">
								{this.methodologySection(this.state.methodology.length,'L20720',`L${this.state.methodology[0].diagram}`)}
								{this.methodologySection(this.state.methodology.length,'L20721',`L${this.state.methodology[0].description}`)}
								{this.methodologySection(this.state.methodology.length,'L20722',`L${this.state.methodology[0].datasource}`)}
								{this.methodologySection(this.state.methodology.length,'L20723',`L${this.state.methodology[0].specificTable}`)}
								{this.methodologySection(this.state.methodology.length,'L20724',`L${this.state.methodology[0].url}`)}
								{this.methodologySection(this.state.methodology.length,'L20728',`L${this.state.methodology[0].options_applied}`)}
								{this.methodologySection(this.state.methodology.length,'L20725',`L${this.state.methodology[0].referenceYear}`)}
								{this.methodologySection(this.state.methodology.length,'L20726',`L${this.state.methodology[0].lastUpdate}`)}
								{this.methodologySection(this.state.methodology.length,'L20727',`L${this.state.methodology[0].coverage}`)}
								{this.methodologySection(this.state.methodology.length,'L20730',`L${this.state.methodology[0].unitMeasure}`)}
								{this.methodologySection(this.state.methodology.length,'L20729',`L${this.state.methodology[0].calculations}`)}
								{this.methodologySection(this.state.methodology.length,'L20731',`L${this.state.methodology[0].visualisation}`)}
								{this.methodologySection(this.state.methodology.length,'L20732',`L${this.state.methodology[0].additionalComments}`)}
								</div>
							</Accordion>
						))}
					</div>					
				)
			}
			else if (this.state.methodology.length == 1)
			{
				methodology = (
					<div>
						{this.methodologySection(this.state.methodology.length,'L20720',`L${this.state.methodology[0].diagram}`)}
						{this.methodologySection(this.state.methodology.length,'L20721',`L${this.state.methodology[0].description}`)}
						{this.methodologySection(this.state.methodology.length,'L20722',`L${this.state.methodology[0].datasource}`)}
						{this.methodologySection(this.state.methodology.length,'L20723',`L${this.state.methodology[0].specificTable}`)}
						{this.methodologySection(this.state.methodology.length,'L20724',`L${this.state.methodology[0].url}`)}
						{this.methodologySection(this.state.methodology.length,'L20728',`L${this.state.methodology[0].options_applied}`)}
						{this.methodologySection(this.state.methodology.length,'L20725',`L${this.state.methodology[0].referenceYear}`)}
						{this.methodologySection(this.state.methodology.length,'L20726',`L${this.state.methodology[0].lastUpdate}`)}
						{this.methodologySection(this.state.methodology.length,'L20727',`L${this.state.methodology[0].coverage}`)}
						{this.methodologySection(this.state.methodology.length,'L20730',`L${this.state.methodology[0].unitMeasure}`)}
						{this.methodologySection(this.state.methodology.length,'L20729',`L${this.state.methodology[0].calculations}`)}
						{this.methodologySection(this.state.methodology.length,'L20731',`L${this.state.methodology[0].visualisation}`)}
						{this.methodologySection(this.state.methodology.length,'L20732',`L${this.state.methodology[0].additionalComments}`)}
					</div>
				)
			}
		}

		return(
			<section className="container section--page section--methodology ng-isolate-scope">
			
				<Accordion>
				<h2 className="accordion-title">{this.props.literals.L22101}</h2>
				<div className="accordion-content">
					{methodology}
					<p className="btn--wrapper text-center">
						<Link to='/about-the-system/methodology' className="btn-default btn-main-color text-center ">{this.props.literals.L22102}</Link>
					</p>
				</div>
				</Accordion>
			</section>
		)
	}
}

export default Methodology;