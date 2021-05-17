import React, { Component } from 'react';
import { useParams } from 'react-router-dom';

import Header from './components/common/Header';
import Footer from './components/common/Footer';

import './style/App.scss';
import CookiesComponent from './components/common/cookies/CookiesComponent';

const App = (props) => 
{
	// props.children.type.name will contain the name of the component that will be painted between the Header and the Footer
	return(
		<div>
			<CookiesComponent literals={props.literals} />

			<Header literals={props.literals} child={props.children.type.displayName}/>

			{props.children}

			<Footer literals={props.literals} />
		</div>
	)
}

export default App;