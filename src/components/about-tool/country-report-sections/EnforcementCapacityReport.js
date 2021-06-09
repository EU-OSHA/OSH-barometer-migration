import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import EnforcementCapacityChart from '../../common/charts/EnforcementCapacityChart';
import ChartDataTable from './ChartDataTable';
import { getOSHData } from '../../../api';

class EnforcementCapacityReport extends Component
{
    constructor(props){
        super(props);
        this.state = {
            countryData: [],
            isFetching: false
        }
    }

    getData = () => {
        try {
            // getCountryProfileData(this.props.country)
            //     .then((res) => {
            //         this.setState({ countryProfileData: res.resultset[0] || [] })
            //     })
            getOSHData('STRATEGY_ENFOR_CAPACITY', { countries: [{ code: this.props.country }] })
                .then((res) => {
                    this.setState({ countryData: res.resultset[0] })
                })
        } catch (error) {
            console.log('Error fetching data', error)
        } finally {
            this.setState({ ...this.state, isFetching: false })
        }
    }

    componentDidMount(){
        // console.log("componentDidMount");
        this.setState({ ...this.state, isFetching: true });
        this.getData();
    }

    componentDidUpdate(prevProps, prevState){
        // console.log("componentDidUpdate");
        if(prevProps.country != this.props.country){
            this.setState({ ...this.state, isFetching: true });
            this.getData();
        }
    }

    isDataUndefined = (text) => {
        if(text === undefined){
            return <div>{this.props.literals.L20706}</div>
        }else{
            return <div>{ReactHtmlParser(this.props.literals["L"+text])}</div>
        }
    }

    render(){

        return(
            <div>
                <div className="box-rounded">
                    <h4 className="header4">{this.props.literals.L20692}</h4>
                    <EnforcementCapacityChart
                        title={this.props.literals.L20693}
                        subtitle=" "
                        colors={['#f6a400','#f3c564', '#449fa2', '#cbe2e3']}
                        tick={20}
                        percentage={true}
                        type={'column'}
                        selectCountry1={this.props.country}
                        selectCountry2={"EU27_2020"}
                        chart="20107"
                        indicator="285"
                        sector={["14"]}
                        answers={["1","2"]}
                        stackingColumn={'normal'}
                    />
                    <ChartDataTable
                        literals={this.props.literals} 
                        country={this.props.country}
                        chartID={20107}
                        split={'answer'} 
                        columns={['Country', 'Yes (%)', 'No (%)']}
                        showDecimals={true}
                        countryDisplay={'before'}
                        sector={["14"]}
                        answers={["1","2"]}
                    />

                    {/* TODO Table with data in a different component */}
                    {/* <table className="w50 chart-data">
                        <thead>
                        <tr>
                            <th>Country</th>
                            <th>Yes (%)</th>
                            <th>No (%)</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr data-ng-repeat="row in establishmentsInspected">
                            <th data-ng-bind="row.country"></th>
                            <td data-ng-bind="row.yes"></td>
                            <td data-ng-bind="row.no"></td>
                        </tr>
                        </tbody>
                    </table> */}
                </div>

                {/* Authority */}
                <div className="box-rounded content">
                    <h4 className="header4">{this.props.literals.L333}</h4>
                    {/* <div data-ng-if="enforcementCapacities.scope != null">{ReactHtmlParser(this.props.literals["L"+this.state.countryData.text1])}</div> */}
                    {this.isDataUndefined(this.state.countryData.text1)}
                    {/* <div data-ng-if="enforcementCapacities.authority == null" data-ng-bind="i18nLiterals.L20706"></div> */}
                </div>

                {/* Scope of the Labor Inspection */}
                <div className="box-rounded content">
                    <h4 className="header4">{this.props.literals.L334}</h4>
                    {/* <div data-ng-if="enforcementCapacities.scope != null">{ReactHtmlParser(this.props.literals["L"+this.state.countryData.text2])}</div> */}
                    {this.isDataUndefined(this.state.countryData.text2)}
                    {/* <div data-ng-if="enforcementCapacities.scope == null" data-ng-bind="i18nLiterals.L20706"></div> */}
                </div>

                {/* Inspector powers */}
                <div className="box-rounded content inspectorpowers">
                    <h4 className="header4">{this.props.literals.L335}</h4>
                    {/* <div>{ReactHtmlParser(this.props.literals["L"+this.state.countryData.text3])}</div> */}
                    {this.isDataUndefined(this.state.countryData.text3)}
                    {/* <div data-ng-if="enforcementCapacities.inspector == null" data-ng-bind="i18nLiterals.L20706"></div> */}
                </div>

                {/* Strategy/Plan */}
                <div className="box-rounded content">
                    <h4 className="header4">{this.props.literals.L336}</h4>
                    {/* <div data-ng-if="enforcementCapacities.scope != null">{ReactHtmlParser(this.props.literals["L"+this.state.countryData.text4])}</div> */}
                    {this.isDataUndefined(this.state.countryData.text4)}
                    {/* <div data-ng-if="enforcementCapacities.strategy == null" data-ng-bind="i18nLiterals.L20706"></div> */}
                </div>
            </div>
        )
    }
}

export default EnforcementCapacityReport;