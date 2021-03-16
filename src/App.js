import React, { Component } from 'react';
import { useParams } from 'react-router-dom';

import Header from './components/common/Header';
import Footer from './components/common/Footer';

import './style/App.scss';

const App = ({children}) => 
{
	return(
		<div>
			<Header />
			
			{children}

			<Footer />
		</div>
	)
}

export default App;