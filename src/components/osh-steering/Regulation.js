import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import $ from "jquery";
import AdviceSection from '../common/AdviceSection';

class Regulation extends Component
{
	componentDidMount(){
		// Update the title of the page
		document.title = this.props.literals.L22006 +  " - " + this.props.literals.L22020 + " - " + this.props.literals.L363;

        // footer at te bottom side for coming soon status
        if( $('.coming-soon').length > 0 ){
			var h = Number( $('header').height() + 240 + 60 +74  ) ;
			var w = $(window).height();
			var f = $('footer').height();
			$('.coming-soon').css('height', w-h-f);
		  }else {
			 $('.coming-soon').remove();
		  }
		  
		  $(window).on("resize",function(e){
			// footer at te bottom side for coming soon status
			if( $('.coming-soon').length > 0 ){
			  var h = Number( $('header').height() +  240 + 60 +74  ) ;
			  var w = $(window).height();
			  var f = $('footer').height();
			  $('.coming-soon').css('height', w-h-f);
			}else {
			   $('.coming-soon').remove();
			}
		  });
	}
	render()
	{
		return(
			<div className="regulation">
				<AdviceSection literals={this.props.literals} section={["osh-steering","regulation"]} />

				<section className="coming-soon"></section>
			</div>
		)
	}
}
Regulation.displayName = 'Regulation';
export default Regulation;