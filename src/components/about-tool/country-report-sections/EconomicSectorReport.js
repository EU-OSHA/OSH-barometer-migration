import React, { Component } from 'react';
import Chart from '../../common/charts/Chart';
import ChartHuman from '../../common/charts/ChartHuman';
import EmploymentRate from '../../common/charts/EmploymentRate';
import IncomerPercapital from '../../common/charts/IncomePerCapita';
import ChartDataTable from './ChartDataTable';

class EconomicSectorReport extends Component {
    constructor(props) {
        super(props);

        this.state = {
            euCountry: 'EU27_2020'
        }
    }
    render() {
        return (
            <React.Fragment>
                {this.props.sectorIndicator == 1 ? (
                    <React.Fragment>
                        {/* Company Size */}
                        <div className="box-rounded" >
                            <div className="card--block--chart--wrapper" >
                                <h2 className="title--card" >{this.props.literals.L288}</h2>
                                <Chart 
                                    colors={['#f6a400','#cbe2e3','#7b7b7d','#ffe300','#449fa2','#f3c564','#16983e']}
                                    showDataLabel={true}
                                    tick={20}
                                    percentage={true}
                                    type='bar'
                                    selectCountry1={this.props.country}
                                    selectCountry2={this.state.euCountry}
                                    chart={'20089'}
                                    indicator={'31'}
                                    fullCountryReport={false}
                                />
                            </div>
                            <ChartDataTable
                                className="w75 chart-data"
                                literals={this.props.literals} 
                                country={this.props.country}
                                chartID={20089}
                                split={'size'} 
                                sameRow={true}
                                columns={['Company size', 'Country', 'Value (%)', 'Country', 'Value(%)']}
                                showDecimals={true}
                                countryDisplay={'code'}
                            />
                        </div>
                        {/* Employment per sector */}
                        <div className="box-rounded" >
                            <div className="card--block--chart--wrapper" >
                                <h2 className="title--card" >{this.props.literals.L289}</h2>
                                <Chart
                                    colors={['#f6a400','#cbe2e3','#7b7b7d','#ffe300','#449fa2','#f3c564','#16983e']}
                                    showDataLabel={false}
                                    tick={25}
                                    percentage={true}
                                    type='bar'
                                    selectCountry1={this.props.country}
                                    selectCountry2={this.state.euCountry}
                                    chart={'20010'}
                                    indicator={'32'}
                                    stacking='percent'
                                    reversed={false}
                                    fullCountryReport={false}
                                />
                            </div>
                            <ChartDataTable
                                className="chart-data"
                                literals={this.props.literals} 
                                country={this.props.country}
                                chartID={20010}
                                split={'sector'} 
                                sameRow={true}
                                columns={['Sector', 'Country', 'Value (%)', 'Country', 'Value(%)']}
                                showDecimals={true}
                                countryDisplay={'code'}
                            />
                        </div>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        {/* Employment Rate */}
                        <div className="box-rounded" >
                            <div className="card--block--chart--wrapper" >
                                <h2 className="title--card" >{this.props.literals.L290}</h2>
                                <EmploymentRate
                                    colors={['#f6a400','#529FA2']}
                                    showDataLabel={true}
                                    tick={50}
                                    percentage={true}
                                    type='bar'
                                    selectCountry1={this.props.country}
                                    selectCountry2={this.state.euCountry}
                                    chart={'20011'}
                                    indicator={'33'}
                                    fullCountryReport={false}
                                />
                            </div>
                            <ChartDataTable
                                className='chart-data'
                                literals={this.props.literals} 
                                country={this.props.country}
                                chartID={20011}
                                split={'none'} 
                                columns={['Country', 'Value (%)']}
                                showDecimals={true}
                                countryDisplay={'before'}
                            />
                        </div>
                        {/* GDP per Capita */}
                        <div className="box-rounded" >
                            <div className="card--block--chart--wrapper" >
                                <h2 className="title--card" >{this.props.literals.L22195}</h2>
                                <ChartHuman
                                    colors={['#ffae00','#529FA2','#003399']}
                                    showDataLabel={true}
                                    percentage='ft'
                                    type='column'
                                    selectCountry1={this.props.country}
                                    selectCountry2={this.state.euCountry}
                                    chart={'20013'}
                                    indicator={'35'}
                                    fullCountryReport={false}									
                                />
                            </div>
                            <ChartDataTable
                                className='chart-data'
                                literals={this.props.literals} 
                                country={this.props.country}
                                chartID={20013}
                                split={'none'} 
                                columns={['Country', 'Value (%)']}
                                showDecimals={true}
                                countryDisplay={'before'}
                            />
                        </div>
                        {/* GDP per Capita EURO */}
                        <div className="box-rounded" >
                            <div>
                                <h2 className="title--card" >{this.props.literals.L22195}</h2>
                                <ChartHuman
                                    colors={['#ffae00','#529FA2','#003399']}
                                    showDataLabel={true}
                                    percentage='ft'
                                    type='column'
                                    selectCountry1={this.props.country}
                                    selectCountry2={this.state.euCountry}
                                    chart={'20087'}
                                    indicator={'278'}
                                    fullCountryReport={false}
                                />
                            </div>
                            <ChartDataTable
                                className='chart-data'
                                literals={this.props.literals} 
                                country={this.props.country}
                                chartID={20087}
                                split={'none'} 
                                columns={['Country', 'Value (%)']}
                                showDecimals={true}
                                countryDisplay={'before'}
                            />
                        </div>
                        {/* Income per Capita */}
                        <div className="box-rounded" >
                            <div>
                                <h2 className="title--card" >{this.props.literals.L293}</h2>
                                <IncomerPercapital
                                    colors={['#ffae00','#003399','#529FA2','#fcf230','#6ab8ba','#fcd986','#4ab265']}
                                    showDataLabel={true}
                                    tick={5000}
                                    percentage='€'
                                    type='line'
                                    selectCountry1={this.props.country}
                                    selectCountry2={this.state.euCountry}
                                    chart={'20014'}
                                    indicator={'36'}
                                    fullCountryReport={false}
                                />
                            </div>
                            <ChartDataTable
                                className='chart-data'
                                literals={this.props.literals} 
                                country={this.props.country}
                                chartID={20014}
                                split={'year'} 
                                columns={['Country', 'Year', 'Income']}
                                showDecimals={true}
                                countryDisplay={'before'}
                            />
                        </div>
                        {/* Income per Capita EURO */}
                        <div className="box-rounded" >
                            <div className="card--block--chart--wrapper" >
                                <h2 className="title--card" >{this.props.literals.L293}</h2>
                                <IncomerPercapital
                                    colors={['#ffae00','#003399','#529FA2','#fcf230','#6ab8ba','#fcd986','#4ab265']}
                                    showDataLabel={true}
                                    tick={5000}
                                    percentage='€'
                                    type='line'
                                    selectCountry1={this.props.country}
                                    selectCountry2={this.state.euCountry}
                                    chart={'20088'}
                                    indicator={'279'}
                                    fullCountryReport={false}
                                />
                            </div>
                            <ChartDataTable
                                className='chart-data'
                                literals={this.props.literals} 
                                country={this.props.country}
                                chartID={20088}
                                split={'year'} 
                                columns={['Country', 'Year', 'Income']}
                                showDecimals={true}
                                countryDisplay={'before'}
                            />
                        </div>
                    </React.Fragment>   
                )}
            </React.Fragment>
        );
    }
}

export default EconomicSectorReport;