import React, { Component, Fragment } from 'react';
import { getHealthPerceptionData } from '../../../api';
import images from '../../../style/img/flag/images';

class HealthPerceptionReport extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            countryData: {}
        }
    }

    loadData()
    {
        let filters = {
            countries: [{code:this.props.country}]
        }
        getHealthPerceptionData(filters)
			.then((response)=> response)
			.then((res) => {
			
                let countryData = {};
                res.resultset.forEach(element =>{
                    countryData[element.countryCode] = {
                        countryName: element.countryName,
                        data: element.data
                    };
                });
                this.setState({countryData : countryData});
        });
    }

    countryData(country)
    {
        const currentCountryData = this.state.countryData[country];
        const flag = country == 'EU27_2020' ? images['eu28'] : images[country.toLowerCase()];
        if (currentCountryData)
        {
            return (
                <div className="box-rounded">
                    <header>
                        <img className="flags" src={flag} />
                        <h2 className="country title-section main-color">{currentCountryData.countryName}</h2>
                    </header>
                    <ul>
                        <li>
                            {currentCountryData.data["Job satisfaction"] ? 
                            <Fragment>
                                <span className="country-data">{Math.round(currentCountryData.data["Job satisfaction"])}</span>
                                <span className="data-text">%</span>
                            </Fragment>
                            :
                            <span className="country-data">-</span>}
                            <label>{this.props.literals.L314}</label>
                        </li>
                        <li>
                            {currentCountryData.data['Health affected by work'] ? 
                            <Fragment>
                                <span className="country-data">{Math.round(currentCountryData.data['Health affected by work'])}</span>
                                <span className="data-text">%</span>
                            </Fragment>
                            :
                            <span className="country-data">-</span>}
                            <label>{this.props.literals.L315}</label>
                        </li>
                        <li>
                            {currentCountryData.data['Health problem in the last 12 months'] ? 
                            <Fragment>
                                <span className="country-data">{Math.round(currentCountryData.data['Health problem in the last 12 months'])}</span>
                                <span className="data-text">%</span>
                            </Fragment>
                            :
                            <span className="country-data">-</span>}
                            <label>{this.props.literals.L316}</label>
                        </li>
                        <li>
                            {currentCountryData.data['More than 15 days of absence'] ? 
                            <Fragment>
                                <span className="country-data">{Math.round(currentCountryData.data['More than 15 days of absence'])}</span>
                                <span className="data-text">%</span>
                            </Fragment>
                            :
                            <span className="country-data">-</span>}
                            <label>{this.props.literals.L317}</label>
                        </li>
                        <li>
                            {currentCountryData.data['Sick at working'] ? 
                            <Fragment>
                                <span className="country-data">{Math.round(currentCountryData.data['Sick at working'])}</span>
                                <span className="data-text">%</span>
                            </Fragment>
                            :
                            <span className="country-data">-</span>}
                            <label>{this.props.literals.L318}</label>
                        </li>
                        <li>
                            {currentCountryData.data['Be able to do current job until 60 years old'] ? 
                            <Fragment>
                                <span className="country-data">{Math.round(currentCountryData.data['Be able to do current job until 60 years old'])}</span>
                                <span className="data-text">%</span>
                            </Fragment>
                            :
                            <span className="country-data">-</span>}
                            <label>{this.props.literals.L319}</label>
                        </li>
                    </ul>
                </div>
            )
        }
    }

    componentDidMount()
    {
        this.loadData();
    }

    componentDidUpdate(prevProps)
    {
        if (prevProps.country != this.props.country)
        {
            this.loadData();
        }
    }

    render()
    {
        return(
            <div className="content-page">
                {this.countryData(this.props.country)}
                {this.countryData('EU27_2020')}
            </div> 
        )
    }
}

export default HealthPerceptionReport;