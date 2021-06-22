import React, { Component, Fragment } from 'react';
import { getSocialDialogueData } from '../../../api';
import images from '../../../style/img/flag/images';

class SocialDialogueReport extends Component
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
        getSocialDialogueData(filters)
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
                            {currentCountryData.data['E3Q350_1'] ? 
                            <Fragment>
                                <span className="country-data">{Math.round(currentCountryData.data['E3Q350_1'])}</span>
                                <span className="data-text">%</span>
                            </Fragment>
                            :
                            <span className="country-data">-</span>}
                            <label>{this.props.literals.L20659}</label>
                        </li>
                        <li>
                            {currentCountryData.data['E3Q350_2'] || country=='AT' ? 
                            <Fragment>
                                <span className="country-data">{country != 'AT' ? Math.round(currentCountryData.data['E3Q350_2']) : 20}</span>
                                <span className="data-text">%</span>
                            </Fragment>
                            :
                            <span className="country-data">-</span>}
                            <label>{this.props.literals.L20660}</label>
                        </li>
                        <li>
                            {currentCountryData.data['E3Q350_4'] ? 
                            <Fragment>
                                <span className="country-data">{Math.round(currentCountryData.data['E3Q350_4'])}</span>
                                <span className="data-text">%</span>
                            </Fragment>
                            :
                            <span className="country-data">-</span>}
                            <label>{this.props.literals.L20661}</label>
                        </li>
                        <li>
                            {currentCountryData.data['E3Q350_3'] ? 
                            <Fragment>
                                <span className="country-data">{Math.round(currentCountryData.data['E3Q350_3'])}</span>
                                <span className="data-text">%</span>
                            </Fragment>
                            :
                            <span className="country-data">-</span>}
                            <label>{this.props.literals.L20662}</label>
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
        return (
            <div className="content-page">
                {this.countryData(this.props.country)}
                {this.countryData('EU27_2020')}
            </div>            
        )
    }
}

export default SocialDialogueReport