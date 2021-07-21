import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Link } from 'react-router-dom';

const CarouselCards = (props) => {
    // function to trim the passed text
    const truncateText = (str, limitNumber) => {	
        if (str.length > limitNumber) {
            return `${str.substring(0, limitNumber).split(" ").slice(0, -1).join(" ")} <span class="dots" >...</span>`
        } else {			
            return str
        }
    }

    return (
        <div className={`col-xs-12 col-sm-6 col-md-4 col-ml-3 col-lg-2 cloned`}>
				<div className="content">
					<Link 
                        className={`icon--card ${props.cardItem.icon}`} 
                        to={props.cardItem.url} 
                    />
					<h3 className="title--card">					
                        <Link to={props.cardItem.url}>
                            {props.literals[`L${props.cardItem.titleLiteral}`]}
                        </Link>
					</h3>
					<p class="content-text">
                        {ReactHtmlParser(truncateText(props.literals[`L${props.cardItem.bodyLiteral}`], 100))}
                    </p>
				</div>
			<p className="btn--card--carousel">
				<Link 
                    to={props.cardItem.url} 
                    className="btn-default btn-main-color btn-full" >
				    {props.literals.L22026}
				</Link>
			</p>
	</div>
    );
};

export default CarouselCards;