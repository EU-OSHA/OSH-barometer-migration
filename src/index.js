import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';

// App
import App from './App';
// Home
import Home from './components/home/Home';
// Generic information
import OSHAuthorities from './components/generic-information/OSHAuthorities';
import EconomicSectorProfile from './components/generic-information/EconomicSectorProfile';
import WorkforceProfile from './components/generic-information/WorkforceProfile';

// OSH Steering
import CountryProfile from './components/osh-steering/CountryProfile';
import EUChallengesResponse from './components/osh-steering/EUChallengesResponse';
import NationalStrategies from './components/osh-steering/NationalStrategies';
import Regulation from './components/osh-steering/Regulation';
import SocialDialogue from './components/osh-steering/SocialDialogue';

//osh-outcomes-working-conditions
import HealthPerception from './components/osh-outcomes-working-conditions/HealthPerception';
import MentalRisk from './components/osh-outcomes-working-conditions/MentalRisk';
import OSHCulture from './components/osh-outcomes-working-conditions/OSHCulture';
import OverallOpinion from './components/osh-outcomes-working-conditions/OverallOpinion';
import PhysicalRisk from './components/osh-outcomes-working-conditions/PhysicalRisk';
import PreventionCompanies from './components/osh-outcomes-working-conditions/PreventionCompanies';
import WorkAccidents from './components/osh-outcomes-working-conditions/WorkAccidents';
import WorkerInvolvement from './components/osh-outcomes-working-conditions/WorkerInvolvement';
import WorkingConditions from './components/osh-outcomes-working-conditions/WorkingConditions';

// OSH Infrastructure
import EnforcementCapacity from './components/osh-infrastructure/EnforcementCapacity';
import OSHStatistics from './components/osh-infrastructure/OSHStatistics';

// About Tool
import GeneralInformation from './components/about-tool/GeneralInformation';
import Methodology from './components/about-tool/Methodology';
import CountryReport from './components/about-tool/CountryReport';
import CountryReportHome from './components/about-tool/CountryReportHome';

// Footer
import Accesibility from './components/footer-pages/Accesibility';
import LegalNotice from './components/footer-pages/LegalNotice';
import PageNotFound from './components/footer-pages/PageNotFound';
import PrivacyPolicy from './components/footer-pages/PrivacyPolicy';
import Sitemap from './components/footer-pages/Sitemap';
import ScrollToTop from './components/common/hook/ScrollToTop';

//Matomo and Cookies
import { Cookies, CookiesProvider, useCookies } from 'react-cookie';
import { MatomoProvider, createInstance } from '@datapunt/matomo-tracker-react'

const store = createStore(reducer);
const literals = require('./model/Literals.json');

const PIWIK = process.env.PIWIK != undefined ? process.env.PIWIK : "local" ;
const DVT = process.env.DVT != undefined ? process.env.DVT : "local" ;
var configuration = require('../src/components/common/cookies/cookiesConfig.json');
var url = configuration.paths.piwik[PIWIK].protocol + ":" + configuration.paths.piwik[PIWIK].domain + ":" + configuration.paths.piwik[PIWIK].port + configuration.paths.piwik[PIWIK].path;
var basePath = configuration.paths.enviroment[DVT].domain + ":" + configuration.paths.enviroment[DVT].port + "/";
const instance = createInstance({
    urlBase: basePath, //https://LINK.TO.DOMAIN',
    siteId: configuration.paths.piwik[PIWIK].SiteId, //3
    trackerUrl: url+'piwik.php', //'https://LINK.TO.DOMAIN/tracking.php', // optional, default value: `${urlBase}matomo.php`
    srcUrl: url+'piwik.js', //'https://LINK.TO.DOMAIN/tracking.js', // optional, default value: `${urlBase}matomo.js`
    disabled: false, // optional, false by default. Makes all tracking calls no-ops if set to true.
    linkTracking: true, // optional, default value: true
});

