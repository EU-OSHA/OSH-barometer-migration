import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

const SeeMore = props => {
    const {text, toggleSeeMore, onCallbackToggle} = props;
    const [seeMore, setSeeMore] = useState(toggleSeeMore);

    const toggleText = () => {
        setSeeMore(!seeMore)
        onCallbackToggle(!seeMore)
    }

    useEffect(() => {
        setSeeMore(false);
        onCallbackToggle(false)
    }, [props.tabName])

    return (
        <Fragment>
            {text != undefined && text != '' && (
                text.length > props.maxCharacters && (
                    <p className="see-more">
                        {!seeMore ? (
                            <Link to={'#'} onClick={toggleText} className="see-more">{props.literals.L480}<i className="fa fa-angle-down" aria-hidden="true"></i></Link> 
                        ) : (
                            <Link to={'#'} onClick={toggleText} className="see-less" >{props.literals.L481}<i className="fa fa-angle-up" aria-hidden="true"></i></Link>
                        )}
                    </p>
                )
            )}
        </Fragment>
    )
}

export default SeeMore;