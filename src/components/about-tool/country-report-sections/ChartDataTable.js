import React, { Component } from 'react';
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
        getTableData(this.props.chartID, this.props.indicator, this.props.country)
            .then((response)=> response)
            .then((res) => {
            
            res.resultset.forEach(element => {
                console.log('Element', element);
                Object.entries(element.data).forEach(data => {
                    rows.push(data)
                })
            });

            this.setState({rows: rows});
        });       
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
        console.log('Columns', this.props.columns);
        console.log('Rows', this.state.rows);
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
                    {this.state.rows.map((row) => (
                        <tr key={row}>
                            {row.map(function(field, index){
                                if (index == 0)
                                {
                                    return (
                                        <th key={index}>{field}</th>
                                    )
                                }
                                return (
                                    <td key={index}>{field}</td>
                                )
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    }
}

export default ChartDataTable;