ReactDOM.render(
	<MatomoProvider value={instance}>
	<CookiesProvider>
	<Provider store={store}>
		<BrowserRouter basename="osh-barometer" >
		<ScrollToTop>
			<Switch>
				<Route exact path="/" render={() => <App literals={literals}><Home literals={literals}/></App>} />
				<Route exact path="/generic-information/osh-authorities" render={() => <App literals={literals}><OSHAuthorities literals={literals}/></App>} />
				<Route 
					path="/generic-information/economic-sector-profile/:country1?/:country2?" 
					render={routeParams => <App literals={literals}><EconomicSectorProfile country1={routeParams.match.params.country1} country2={routeParams.match.params.country2} literals={literals}/></App>} 
				/>
				<Route
					path="/generic-information/workforce-profile/:indicator/" 
					render={routeParams => <App literals={literals}><WorkforceProfile literals={literals} indicator={routeParams.match.params.indicator} subindicator={routeParams.match.params.subIndicator}/></App>} 
				/>

				<Route exact path="/osh-steering/country-profile/:indicator/:country1/:country2?" render={routeParams => <App literals={literals}><CountryProfile indicator={routeParams.match.params.indicator} country1={routeParams.match.params.country1} country2={routeParams.match.params.country2} literals={literals}/></App>} />
				<Route exact path="/osh-steering/eu-Challenges-response/:country" render={(props) => <App literals={literals}><EUChallengesResponse {...props} literals={literals}  /></App>} />
				<Route exact path="/osh-steering/national-strategies" render={() => <App literals={literals}><NationalStrategies literals={literals}/></App>} />
				<Route exact path="/osh-steering/regulation" render={() => <App literals={literals}><Regulation literals={literals}/></App>} />
				<Route exact path="/osh-steering/social-dialogue" render={() => <App literals={literals}><SocialDialogue literals={literals}/></App>} />

				<Route exact path="/osh-outcomes-working-conditions/health-perception" render={() => <App literals={literals}><HealthPerception literals={literals}/></App>} />

				<Route
					path="/osh-outcomes-working-conditions/osh-culture/:indicator" 
					render={routeParams => <App literals={literals}><OSHCulture literals={literals} indicator={routeParams.match.params.indicator} /></App>} 
				/>

				<Route 
					path="/osh-outcomes-working-conditions/overall-opinion/:indicator/:country1?/:country2?" 
					render={routeParams => <App literals={literals}><OverallOpinion country1={routeParams.match.params.country1} country2={routeParams.match.params.country2} literals={literals} indicator={routeParams.match.params.indicator}  /></App>} 
				/>

				<Route 
					path="/osh-outcomes-working-conditions/mental-risk/:indicator/:dataset" 
					render={routeParams => <App literals={literals}><MentalRisk literals={literals} indicator={routeParams.match.params.indicator} dataset={routeParams.match.params.dataset}/></App>} 
				/>
				
				<Route 
					path="/osh-outcomes-working-conditions/physical-risk/vibrations-loud-noise-and-temperature/:country1?/:country2?" 
					render={routeParams => <App literals={literals} ><PhysicalRisk literals={literals} tab='vibrations-loud-noise-and-temperature' country1={routeParams.match.params.country1} country2={routeParams.match.params.country2}/></App>} 
				/>
				<Route 
					path="/osh-outcomes-working-conditions/physical-risk/exposure-to-dangerous-substances/:indicator" 
					render={routeParams => <App literals={literals} ><PhysicalRisk literals={literals} tab='exposure-to-dangerous-substances' indicator={routeParams.match.params.indicator} /></App>} 
				/>
				<Route 
					path="/osh-outcomes-working-conditions/physical-risk/ergonomic-risks/:dataset/:country1?/:country2?" 
					render={routeParams => <App literals={literals} ><PhysicalRisk literals={literals} tab='ergonomic-risks' dataset={routeParams.match.params.dataset} country1={routeParams.match.params.country1} country2={routeParams.match.params.country2}/></App>} 
				/>

				<Route 
					path="/osh-outcomes-working-conditions/prevention-companies/:indicator/:split?/:country1?/:country2?" 
					render={routeParams => <App literals={literals}><PreventionCompanies literals={literals} indicator={routeParams.match.params.indicator} 
					split={routeParams.match.params.split} country1={routeParams.match.params.country1 } country2={routeParams.match.params.country2} /></App>} 
				/>
				
				<Route 
					path="/osh-outcomes-working-conditions/work-accidents/:indicator?/:country1?/:country2?" 
					render={routeParams => <App literals={literals}><WorkAccidents literals={literals} indicator={routeParams.match.params.indicator}  country1={routeParams.match.params.country1} country2={routeParams.match.params.country2} /></App>} 
				/>
				<Route 
					path="/osh-outcomes-working-conditions/worker-involvement/:split?/:country1?/:country2?" 
					render={routeParams => <App literals={literals}><WorkerInvolvement literals={literals} split={routeParams.match.params.split} country1={routeParams.match.params.country1} country2={routeParams.match.params.country2} indicator={routeParams.match.params.indicator}/></App>} 
				/>
				<Route exact path="/osh-outcomes-working-conditions/working-conditions" render={routeParams => <App literals={literals}><WorkingConditions literals={literals} country1={routeParams.match.params.country1} country2={routeParams.match.params.country2}/></App>} />

				<Route
					path="/osh-infrastructure/enforcement-capacity/:indicator/:country1?/:country2?" 
					render={routeParams => <App literals={literals}><EnforcementCapacity literals={literals} indicator={routeParams.match.params.indicator} country1={routeParams.match.params.country1} country2={routeParams.match.params.country2} /></App>} 
				/>
				<Route 
					path="/osh-infrastructure/osh-statistics/:country?" 
					render={routeParams => <App literals={literals}><OSHStatistics literals={literals} country={routeParams.match.params.country} /></App>} 
				/>

				<Route exact path="/about-the-system" render={() => <App literals={literals}><GeneralInformation literals={literals}/></App>} />
				<Route exact path="/about-the-system/methodology" render={() => <App literals={literals}><Methodology literals={literals}/></App>} />
				<Route exact path="/country-report" render={() => <App literals={literals}><CountryReportHome literals={literals}/></App>} />

				<Route exact path="/accessibility" render={() => <App literals={literals}><Accesibility literals={literals}/></App>} />
				<Route exact path="/legal-notice" render={() => <App literals={literals}><LegalNotice literals={literals}/></App>} />
				<Route exact path="/page-not-found" render={() => <App literals={literals}><PageNotFound literals={literals}/></App>} />
				<Route exact path="/privacy-notice" render={() => <App literals={literals}><PrivacyPolicy literals={literals} /></App>} />
				<Route exact path="/sitemap" render={() => <App literals={literals}><Sitemap literals={literals}/></App>} />

			</Switch>
			</ScrollToTop>		
		</BrowserRouter>
	</Provider>
	</CookiesProvider>
	</MatomoProvider>, 
	document.getElementById('root')
);