import React, { Component } from 'react';
import { useParams } from 'react-router-dom';

import Header from './components/common/Header';
import Footer from './components/common/Footer';

import './style/App.scss';

const App = (props) => 
{
	// props.children.type.name will contain the name of the component that will be painted between the Header and the Footer
	return(
		<div>
			<Header literals={props.literals} child={props.children.type.name}/>

			{props.children}

			<Footer literals={props.literals} />
		</div>
	)
}

export default App;