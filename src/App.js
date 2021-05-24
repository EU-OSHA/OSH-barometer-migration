import React, { Component } from 'react';

import Header from './components/common/Header';
import Footer from './components/common/Footer';

import './style/App.scss';
import CookiesComponent from './components/common/cookies/CookiesComponent';

const App = (props) => 
{
	// props.children.type.displayName will contain the name of the component that will be painted between the Header and the Footer
	let child = props.children.type.displayName;
	// When using mapStateToProps, the displayName of the component changes
	if (child.indexOf("Connect(") > -1)
	{
		child = child.substring(0,child.length-1).replace("Connect(","");
	}
	return(
		<div>
			<CookiesComponent literals={props.literals} />

			<Header literals={props.literals} child={child}/>

			{props.children}

			<Footer literals={props.literals} />
		</div>
	)
}

export default App;