import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ReactHtmlParser from 'react-html-parser';

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

    trimText = (pText) => {
        const replacedText = pText.slice(/<\/*[a-z][a-z0-9]*[^<>]*>|<!--.*?-->/img);

        if (replacedText.length > 80) {
            if (pText.match(/<[^>]+>/)) {
                return (`${pText.substring(0, 80).split(" ").slice(0, -1).join(" ")}<span class='dots'>...</span>`);
            } else {
                return (`<p class="text-related-item">${pText.substring(0, 80).split(" ").slice(0, -1).join(" ")}<span class='dots'>...</span></p>`);
            }
        }
        return (`<p class="text-related-item">${pText}</p>`);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.section != this.props.section) {
            let rel = relatedItems;
            for (let i = 0; i < this.props.section.length; i++) {
                rel = rel[this.props.section[i]];
            }
            this.setState({ items: rel })
        }
    }

    buildLink(link, params)
    {
        if (params != undefined)
        {
            let linkText = link;
            for (let i = 0; i < params.length; i++)
            {
                if (this.props[params[i]] != undefined)
                {
                    linkText = linkText+'/'+this.props[params[i]];
                }
            }
            return linkText;
        }
        return link;
    }

    render()
    {
        return(
            <section className="container-full section--page section--related--content">
                <div className="container related--content--wrapper">
                    <h2 className="title-related-content">{this.props.literals.L20712}</h2>
                    <div className="related-content-items">
                        {/* RELATED ITEMS */ }
                        {this.state.items.map((item, index) => 
                            <div key={`tab-${index}`} className="related-content-item">
                                <div className={"icon-related-item hide-mobile "+this.indicatorIcons(item)}></div>
                                <div className="content-related-item">
                                    <h3 className="title-related-item">{this.props.literals[item.title]}</h3>
                                    {ReactHtmlParser(this.trimText(this.props.literals[item.text]))}
                                    <p className="button-related-item btn--block-full left-text">
                                        <Link className="btn-default btn-main-color" to={this.buildLink(item.link, item.linkParams)}>{this.props.literals.L480}</Link>
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