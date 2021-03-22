import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';

const relatedItems = require('../../model/adviceSection.json');
class AdviceSection extends Component
{

	constructor(props)
    {
        super(props);
        
        // Get the elements for the current section
        let rel = relatedItems;

        for (let i = 0; i < props.section.length; i++)
        {
            rel = rel[this.props.section[i]];			
        }
        this.state = {			
            items: rel			
        }
    }
    indicatorIcons(pItem)
    {
        return pItem.icon;		
    }
	content(str1){
		if(str1 == null){
			return null;
		} else {
			return <div className="text-advice">{ReactHtmlParser(str1)}</div>;
		}
	}
	sourceContent(str1,str2,str3){
		if(str1 == null){
			if(str2 == null){
				return null;
			}else{
				return <p><span className="">{str2}&nbsp;</span><span><Link className="" to={str3}>{this.props.literals.L20705}</Link></span></p>
			}
		} else if(str2 == null){
			return <p><span className="">{str1}&nbsp;</span></p>
		} else{
			return <p><span className="">{str1} {str2}&nbsp;</span><span><Link className="" to={str3}>{this.props.literals.L20705}</Link></span></p>
		}
	}

	render()
	{		
		return(
				<section data-ng-if="state.current.name != 'home'" id="not-home-cover" className="advice--icon--block advice--block-not-home background-main-light container-fluid section--page">
					{this.state.items.map(item =>					
					<div className="container horizontal-nopadding">
                         
							<div className="text-advice left-text col-md-8 col-sm-8 col-xs-12  nopadding">
								<h1 className="main-color left-text title--section">
									{this.props.literals[item.title]}
								</h1>								
								{this.content(this.props.literals[item.text])}
								{this.sourceContent(this.props.literals[item.source],this.props.literals[item.further],this.props.literals[item.link])}				
							</div>
							<div className={"icon--advice hide-mobile col-sm-4 col-md-4 "+this.indicatorIcons(item)}>
							</div>			
					</div>
					)}
				</section>

		)
	}
}

export default AdviceSection;