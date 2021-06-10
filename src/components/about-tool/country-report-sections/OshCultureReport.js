import React, { Component } from 'react';
import HealthAwareness from '../../common/charts/HealthAwareness';

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
                            <h2 className="card-block--chart--wrapper" >{this.props.literals[`L${element.literalTab}`]}</h2>
                            <HealthAwareness 
                                literals={this.props.literals}
                                country={this.state.country}
                                chartType={[chart]}
                                colors={['#7b7b7d', '#cbe2e3','#449fa2']}
                                type={'column'}
                                fullCountryReport={true}
                            />
                            <p>{this.props.literals[`L${chart.legend}`]}</p>
                        </div>
                    )
                }))}
            </React.Fragment>
        );
    }
}

export default OshCultureReport;