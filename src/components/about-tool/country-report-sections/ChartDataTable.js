import React, { Component } from 'react';
import { Fragment } from 'react';
import { getTableData } from '../../../api';

class ChartDataTable extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            rows: []
        }
    }

    loadData()
    {
        let rows = [];
        getTableData(this.props.chartID, this.props.split, this.props.country, this.props.sector, this.props.answers, this.props.size)
            .then((response)=> response)
            .then((res) => {
            res.resultset.forEach(element => {
                let row = {}
                // When this flag is true, an existing row has been updated and the row doesn't need to be added
                let updatedRow = false;

                row.countryCode = element.countryCode;
                let countryDisplay = '';
                if (element.countryCode == 'EU27_2020' || element.countryCode == 'EU28' || this.props.countryDisplay == 'code')
                {
                    countryDisplay = element.countryCode;
                }
                else
                {
                    // Check if the countryCode needs to be shown
                    if (this.props.countryDisplay == 'name')
                    {
                        countryDisplay = element.countryName;
                    }
                    else if (this.props.countryDisplay == 'before')
                    {
                        countryDisplay = `(${element.countryCode}) ${element.countryName}`;
                    }
                    else if (this.props.countryDisplay == 'after')
                    {
                        countryDisplay = `${element.countryName} (${element.countryCode})`;
                    }
                }

                const value = this.props.showDecimals ? Math.round(element.value*10)/10 : Math.round(element.value);

                if (this.props.split == 'indicator')
                {
                    if (element.split == 67) {
                        // Vibrations
                        row.split = this.props.literals.L22153;
                    } else if (element.split == 68) {
                        // Loud noise
                        row.split = this.props.literals.L22155;
                    } else if (element.split == 69) {
                        // High temperatures
                        row.split = this.props.literals.L22156;
                    } else if (element.split == 70) {
                        // Low temperatures
                        row.split = this.props.literals.L22154;
                    } else if (element.split == 293 || element.split == 90) {
                        // Positions
                        row.split = this.props.literals.L22161;
                    } else if (element.split == 291 || element.split == 92) {
                        // Loads
                        row.split = this.props.literals.Loads;
                    } else if (element.split == 292 || element.split == 93) {
                        // Movements
                        row.split = this.props.literals.L22164;
                    } else if (element.split == 364 || element.split == 91) {
                        // Sitting
                        row.split = this.props.literals.L22163;
                    } else if (element.split == 94) {
                        // Lifting and moving
                        row.split = this.props.literals.L22162;
                    } else if (element.split == 353) {
                        // Employees and psychosocial risks
                        row.split = this.props.literals.L22171;
                    } else if (element.split == 357 || element.split == 96) {
                        // H&S delegate or committee
                        row.split = this.props.literals.L22172;
                    } else if (element.split == 355) {
                        // Employee representation
                        row.split = this.props.literals.L22173;
                    } else if (element.split == 361) {
                        // Regular H&S discussions
                        row.split = this.props.literals.L22174;
                    } else if (element.split == 359) {
                        // Controversial H&S discussions
                        row.split = this.props.literals.L22175;
                    } else if (element.split == 75) {
                        // Employee meetings
                        row.split = this.props.literals.L22176;
                    } else if (element.split == 95) {
                        // Representation of employees
                        row.split = this.props.literals.L22177;
                    }
                    row.country = countryDisplay;
                    row.value = value;
                }
                else if (this.props.split == 'answer')
                {
                    // Check if the current country has been added
                    if (rows.length > 0 && rows.filter((row)=>row.countryCode==element.countryCode).length > 0)
                    {
                        // The element has already been added
                        rows.filter((row)=>row.countryCode==element.countryCode)[0].answers.push(value);
                        updatedRow = true;
                    }
                    else
                    {
                        row.answers=[value];
                        row.country = countryDisplay;
                    }
                }
                else if ((this.props.split == 'size' || this.props.split == 'sector') && this.props.sameRow && this.props.sameRow === true)
                {
                    //debugger;
                    // Check if the current sector has been added
                    if (rows.length > 0 && rows.filter((row)=>row.split==element.split).length > 0)
                    {
                        // The sector has already been added
                        if (element.countryCode == this.props.country)
                        {
                            rows.filter((row)=>row.split==element.split)[0].country1 = countryDisplay;
                            rows.filter((row)=>row.split==element.split)[0].value1 = value;
                        }
                        else
                        {
                            rows.filter((row)=>row.split==element.split)[0].country2 = countryDisplay;
                            rows.filter((row)=>row.split==element.split)[0].value2 = value;
                        }
                    }
                    else
                    {
                        row.split = element.split;
                        if (element.countryCode == this.props.country)
                        {
                            row.country1 = countryDisplay;
                            row.value1 = value;
                        }
                        else
                        {
                            row.country2 = countryDisplay;
                            row.value2 = value;
                        }
                    }
                }
                else
                {
                    if (this.props.split != 'none')
                    {
                        row.split = element.split;
                    }                    
                    row.country = countryDisplay;
                    row.value = value;
                }
                
                if (!updatedRow)
                {
                    rows.push(row);
                }                
            });

            console.log('ChartID', this.props.chartID);
            console.log(rows);
            this.setState({rows: rows});
        });       
    }

    paintRow(tableRow)
    {
        let row;
        if (this.props.split == 'indicator')
        {
            row = <tr><th>{tableRow.split}</th><td>{tableRow.country}</td><td>{tableRow.value}</td></tr>
        }
        else if (this.props.split == 'answer')
        {
            row = <tr>
                <th>{tableRow.country}</th>
                {tableRow.answers.map(answer => (
                    <td key={answer}>{answer}</td>
                ))}
            </tr>
        }
        else if (this.props.sameRow && this.props.sameRow === true)
        {
            row = <tr><th>{tableRow.split}</th><td>{tableRow.country1}</td><td>{tableRow.value1}</td><td>{tableRow.country2}</td><td>{tableRow.value2}</td></tr>
        }

        return row;
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
            <table>
                <thead>
                    <tr>
                        {this.props.columns.map((column) => (
                            <th key={column}>{column}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {this.state.rows.map((tableRow) => (
                        <Fragment key={tableRow}>
                            {this.paintRow(tableRow)}
                        </Fragment>
                    ))}
                </tbody>
            </table>
        )
    }
}

export default ChartDataTable;