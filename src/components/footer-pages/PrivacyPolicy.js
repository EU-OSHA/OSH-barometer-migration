import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Link } from 'react-router-dom';

class PrivacyPolicy extends Component
{
	render()
	{
		return(
			<div>
				<h1 class="title-section second-color ng-binding text-center" data-ng-bind="i18nLiterals.L359">
					{this.props.literals.L359}
				</h1>
				<div class="container legal--notice--block">
					<h2 class="title-section main-color" data-ng-bind-html="i18n.organizational">
						{ReactHtmlParser(this.props.literals.L356)}
					</h2>
					<div data-ng-bind-html="i18n.Andrew">
						{ReactHtmlParser(this.props.literals.L356)}
					</div>
					
					<h2 class="title-section main-color" data-ng-bind-html="i18n.Purpose">
						{ReactHtmlParser(this.props.literals.L356)}
					</h2>
					<div data-ng-bind-html="i18n.forThe">
						{ReactHtmlParser(this.props.literals.L356)}
					</div>
					
					<h2 class="title-section main-color" data-ng-bind-html="i18n.Type">
						{ReactHtmlParser(this.props.literals.L356)}
					</h2>
					<div data-ng-bind-html="i18n.Those"></div>
					<div data-ng-bind-html="i18n.ulTypeData" class="list--tag--block"></div>
					
					<h2 class="title-section main-color" data-ng-bind-html="i18n.LegalBasis"></h2>
					<div data-ng-bind-html="i18n.Council"></div>
					
					<h2 class="title-section main-color" data-ng-bind-html="i18n.Lawfulness"></h2>
					<div data-ng-bind-html="i18n.TheProcessing"></div>
					
					<h2 class="title-section main-color" data-ng-bind-html="i18n.DataRecipients"></h2>
					<div data-ng-bind-html="i18n.accessToPersonal"></div>
					<div data-ng-bind-html="i18n.DulyAppointed"></div>
					<div data-ng-bind-html="i18n.AllTheRecipients"></div>
					
					<h2 class="title-section main-color" data-ng-bind-html="i18n.Cookies"></h2>
					<div data-ng-bind-html="i18n.cookiesText"></div>

					<div class="box">
						<div id='box1'>
							<p data-ng-bind-html="textBox"></p>
							<p>
								<input type='checkbox' data-ng-click="oculta()" /> <strong data-ng-bind-html="textCheck"></strong>
							</p>
						</div>
					</div>
					
					<h2 class="title-section main-color" data-ng-bind-html="i18n.TheDataS"></h2>
					<div data-ng-bind-html="i18n.textDataSubjects"></div>
					
					<h2 class="title-section main-color" data-ng-bind-html="i18n.InformationConservation"></h2>
					<div data-ng-bind-html="i18n.TheInformation"></div>
					
					<h2 class="title-section main-color" data-ng-bind-html="i18n.SecurityMeasures"></h2>
					<div data-ng-bind-html="i18n.WeTakeAp"></div>
					
					<h2 class="title-section main-color" data-ng-bind-html="i18n.Request"></h2>
					<div data-ng-bind-html="i18n.ForAnyF"></div>
					
					<h2 class="title-section main-color" data-ng-bind-html="i18n.Recourse"></h2>
					<div data-ng-bind-html="i18n.DataSub"></div>

					<h2 class="title-section main-color" data-ng-bind-html="i18n.Processing"></h2>
					<div data-ng-bind-html="i18n.DateAccess"></div>
				</div>
			</div>
		)
	}
}

export default PrivacyPolicy;