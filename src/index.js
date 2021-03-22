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
import CountryReport from './components/about-tool/CountryReport';
import CountryReportHome from './components/about-tool/CountryReportHome';

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
					path="/generic-information/economic-sector-profile/:country1?/:country2?" 
					render={routeParams => <App><EconomicSectorProfile country1={routeParams.match.params.country1} country2={routeParams.match.params.country2} literals={literals}/></App>} 
				/>
				<Route
					path="/generic-information/workforce-profile/:indicator/:subIndicator" 
					render={routeParams => <App><WorkforceProfile literals={literals} indicator={routeParams.match.params.indicator} subindicator={routeParams.match.params.subIndicator}/></App>} 
				/>

				<Route exact path="/osh-steering/country-profile/:indicator/:country1/:country2?" render={routeParams => <App><CountryProfile indicator={routeParams.match.params.indicator} country1={routeParams.match.params.country1} country2={routeParams.match.params.country2} literals={literals}/></App>} />
				<Route exact path="/osh-steering/eu-Challenges-response/:country" render={(props) => <App><EUChallengesResponse {...props} literals={literals}  /></App>} />
				<Route exact path="/osh-steering/national-strategies" render={() => <App><NationalStrategies literals={literals}/></App>} />
				<Route exact path="/osh-steering/regulation" render={() => <App><Regulation literals={literals}/></App>} />
				<Route exact path="/osh-steering/social-dialogue" render={() => <App><SocialDialogue literals={literals}/></App>} />

				<Route exact path="/osh-outcomes-working-conditions/health-perception" render={() => <App><HealthPerception literals={literals}/></App>} />
				<Route 
					path="/osh-outcomes-working-conditions/mental-risk/:indicator/:dataset" 
					render={routeParams => <App><MentalRisk literals={literals} indicator={routeParams.match.params.indicator} dataset={routeParams.match.params.dataset}/></App>} 
				/>
				<Route
					path="/osh-outcomes-working-conditions/osh-culture/:indicator" 
					render={routeParams => <App><OSHCulture literals={literals} indicator={routeParams.match.params.indicator} /></App>} 
				/>
				<Route exact path="/osh-outcomes-working-conditions/overall-opinion" render={() => <App><OverallOpinion literals={literals}/></App>} />
				<Route exact path="/osh-outcomes-working-conditions/physical-risk" render={() => <App><PhysicalRisk literals={literals}/></App>} />
				<Route 
					path="/osh-outcomes-working-conditions/prevention-companies/:indicator/:split/:country1?/:country2?" 
					render={routeParams => <App><PreventionCompanies literals={literals} indicator={routeParams.match.params.indicator} 
											split={routeParams.match.params.split} country1={routeParams.match.params.country1 } country2={routeParams.match.params.country2} /></App>} 
				/>
				<Route 
					path="/osh-outcomes-working-conditions/work-accidents/:indicator?" 
					render={routeParams => <App><WorkAccidents literals={literals} indicator={routeParams.match.params.indicator} /></App>} 
				/>
				<Route
					path="/osh-outcomes-working-conditions/worker-involvement/:split/:country1?/:country2?" 
					render={routeParams => <App><WorkerInvolvement literals={literals} split={routeParams.match.params.split} country1={routeParams.match.params.country1} country2={routeParams.match.params.country2}/></App>} 
				/>
				<Route exact path="/osh-outcomes-working-conditions/working-conditions" render={() => <App><WorkingConditions literals={literals}/></App>} />

				<Route
					path="/osh-infrastructure/enforcement-capacity/:indicator/:country1?/:country2?" 
					render={routeParams => <App><EnforcementCapacity literals={literals} indicator={routeParams.match.params.indicator} country1={routeParams.match.params.country1} country2={routeParams.match.params.country2} /></App>} 
				/>
				<Route 
					path="/osh-infrastructure/osh-statistics/:country?" 
					render={routeParams => <App><OSHStatistics literals={literals} country={routeParams.match.params.country} /></App>} 
				/>

				<Route exact path="/about-the-system" render={() => <App><GeneralInformation literals={literals}/></App>} />
				<Route exact path="/about-the-system/methodology" render={() => <App><CountryReport literals={literals}/></App>} />
				<Route exact path="/country-report" render={() => <App><CountryReportHome literals={literals}/></App>} />

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