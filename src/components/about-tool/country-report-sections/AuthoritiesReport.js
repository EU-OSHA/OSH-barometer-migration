import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { getOSHData } from '../../../api';
import images from '../../../style/img/flag/images';

class AuthoritiesReport extends Component
{

    constructor(props){
        super(props);
        this.state = {
            matrixPageData: [],
            isFetching: false,
        }
    }

    getData = () => {
        try {
            getOSHData('MATRIX_AUTHORITY', { countries: [{ code: this.props.country }] })
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

    getAuthorityTitle = (data, index) => {
        let realIndex = index != 0 ? index-1 : 0 ;
        if(data.check1 === true && (this.state.matrixPageData[realIndex].check1 != true || (realIndex === 0 && index === 0))){
            return <h3>{this.props.literals.L20614}</h3>
        }else if(data.check2 === true && this.state.matrixPageData[realIndex].check2 != true){
            return <h3>{this.props.literals.L20611}</h3>
        }else if(data.check3 === true && this.state.matrixPageData[realIndex].check3 != true){
            return <h3>{this.props.literals.L20612}</h3>
        }else if(data.check4 === true && this.state.matrixPageData[realIndex].check4 != true){
            return <h3>{this.props.literals.L20613}</h3>
        }
    }

    render(){
        return (
            <div>
                {
                    this.state.matrixPageData.length <= 0 ? (
                        <span>{this.props.literals.L20706}</span>
                    ) : ""
                }
                {
                    this.state.matrixPageData.map((data, index) => (
                        <div className={`clearfix osh-authorities-items ${(data.check2 === true && index === 3 && this.props.country === "AT") ? "page-break-before" : ""}`}
                            key={index}>
                            {
                                (index == 0) ? (
                                    <div>
                                        <header>
                                            <img className="flag" src={images[this.props.country.toLowerCase()]}/>
                                            <h2 className="country title-section main-color">{this.props.literals["L"+data.country.literalID]}</h2>
                                        </header>
                                    </div>
                                ) : ""
                            }
                            
                            <div className="matrix--content--elements">
                                { this.getAuthorityTitle(data, index) }
                                <div className={`box-rounded ${(data.check2 === true && index === 3 && this.props.country === "AT") ? "page-break-before" : ""}`}>
                                    <p className="institution-name">
                                        {ReactHtmlParser(this.props.literals["L"+data.text1])}
                                    </p>
                                    <div>
                                        {ReactHtmlParser(this.props.literals["L"+data.text2])}
                                    </div>
                                    <div className="text">
                                        {ReactHtmlParser(this.props.literals["L"+data.text3])}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
}

export default AuthoritiesReport;