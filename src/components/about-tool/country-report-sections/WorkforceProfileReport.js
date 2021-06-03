import React, { Component } from 'react';
import { getCountryDataMap } from '../../../api'
import images from '../../../style/img/flag/images';

class WorkforceProfileReport extends Component
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
        getCountryDataMap(this.props.country)
			.then((response)=> response)
			.then((res) => {
			
            let countryData = {};
            res.resultset.forEach(element =>{
                console.log(element);
                countryData[element.countryCode] = element.data;
            });
            this.setState({countryData : countryData});
        });
    }

    tableRow(country)
    {
        const currentCountryData = this.state.countryData[country];
        const flag = country == 'EU27_2020' ? images['eu28'] : images[country.toLowerCase()];
        if (currentCountryData)
        {
            return(
                <tr>
                    <td><img className="flags" src={flag} /><span class="data">{country}</span></td>
                    <td>
                        <span>{this.props.literals.L20615}</span>
                        <span className="data">{currentCountryData['Median age of population']} years</span>
                    </td>
                    <td>
                        <span>{this.props.literals.L20616}</span>
                        <span className="data">{currentCountryData['Ageing workers (55 to 64) employment rate']} %</span>
                    </td>
                    <td>
                        <span>{this.props.literals.L20619}</span>
                        <span className="data">{currentCountryData['Total, male and female employment rate - Female']} %</span>
                    </td>
                    <td>
                        <span>{this.props.literals.L20618}</span>
                        <span className="data">{currentCountryData['Total, male and female employment rate - Male']} %</span>
                    </td>
                    <td>
                        <span>{this.props.literals.L20617}</span>
                        <span className="data">{currentCountryData['Total, male and female employment rate - Total']} %</span>
                    </td>
                    <td>
                        <span>{this.props.literals.L22125}</span>
                        <span className="data">{currentCountryData['Unemployment rate'] ? currentCountryData['Unemployment rate'] : '-'} %</span>
                    </td>
                </tr>
            )
        }
        else
        {
            return null;
        }
    }

    componentDidMount()
    {
        this.loadData();
    }

    render()
    {
        return(
            <table>
                {this.tableRow('EU27_2020')}
                {this.tableRow(this.props.country)}
            </table>
            
        )
    }
}

export default WorkforceProfileReport;