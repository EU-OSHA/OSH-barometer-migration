import React, { Component } from 'react';
import Methodology from '../common/Methodology';
import AdviceSection from '../common/AdviceSection';
import Related from '../common/Related';
import SelectEconomic from '../common/select-filters/SelectEconomic';
import SpiderChart from '../common/charts/SpiderChart';
import { workerInvolvementTabs } from '../../model/subMenuTabs';
import { connect } from 'react-redux';
import { setCountry1, setCountry2 } from '../../actions/';
import UrlChanger from '../common/urlChanger/UrlChanger';
class WorkerInvolvement extends Component {
	constructor(props){
		super(props);

		this.state = {
			lockedCountry: this.props.lockedCountry,
			indicatorTabs: workerInvolvementTabs[0],
			chartLegend: '',
			dataset: props.split ? props.split : 'esener',
			currentPath: '/osh-outcomes-working-conditions/worker-involvement/'
		}
	}

	handleSearch = (callbackCountry1) => {
		if (!this.props.selectedByUser) {
			this.props.setCountry1(callbackCountry1);
		} else {
			this.setState({
				lockedCountry: callbackCountry1
			});
		}
	}

	handleSearch2 = (callbackCountry2) => {
		this.props.setCountry2(callbackCountry2);
	}

	callbackSelectedSurvey = (callback) => {
		this.setState({ dataset: callback });
	}

	callbackChartLegend = (legend) => {
		this.setState({ chartLegend: legend });
	}

	componentDidMount() {
		// Update the title of the page
		document.title = this.props.literals.L22015 +  " - " + this.props.literals.L22020 + " - " + this.props.literals.L363;

		if (this.props.country1 != undefined && this.props.country2 != undefined) {
			this.props.setCountry1(this.props.country1);
			this.props.setCountry2(this.props.country2);
		}
	}

	render()
	{
		return(
			<div className="worker-involvement">
				<AdviceSection literals={this.props.literals} section={["osh-outcomes-working-conditions","worker-involvement"]} methodologyData={{section: 'osh-outcomes-working-conditions', subsection: 'Worker involvement', indicator: 75}} />

				<form className="compare--block--form">

					<div>
						<SelectEconomic 
							handleSearch={this.handleSearch} 
							handleSearch2={this.handleSearch2} 
							literals={this.props.literals}
							selectedCountry1={this.props.selectedByUser ? this.state.lockedCountry : this.props.selectCountry}
							selectedCountry2={this.props.selectCountry2}
							charts={[this.state.indicatorTabs.chartType.find((element) => element.type == this.state.dataset).chart]}
							indicator={this.state.indicatorTabs.chartType.find((element) => element.type == this.state.dataset).chartIndicator}
						/>

					</div>

					<div className="line background-main-light" />

					<div className="container section--page card--grid xxs-w1 xs-w1 w1 center-text">
						<div className="card--block--chart with-filters">

						 	<div className="chart--block">
								<div className="chart--wrapper" >
									<UrlChanger  
										currentLocation={this.state.currentPath}
										currentSplit={this.state.dataset}
										lockedCountry={this.state.lockedCountry}
									/>
									<SpiderChart
										literals={this.props.literals}
										tabIndicator={this.state.indicatorTabs.literalTab}
										selectCountry1={this.props.selectedByUser ? this.state.lockedCountry : this.props.selectCountry}
										selectCountry2={this.props.selectCountry2}
										showDataLabel={true}
										colors={['#f6a400','#529FA2','#003399']}
										chartType={this.state.indicatorTabs.chartType}
										callbackLegend={this.callbackChartLegend}
										callbackSelectedSurvey={this.callbackSelectedSurvey}
										dataset={this.state.dataset}
										exportingEnabled={true}
										showSelect={true}
									/>
								</div>
							</div>
							<div className="chart-legend">
								{this.props.literals[`L${this.state.chartLegend}`]} 
							</div>						
						</div>
					</div>
				</form>
				<Methodology literals={this.props.literals} section={'Worker involvement'} dataset={this.state.dataset} />
				<Related literals={this.props.literals} section={["osh-outcomes-working-conditions","worker-involvement"]} />
			</div>
		)
	}
}
WorkerInvolvement.displayName = 'WorkerInvolvement';

function mapStateToProps(state){
	const { selectCountry, selectCountry2, selectedByUser, lockedCountry } = state.selectCountries;
    return { selectCountry, selectCountry2, selectedByUser, lockedCountry };
}

function mapDispatchToProps(dispatch) {
	return {
		setCountry1: (country) => dispatch(setCountry1(country)),
		setCountry2: (country2) => dispatch(setCountry2(country2))
	}
}

// export default WorkerInvolvement;
export default connect(mapStateToProps, mapDispatchToProps )(WorkerInvolvement);