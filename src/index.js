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


// Footer
import Accesibility from './components/footer-pages/Accesibility';
import LegalNotice from './components/footer-pages/LegalNotice';
import PageNotFound from './components/footer-pages/PageNotFound';
import PrivacyPolicy from './components/footer-pages/PrivacyPolicy';
import Sitemap from './components/footer-pages/Sitemap';

const store = createStore(reducer);

const literals = require('./model/Literals.json');

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter >
			<Switch>
				<Route exact path="/" render={() => <App><Home literals={literals}/></App>} />
				<Route exact path="/generic-information/osh-authorities" render={() => <App><OSHAuthorities literals={literals}/></App>} />
				<Route 
					path="/generic-information/economic-sector-profile/:country1/:country2?" 
					render={routeParams => <App><EconomicSectorProfile country1={routeParams.match.params.country1} country2={routeParams.match.params.country2} literals={literals}/></App>} 
				/>
				<Route exact path="/generic-information/workforce-profile" render={() => <App><WorkforceProfile literals={literals}/></App>} />

				<Route exact path="/osh-steering/country-profile" render={() => <App><CountryProfile literals={literals}/></App>} />
				<Route exact path="/osh-steering/eu-Challenges-response" render={() => <App><EUChallengesResponse literals={literals}/></App>} />
				<Route exact path="/osh-steering/national-strategies" render={() => <App><NationalStrategies literals={literals}/></App>} />
				<Route exact path="/osh-steering/regulation" render={() => <App><Regulation literals={literals}/></App>} />
				<Route exact path="/osh-steering/social-dialogue" render={() => <App><SocialDialogue literals={literals}/></App>} />



				<Route exact path="/osh-outcomes-working-conditions/health-perception" render={() => <App><HealthPerception literals={literals}/></App>} />
				<Route exact path="/osh-outcomes-working-conditions/mental-risk" render={() => <App><MentalRisk literals={literals}/></App>} />
				<Route exact path="/osh-outcomes-working-conditions/osh-culture" render={() => <App><OSHCulture literals={literals}/></App>} />
				<Route exact path="/osh-outcomes-working-conditions/overall-opinion" render={() => <App><OverallOpinion literals={literals}/></App>} />
				<Route exact path="/osh-outcomes-working-conditions/physical-risk" render={() => <App><PhysicalRisk literals={literals}/></App>} />
				<Route exact path="/osh-outcomes-working-conditions/prevention-companies" render={() => <App><PreventionCompanies literals={literals}/></App>} />
				<Route exact path="/osh-outcomes-working-conditions/work-accidents" render={() => <App><WorkAccidents literals={literals}/></App>} />
				<Route exact path="/osh-outcomes-working-conditionsosh-steering/worker-involvement" render={() => <App><WorkerInvolvement literals={literals}/></App>} />
				<Route exact path="/osh-outcomes-working-conditions/working-conditions" render={() => <App><WorkingConditions literals={literals}/></App>} />


				<Route exact path="/osh-infrastructure/enforcement-capacity" render={() => <App><EnforcementCapacity literals={literals}/></App>} />
				<Route exact path="/osh-infrastructure/osh-statistics" render={() => <App><OSHStatistics literals={literals}/></App>} />


				<Route exact path="/accesibility" render={() => <App><Accesibility literals={literals}/></App>} />
				<Route exact path="/legal-notice" render={() => <App><LegalNotice literals={literals}/></App>} />
				<Route exact path="/page-not-found" render={() => <App><PageNotFound literals={literals}/></App>} />
				<Route exact path="/privacy-policy" render={() => <App><PrivacyPolicy literals={literals}/></App>} />
				<Route exact path="/sitemap" render={() => <App><Sitemap literals={literals}/></App>} />

			</Switch>		
		</BrowserRouter>
	</Provider>, 
	document.getElementById('root')
);