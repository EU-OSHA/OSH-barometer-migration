import React, { Component } from 'react';

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

	render()
	{
		return(
			<div>		
				<section className="container section--page section--methodology ng-isolate-scope" father="generic-information" section="OSH_AUTHORITIES" indicatorid="27">
					<Accordion>
					<h2 className="accordion-title " data-ng-bind="i18nLiterals.L22101">Detailed information and Methodology</h2>
					<div className="accordion-content " data-ng-if="methodologyType==0 || methodologyType==2">
						<div data-ng-repeat="indicator in indicators" data-ng-if="(methodologyType==0 || (methodologyType==2 &amp;&amp; group.indexOf(indicator.id)>-1)) &amp;&amp; (pDatasetID==undefined || indicator.dataset_id==pDatasetID || pDatasetID=='')" className="">
							<Accordion>
							<h3 className="accordion-title " ng-click="accordion($event)" data-ng-bind="i18nLiterals['L'+indicator.diagram]">OSH authority</h3>
							<div className="accordion-content">

								<h4 data-ng-bind="i18nLiterals.L20720" data-ng-if="i18nLiterals['L'+indicator.diagram] != 'null'" className=" ">Indicator</h4>

								<p data-ng-bind-html="i18nLiterals['L'+indicator.diagram]" data-ng-if="i18nLiterals['L'+indicator.diagram] != 'null'" className=" ">OSH authority</p>

								<h4 data-ng-bind="i18nLiterals.L20721" data-ng-if="i18nLiterals['L'+indicator.description] != 'null'" className=" ">Description</h4>

								<div data-ng-bind-html="i18nLiterals['L'+indicator.description]" data-ng-if="i18nLiterals['L'+indicator.description] != 'null'" className=" ">
								<p>This part consists of a harmonised short description of OSH authorities and OSH institutions in Member States. You can select one of the Member States, the European Union or one of four categories of the ‘Institution types’. <strong>Specifically this indicator relates to:</strong></p>
								<ul>
									<li><strong>OSH authority</strong></li>
									<li>Compensation and insurance body</li>
									<li>Prevention institute</li>
									<li>Standardisation body</li>
								</ul>
								</div>

								<h4 data-ng-bind="i18nLiterals.L20722" data-ng-if="indicator.datasource != 'null'" className=" ">Data source</h4>

								<div data-ng-bind-html="i18nLiterals['L'+indicator.datasource]" data-ng-if="i18nLiterals['L'+indicator.datasource] != 'null'" className=" ">
								<p>The source for OSH-authorities and OSH-institutions is a preparatory report for DG Employment from 2018. Most of the data has been compiled in 2016 or 2017.
									<br />(Kooperationsstelle Hamburg IFE / EUROGIP: Development and design of a structural model for the construction and implementation of an EU OSH Information System, Final Report, March 2018, Service contract No VC/2016/0055). 
									<br />The National Contact Points updated the information at the end of 2019.
								</p>
								</div>
							</div>
							</Accordion>
						</div>
						<p className="btn--wrapper text-center"><a ui-sref="about-tool-detail-page({pSection: father, pSubsection: section.toLowerCase(), pIndicator: pIndicatorID})" className="btn-default btn-main-color text-center " data-ng-bind="i18nLiterals.L22102" href="#!/about-the-system/methodology">Discover all the Methodology</a></p>
					</div>
					</Accordion>
				</section>
				
			</div>
		)
	}
}
//ReactDOM.render(<App />, document.getElementById('app'));
export default Methodology;