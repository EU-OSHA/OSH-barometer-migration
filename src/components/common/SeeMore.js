import React from 'react';
import { Link } from 'react-router-dom';

const SeeMore = props => {
    const {text} = props;

    var html = "";

    function toggleText (event){
        props.toggleText(event)();
    }

    if(text != undefined && text != ""){
        if(text.length > props.maxCharacters){
            html = (
                <p className="see-more">
                    <Link to={'#'} onClick={toggleText} className="see-more">{props.literals.L480}<i className="fa fa-angle-down" aria-hidden="true"></i></Link> 
                    <Link to={'#'} onClick={toggleText} className="see-less" style={{display:'none'}}>{props.literals.L481}<i className="fa fa-angle-up" aria-hidden="true"></i></Link>
                </p>
            )
        }
    }

    return (
        <div>
            {html}
        </div>
    )
}

export default SeeMore;