import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import $ from "jquery";

class Footer extends Component
{
	gotoTop() {
        $('html,body').animate({ 'scrollTop': 0 }, 'slow');
    };
	render()
	{
		return(
			<div>
				<p className="go-to">
					<a onClick={this.gotoTop}  title="Go to top"></a>
				</p>
				<footer className="bar-container nopadding container-fluid">
					<div className="footer-elements">
						<p className="copyright col-xs-12 col-md-5">© 2021  EU-OSHA | <a href="https://osha.europa.eu/" target="_blank" data-ng-bind="i18n.L362"></a>
						</p>
						<ul className="footer-nav-accessibility list-inline col-xs-12 col-md-5">						  
							<li>
								<NavLink to="/sitemap" accessKey="M" className="menu__link"><span data-ng-bind="i18n.L356">Site map</span></NavLink>
							</li>
							<li>
								<a target="_blank" href="https://osha.europa.eu/en/contact-us" accessKey="C" className="menu__link"> <span data-ng-bind="i18n.L357">Contact us</span></a>
							</li>
							<li>
								<NavLink to='/accesibility' accessKey="K" className="menu__link"> <span data-ng-bind="i18n.L358">Accessibility</span> </NavLink>
							</li>
							<li>
								<NavLink to="/privacy-policy" accessKey="P" className="menu__link"> <span data-ng-bind="i18n.L359">Privacy notice</span></NavLink>
							</li>
							<li>
								<NavLink to='/legal-notice' accessKey="N" className="menu__link"> <span data-ng-bind="i18n.L360">Legal notice</span></NavLink>
							</li>
						</ul>
						<ul className="footer-social-network list-inline col-xs-12 col-md-3 pull-right">
							<li>
								<a target="_blank" href="https://twitter.com/eu_osha" title="{{i18n.L370}}" className="menu__link">
									<i className="fa fa-twitter" aria-hidden="true"></i>
									<span className="sr-only" data-ng-bind="i18n.L370"></span>
								</a>
							</li>
							<li>
								<a target="_blank" href="https://www.facebook.com/EuropeanAgencyforSafetyandHealthatWork" title="{{i18n.L371}}" className="menu__link">
									<i className="fa fa-facebook" aria-hidden="true"></i>
									<span className="sr-only" data-ng-bind="i18n.L371"></span>
								</a>
							</li>
							<li>
								<a target="_blank" href="http://www.linkedin.com/company/european-agency-for-safety-and-health-at-work" title="{{i18n.L372}}" className="menu__link">
									<i className="fa fa-linkedin" aria-hidden="true"></i>
									<span className="sr-only" data-ng-bind="i18n.L372"></span>
								</a>
							</li>
							<li>
								<a target="_blank" href="https://www.youtube.com/user/EUOSHA" title="{{i18n.L482}}" className="menu__link">
									<i className="fa fa-youtube-play" aria-hidden="true"></i>
									<span className="sr-only" data-ng-bind="i18n.L482"></span>
								</a>
							</li>
							<li>
								<a target="_blank" href="https://www.flickr.com/photos/euosha/albums" title="{{i18n.L483}}" className="menu__link">
									<i className="fa fa-flickr"></i>
									<span className="sr-only" data-ng-bind="i18n.L483"></span>
								</a>
							</li>
							<li>
								<a target="_blank" href="https://www.slideshare.net/EUOSHA" title="{{i18n.L691}}" className="menu__link">
									<i className="fa fa-slideshare" aria-hidden="true"></i><span className="sr-only" data-ng-bind="i18n.L691"></span>
								</a>
							</li>
						</ul>
					</div>
				</footer>
			</div>
		)
	}
}

export default Footer;