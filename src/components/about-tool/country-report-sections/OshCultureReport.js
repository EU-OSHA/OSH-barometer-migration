import React, { Component } from 'react';
import HealthAwareness from '../../common/charts/HealthAwareness';
import ChartDataTable from './ChartDataTable';

import { oshCulture } from '../../../model/subMenuTabs';

class OshCultureReport extends Component {
    constructor(props) {
        super(props);

        this.state = {
            country: this.props.country
        }
    }

    render() {
        return (
            <React.Fragment>
                {oshCulture.map(element => element.chartType.map((chart) => {
                    return (
                        <div key={chart} className="box-rounded">
                            <h2 className="title--card" >{this.props.literals[`L${element.literalTab}`]}</h2>
                            <HealthAwareness 
                                literals={this.props.literals}
                                country={this.props.country}
                                chartType={[chart]}
                                colors={['#b1b3b4', '#cbe2e3','#449fa2']}
                                type={'column'}
                                fullCountryReport={true}
                            />
                            <p>{this.props.literals[`L${chart.legend}`]}</p>
                            <ChartDataTable
                                literals={this.props.literals}
                                country={this.props.country}
                                chartID={chart.chart}
                                split={'answer'}
                                sameRow={true}
                                columns={chart.columns}
                                answer={chart.answers}
                                sector={chart.sector}
                                showDecimals={true}
                                countryDisplay={'after'}
                            />
                        </div>
                    )
                }))}
            </React.Fragment>
        );
    }
}

export default OshCultureReport;