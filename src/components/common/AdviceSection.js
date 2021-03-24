import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';

const adviceText = require('../../model/adviceSection.json');
class AdviceSection extends Component
{

	constructor(props)
    {
        super(props);
        
        // Get the elements for the current section
        let rel = adviceText;
		rel = rel[props.section[0]][props.section[1]][0];

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
			return <div className="text-advice">{ReactHtmlParser(this.props.literals[str1])}</div>;
		}
	}
	sourceContent(str1,str2,str3){
		//console.log('str1: '+str1 +'---------'+ 'str2: '+str2 +'------------------'+ 'str3: '+str3)
		if(!str1){
			if(!str2){
				return null;
			}else{
				return <p><span className="">{this.props.literals[str2]}&nbsp;</span><span><Link className="" to={str3}>{this.props.literals.L20705}</Link></span></p>
			}
		} else if(!str2){
			return <p><span className="">{this.props.literals[str1]}&nbsp;</span></p>
		} else{
			return <p><span className="">{this.props.literals[str1]} {this.props.literals[str2]}&nbsp;</span><span><Link className="" to={str3}>{this.props.literals.L20705}</Link></span></p>
		}
	}

	render()
	{	
		return(
				<section data-ng-if="state.current.name != 'home'" id="not-home-cover" className="advice--icon--block advice--block-not-home background-main-light container-fluid section--page">
					<div className="container horizontal-nopadding">                         
							<div className="text-advice left-text col-md-8 col-sm-8 col-xs-12  nopadding">
								<h1 className="main-color left-text title--section">
									{this.props.literals[this.state.items.title]}
								</h1>								
								{this.content(this.state.items.text)}
								{this.sourceContent(this.state.items.source,this.state.items.further,this.state.items.link)}				
							</div>
							<div className={"icon--advice hide-mobile col-sm-4 col-md-4 "+this.indicatorIcons(this.state.items)}>
							</div>			
					</div>
				</section>

		)
	}
}

export default AdviceSection;