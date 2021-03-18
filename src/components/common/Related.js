import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const relatedItems = require('../../model/related.json');

class Related extends Component
{
    constructor(props)
    {
        super(props);
        
        // Get the elements for the current section
        let rel = relatedItems;
        for (let i = 0; i < props.section.length; i++)
        {
            rel = rel[props.section[i]];
        }
        
        this.state = {
            items: rel
        }
    }

    indicatorIcons(pItem)
    {
        return pItem.icon+'-icon';
    }

    trimText(pText)
    {
        if (pText.length > 80)
        {
            return (<p className="text-related-item">{pText.substring(0, 80).split(" ").slice(0, -1).join(" ")}<span className='dots'>...</span></p>);
        }
        return (<p className="text-related-item">{pText}</p>);
    }

    render()
    {
        return(
            <section className="container-full section--page section--related--content">
                <div className="container related--content--wrapper">
                    <h2 className="title-related-content">{this.props.literals.L20712}</h2>
                    <div className="related-content-items">
                        {/* RELATED ITEMS */ }
                        {this.state.items.map(item => 
                            <div className="related-content-item">
                                <div className={"icon-related-item hide-mobile "+this.indicatorIcons(item)}></div>
                                <div className="content-related-item">
                                    <h3 className="title-related-item">{this.props.literals[item.title]}</h3>
                                    {this.trimText(this.props.literals[item.text])}
                                    <p className="button-related-item btn--block-full left-text">
                                        <Link className="btn-default btn-main-color" to={item.link}>{this.props.literals.L480}</Link>
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        )
    }
}

export default Related;