import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PageNotFound extends Component
{
	componentDidMount()
	{
		// Update the title of the page
		document.title = "Page not found - " + this.props.literals.L22020 + " - " + this.props.literals.L363;
	}

	render()
	{
		return(
			<div className="mainBody">
				<div className="text-center error-404" >
					<div className="img-404"></div>
					<h1 className="title-section second-color ng-binding">Page not found</h1>
					<p>Sorry, we can't find what you are looking for.</p>
					<p>You could use the search above, instead or go back to <Link to="/"><i className="fa fa-home fa-2x" aria-hidden="true"></i>Home</Link></p>
				</div>
			</div>
		)
	}
}
PageNotFound.displayName = 'PageNotFound';
export default PageNotFound;