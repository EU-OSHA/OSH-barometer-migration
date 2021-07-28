import React, { Component, useEffect } from 'react';

import Header from './components/common/Header';
import Footer from './components/common/Footer';

import './style/App.scss';
import CookiesComponent from './components/common/cookies/CookiesComponent';
import { useDispatch, useSelector } from 'react-redux';
import { useMatomo } from '@datapunt/matomo-tracker-react'

import { setCountry2 } from './actions';

const App = (props) => 
{
	const { selectCountry, selectCountry2, lockedCountry } = useSelector((state) => state.selectCountries);
	const { trackPageView, enableLinkTracking } = useMatomo();
	const dispatch = useDispatch()

	// Run enableLinkTracking to track with Matomo the different pages visited by the user
	enableLinkTracking();

	useEffect(() => {
		if (!lockedCountry) {
			if (selectCountry == selectCountry2) {
				dispatch(setCountry2(''))
			}
		}
	}, [selectCountry, selectCountry2, lockedCountry])

	// Track with Matomo the current page
	useEffect(() => {
		trackPageView();
	}, [])

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