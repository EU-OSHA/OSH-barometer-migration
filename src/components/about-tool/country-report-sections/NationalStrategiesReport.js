import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import { getCountryProfileData, getOSHData } from '../../../api';
import images from '../../../style/img/flag/images';

class NationalStrategiesReport extends Component
{
    constructor(props){
        super(props);
        this.state = {
            matrixPageData: [],
            countryProfileData: {},
            isFetching: false
        }
    }

    getData = () => {
        try {
            getCountryProfileData(this.props.country)
                .then((res) => {
                    this.setState({ countryProfileData: res.resultset[0] || [] })
                })
            getOSHData('MATRIX_STRATEGY', { countries: [{ code: this.props.country }] })
                .then((res) => {
                    this.setState({ matrixPageData: res.resultset })
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
        }
    }

    getResponsesTitle = (data, index) => {
        let realIndex = index != 0 ? index-1 : 0 ;
        if(data.check1 === true && (this.state.matrixPageData[realIndex].check1 != true || (realIndex === 0 && index === 0))){
            return <h5>{this.props.literals.L20631}</h5>
        }else if(data.check2 === true && this.state.matrixPageData[realIndex].check2 != true){
            return <h5>{this.props.literals.L20632}</h5>
        }else if(data.check3 === true && this.state.matrixPageData[realIndex].check3 != true){
            return <h5>{this.props.literals.L20633}</h5>
        }
    }

    render(){
        console.log(this.state);
        return (
            <div>
                <header>
                    <img className="flag" src={images[this.props.country.toLowerCase()]}/>
                    <h2 className="country title-section main-color">{this.props.literals["L"+this.props.countryName]}</h2>
                </header>
                <h4>{this.props.literals.L20378}</h4>
                <div className="box-rounded basic">
                    <h5>{this.props.literals.L20246}</h5>
                    <div>{ReactHtmlParser(this.props.literals["L"+this.state.countryProfileData.text1])}</div>
                    {this.isDataUndefined(this.state.countryProfileData.text1)}
                    {/* <div data-ng-if="nationalStrategy[0].basic_info == undefined">{this.props.literals.L20706}</div> */}
                </div>
                <div className="box-rounded background">
                    <h5>{this.props.literals.L20247}</h5>
                    <div>{ReactHtmlParser(this.props.literals["L"+this.state.countryProfileData.text2])}</div>
                    {this.isDataUndefined(this.state.countryProfileData.text2)}
                    {/* <div data-ng-if="nationalStrategy[0].background == undefined" data-ng-bind="i18nLiterals.L20706"></div> */}
                </div>
                <div className="box-rounded characteristics">
                    <h5>{this.props.literals.L20248}</h5>
                    <div>{ReactHtmlParser(this.props.literals["L"+this.state.countryProfileData.text3])}</div>
                    {this.isDataUndefined(this.state.countryProfileData.text3)}
                    {/* <div data-ng-if="nationalStrategy[0].characteristics_objectives == undefined" data-ng-bind="i18nLiterals.L20706"></div> */}
                </div>
                <div className="box-rounded details">
                    <h5>{this.props.literals.L20249}</h5>
                    <div>{ReactHtmlParser(this.props.literals["L"+this.state.countryProfileData.text4])}</div>
                    {this.isDataUndefined(this.state.countryProfileData.text4)}
                    {/* <div data-ng-if="nationalStrategy[0].details_activity == undefined" data-ng-bind="i18nLiterals.L20706"></div> */}
                </div>
                <div className="box-rounded actors">
                    <h5>{this.props.literals.L20250}</h5>
                    <div>{ReactHtmlParser(this.props.literals["L"+this.state.countryProfileData.text5])}</div>
                    {this.isDataUndefined(this.state.countryProfileData.text5)}
                    {/* <div data-ng-if="nationalStrategy[0].actors_stakeholders == undefined" data-ng-bind="i18nLiterals.L20706"></div> */}
                </div>
                <div className="box-rounded resources">
                    <h5>{this.props.literals.L20251}</h5>
                    <div>{ReactHtmlParser(this.props.literals["L"+this.state.countryProfileData.text6])}</div>
                    {this.isDataUndefined(this.state.countryProfileData.text6)}
                    {/* <div data-ng-if="nationalStrategy[0].resources_timeframe == undefined" data-ng-bind="i18nLiterals.L20706"></div> */}
                </div>
                <div className="box-rounded evaluation">
                <h5>{this.props.literals.L20252}</h5>
                <div>{ReactHtmlParser(this.props.literals["L"+this.state.countryProfileData.text7])}</div>
                {this.isDataUndefined(this.state.countryProfileData.text7)}
                {/* <div data-ng-if="nationalStrategy[0].evaluation == undefined" data-ng-bind="i18nLiterals.L20706"></div> */}
                </div>
                <div className="box-rounded relation">
                    <h5>{this.props.literals.L20253}</h5>
                    <div>{ReactHtmlParser(this.props.literals["L"+this.state.countryProfileData.text8])}</div>
                    {this.isDataUndefined(this.state.countryProfileData.text8)}
                    {/* <div data-ng-if="nationalStrategy[0].relation_strategic_framework == undefined" data-ng-bind="i18nLiterals.L20706"></div> */}
                </div>

                <h4>{this.props.literals.L20379}</h4>
                {
                    this.state.matrixPageData.length <= 0 ? (
                        <p>{this.props.literals.L20706}</p>
                    ) : ""
                }
                {
                    this.state.matrixPageData.map((data, index) => (
                        <div key={index} className={`box-rounded box${index}`}>
                            { this.getResponsesTitle(data, index) }
                            <div>
                                {ReactHtmlParser(this.props.literals["L"+data.text1])}
                            </div>
                            <div>
                                {ReactHtmlParser(this.props.literals["L"+data.text2])}
                            </div>
                            <div>
                                <Link to={"/osh-steering/country-profile/basic-information/"+this.props.country}
                                    className="btn--card main-color" title={this.props.literals.L20626}>{this.props.literals.L20626}</Link>
                                {/* <a ui-sref="country-profile({pIndicator: 'basic-information', pCountry1:matrix.country_code, pCountry2: 0})" 
                                    className="btn--card main-color" title={this.props.literals.L20626}>{this.props.literals.L20626}</a> */}
                            </div>
                        </div>
                    ))
                }
                {/*<div data-ng-repeat="matrix in challengesResponse" class="box-rounded box{{$index}}">
                <h5 class="" ng-if="::matrix.implementation_record==1" data-ng-bind="i18nLiterals.L20631"></h5>
                <h5 class="" ng-if="::matrix.prevention_work==1" data-ng-bind="i18nLiterals.L20632"></h5>
                <h5 class="" ng-if="::matrix.tackling_demographic==1" data-ng-bind="i18nLiterals.L20633"></h5>

                <div data-ng-bind-html="i18nLiterals['L'+matrix.objectives]"></div>
                <div data-ng-bind-html="i18nLiterals['L'+matrix.groups_and_activities]"></div>
                <div class="">
                    <a ui-sref="country-profile({pIndicator: 'basic-information', pCountry1:matrix.country_code, pCountry2: 0})" class="btn--card main-color" title="{{i18nLiterals.L20626}}" data-ng-bind-html="i18nLiterals.L20626"></a>
                </div>
                </div> */}
            </div>
        )
    }
}

export default NationalStrategiesReport;