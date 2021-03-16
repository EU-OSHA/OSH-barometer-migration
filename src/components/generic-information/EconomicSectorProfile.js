import React, { Component } from 'react';

import Methodology from '../common/Methodology';

class EconomicSectorProfile extends Component
{
	constructor(props)
	{
		super(props);
		console.log('props', props);
	}

	render()
	{
		return(
			<div>
				<section data-ng-if="state.current.name != 'home'" id="not-home-cover" className="advice--icon--block advice--block-not-home background-main-light container-fluid section--page ng-scope">
					<div className="container horizontal-nopadding">
						<div className="left-text col-md-8 col-sm-8 col-xs-12 nopadding">
							<h1 className="main-color left-text ng-binding" data-ng-bind="i18nLiterals.L22003">Economic and sector profile</h1>
							<p data-ng-bind-html="i18nLiterals.L22028" className="ng-binding">
							<p>The indicator ‘Economic and sector profile’ displays relevant data on the economy and sectoral structure of the EU and its Member States, e.g. percentages of company size, employment per sector and information on gross domestic product. Note: Not all data is available for every country.</p>
							</p><span data-ng-bind="(i18nLiterals.L20696)+(' ')+(i18nLiterals.L20704)" className="ng-binding">Source: EUROSTAT. For further information refer to</span> <span><a data-ng-bind="i18nLiterals.L20705" ui-sref="about-tool-detail-page({pSection: 'generic-information', pSubsection: 'economic_sector_profile', pIndicator: '31'})" class="ng-binding" href="#!/about-the-system/methodology">Methodology</a></span>
						</div>
						<div className="icon--advice economic-chart-icon hide-mobile col-sm-4 col-md-4"></div>
					</div>
				</section>

				<div className="compare--block container">
					{/* FILTERS */}
					<form className="compare--block--form">
						<ul className="compare--list">
							{/* 1ST COUNTRY FILTER */}
							<li>
								<label htmlFor="datafor" data-ng-bind="i18nLiterals.L20609" className="">DATA FOR</label>
								<select className="select2-container select2-offscreen" tabIndex="-1" title="">
								<option value="AT">(AT) Austria</option>
								<option value="BE">(BE) Belgium</option>
								<option value="BG">(BG) Bulgaria</option>
								<option value="CH">(CH) Switzerland</option>
								<option value="CY">(CY) Cyprus</option>
								<option value="CZ">(CZ) Czechia</option>
								<option value="DE">(DE) Germany</option>
								<option value="DK">(DK) Denmark</option>
								<option value="EE">(EE) Estonia</option>
								<option value="EL">(EL) Greece</option>
								<option value="ES">(ES) Spain</option>
								<option value="FI">(FI) Finland</option>
								<option value="FR">(FR) France</option>
								<option value="HR">(HR) Croatia</option>
								<option value="HU">(HU) Hungary</option>
								<option value="IE">(IE) Ireland</option>
								<option value="IS">(IS) Iceland</option>
								<option value="IT">(IT) Italy</option>
								<option value="LT">(LT) Lithuania</option>
								<option value="LU">(LU) Luxembourg</option>
								<option value="LV">(LV) Latvia</option>
								<option value="MT">(MT) Malta</option>
								<option value="NL">(NL) Netherlands</option>
								<option value="NO">(NO) Norway</option>
								<option value="PL">(PL) Poland</option>
								<option value="PT">(PT) Portugal</option>
								<option value="RO">(RO) Romania</option>
								<option value="SE">(SE) Sweden</option>
								<option value="SI">(SI) Slovenia</option>
								<option value="SK">(SK) Slovakia</option>
								</select>
							</li>
							{/* 2ND COUNTRY FILTER */}
							<li>
								<label htmlFor="comparewith" data-ng-bind="i18nLiterals.L20610" className="">COMPARE WITH</label>
								<select className="select2-container select2-offscreen" tabIndex="-1" title="">
								<option value="0">Country</option>
								<option value="BE">(BE) Belgium</option>
								<option value="BG">(BG) Bulgaria</option>
								<option value="CH">(CH) Switzerland</option>
								<option value="CY">(CY) Cyprus</option>
								<option value="CZ">(CZ) Czechia</option>
								<option value="DE">(DE) Germany</option>
								<option value="DK">(DK) Denmark</option>
								<option value="EE">(EE) Estonia</option>
								<option value="EL">(EL) Greece</option>
								<option value="ES">(ES) Spain</option>
								<option value="FI">(FI) Finland</option>
								<option value="FR">(FR) France</option>
								<option value="HR">(HR) Croatia</option>
								<option value="HU">(HU) Hungary</option>
								<option value="IE">(IE) Ireland</option>
								<option value="IS">(IS) Iceland</option>
								<option value="IT">(IT) Italy</option>
								<option value="LT">(LT) Lithuania</option>
								<option value="LU">(LU) Luxembourg</option>
								<option value="LV">(LV) Latvia</option>
								<option value="MT">(MT) Malta</option>
								<option value="NL">(NL) Netherlands</option>
								<option value="NO">(NO) Norway</option>
								<option value="PL">(PL) Poland</option>
								<option value="PT">(PT) Portugal</option>
								<option value="RO">(RO) Romania</option>
								<option value="SE">(SE) Sweden</option>
								<option value="SI">(SI) Slovenia</option>
								<option value="SK">(SK) Slovakia</option>
								</select>
							</li>
						</ul>
					</form>
				</div>

				<section className="container section--page">
					<div className="card--grid xxs-w1 xs-w2 w3 center-text">
						{/* CONTENT */}{/* COMPANY SIZE */}
						<div className="card--block--chart">
							<div className="chart--block">
								<div className="card--block--chart--wrapper ng-isolate-scope" query="getCompanySizeData" cda="osha-dvt-barometer/dashboards/generic_information.cda" width="330" height="400" orientation="horizontal" axis-percent="1" axis-fixed-max="100" axis-fixed-min="0" step="20" params="[['pIndicator','31'],['pCountry1', pCountry1],['pCountry2', pCountry2],['pDataset', datasetEurostat]]" color-role="series" colors="[stories[0].color1, stories[0].color2, 
								stories[0].color3, stories[0].color4, stories[0].color5]" chart-title="Company size" id="1" base-axis-label-visible="true" css-className="company-size" axis-label-font="12px 'OpenSans-bold'" base-axis-label-text-baseline="center" base-axis-band-size-ratio="0.9" label-text-align="stories[0].labelTextAlign" values-visible="true" values-overflow="show" values-font="14px 'OpenSans-bold'" values-mask="{value}" dimensions="stories[0].dimensions" base-axis-size="60" legend="true" legend-align="center" plots="stories[0].plots" multiple-label-colors="true" leaf-content-overflow="visible" datasource-and-dates="[datasetEurostat,31]">

								<ul className="chart--submenu " ng-if="!isMaximized">
									<li><a onClick="open(items[0].action)" className="maximize-button" title="Maximize" role="button"><label className="sr-only " data-ng-bind="items[0].text">Maximize</label></a></li>
									<li className="dropdown-toggle" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"><a href=""><label className="sr-only">Download</label></a></li>
									<ul className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1">
										<li><a onClick="open(items[2].action)" role="button" data-ng-bind="items[2].text" className="">Export as image</a></li>
										<li><a onClick="open(items[1].action)" role="button" data-ng-bind="items[1].text" className="">Download raw data</a></li>
									</ul>
								</ul>

								<h2 ng-if="(!!chartTitle &amp;&amp; !isMaximized &amp;&amp; !titleH3) || (isMaximized &amp;&amp; !longTitle)" data-ng-bind-html="chartTitle" className="title--card  ">Company size</h2>

								<div className="chart--wrapper">
									<div className="legend-text-block">
									</div>
								</div>
								</div>
							</div>
						</div>
						{/* EMPLOYMENT PER SECTOR */}
						<div className="card--block--chart">
							<div className="chart--block">
								<div className="card--block--chart--wrapper ng-isolate-scope" query="getEmploymentPerSectorData" cda="osha-dvt-barometer/dashboards/generic_information.cda" width="300" height="400" orientation="horizontal" axis-percent="1" axis-fixed-max="100" step="20" params="[['pIndicator','32'],['pCountry1', pCountry1],['pCountry2', pCountry2],['pDataset', datasetEurostat2020]]" color-role="series" colors="[stories[1].color1, stories[1].color2, stories[1].color3, stories[1].color4, stories[1].color5, stories[1].color6, stories[1].color7]" chart-title="Employment per sector" id="2" stacked="1" plots="stories[1].plots" base-axis-band-size-ratio="0.40" axis-label-font="12px 'OpenSans-bold'" base-axis-label-text-baseline="center" dimensions="stories[1].dimensions" base-axis-size="60" legend="true" legend-align="center" legend-item-size="270" multiple-label-colors="true" datasource-and-dates="[datasetEurostat2020,32]">

								<ul className="chart--submenu " ng-if="!isMaximized">
									<li><a onClick="open(items[0].action)" className="maximize-button" title="Maximize" role="button"><label className="sr-only " data-ng-bind="items[0].text">Maximize</label></a></li>
									<li className="dropdown-toggle" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"><a href=""><label className="sr-only">Download</label></a></li>
									<ul className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1">
										<li><a onClick="open(items[2].action)" role="button" data-ng-bind="items[2].text" className="">Export as image</a></li>
										<li><a onClick="open(items[1].action)" role="button" data-ng-bind="items[1].text" className="">Download raw data</a></li>
									</ul>
								</ul>

								<h2 ng-if="(!!chartTitle &amp;&amp; !isMaximized &amp;&amp; !titleH3) || (isMaximized &amp;&amp; !longTitle)" data-ng-bind-html="chartTitle" className="title--card  ">Employment per sector</h2>

								<div className="chart--wrapper">
									<div className="legend-text-block">
									</div>
								</div>
								</div>
							</div>
						</div>
						{/* EMPLOYMENT RATE */}
						<div className="card--block--chart">
							<div className="chart--block">
								<div className="card--block--chart--wrapper ng-isolate-scope" query="getEmploymentRateData" cda="osha-dvt-barometer/dashboards/generic_information.cda" width="330" height="380" axis-percent="1" orientation="horizontal" axis-fixed-min="50" axis-fixed-max="100" step="10" params="[['pIndicator','33'],['pCountry1', pCountry1],['pCountry2', pCountry2],['pDataset', datasetEurostat2019]]" color-role="category" colors="[stories[2].color3, stories[2].color2, stories[2].color1]" chart-title="Employment rate" id="3" base-axis-label-visible="true" axis-label-font="12px 'OpenSans-bold'" base-axis-label-text-baseline="center" base-axis-band-size-ratio="0.5" values-visible="true" values-overflow="show" values-font="14px 'OpenSans-bold'" values-mask="{value}" plots="stories[2].plots" dimensions="stories[2].dimensions" base-axis-size="60" label-text-align="stories[2].labelTextAlign" multiple-label-colors="true" legend="true" custom-label="true" datasource-and-dates="[datasetEurostat2019, 33]">

								<ul className="chart--submenu " ng-if="!isMaximized">
									<li><a onClick="open(items[0].action)" className="maximize-button" title="Maximize" role="button"><label className="sr-only " data-ng-bind="items[0].text">Maximize</label></a></li>
									<li className="dropdown-toggle" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"><a href=""><label className="sr-only">Download</label></a></li>
									<ul className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1">
										<li><a onClick="open(items[2].action)" role="button" data-ng-bind="items[2].text" className="">Export as image</a></li>
										<li><a onClick="open(items[1].action)" role="button" data-ng-bind="items[1].text" className="">Download raw data</a></li>
									</ul>
								</ul>

								<h2 ng-if="(!!chartTitle &amp;&amp; !isMaximized &amp;&amp; !titleH3) || (isMaximized &amp;&amp; !longTitle)" data-ng-bind-html="chartTitle" className="title--card  ">Employment rate</h2>

								<div className="chart--wrapper">
									<div className="legend-text-block">
									</div>
								</div>
								</div>
							</div>
						</div>
						{/* GDP PER CAPITA IN RELATION TO EU27_2020 AVERAGE */}
						<div className="card--block--chart">
							<div className="select-filter-chart-wrapper">
								<div className="select-filter-chart ng-isolate-scope ng-valid" chart="GDP" ng-model="dashboard.parameters.pSplit">
								{/* ngIf: chart == 'GDP' */}
								<select ng-if="chart == 'GDP'" ng-model="pSplit" ng-change="changeType('split1', pSplit)" className="ng-pristine ng-untouched ng-valid ">
									<option value="35">Purchasing Power Standards (PPS)</option>
									<option value="278">Euro (€)</option>
								</select>

								</div>
							</div>
							<div className="chart--block with-filter">
								<div className="card--block--chart--wrapper ng-isolate-scope" query="getGDPData" cda="osha-dvt-barometer/dashboards/generic_information.cda" height="370" orientation="vertical" listen-to="['pSplit']" axis-fixed-max="260" step="100" params="[['pIndicator','pSplit'],['pCountry1', pCountry1],['pCountry2', pCountry2],['pDataset', datasetEurostat2019]]" color-role="category" colors="[stories[4].color1, stories[4].color2, stories[4].color3]" chart-title="GDP per capita in relation to EU27_2020 average" id="5" plots="stories[4].plots" base-axis-position="top" axis-label-font="12px 'OpenSans-bold'" values-visible="true" values-font="12px 'OpenSans-bold'" values-mask="{value}" ortho-axis-visible="false" ortho-axis-grid="false" hoverable="false" base-axis-size="15" multiple-label-colors="true" leaf-content-overflow="visible" dimensions="stories[4].dimensions" base-axis-label-text-baseline="bottom" legend="true" legend-click-mode="none" legend-fill-style="#FFF" custom-label="true" datasource-and-dates="[datasetEurostat2019,35]">

								<ul className="chart--submenu " ng-if="!isMaximized">
									<li><a onClick="open(items[0].action)" className="maximize-button" title="Maximize" role="button"><label className="sr-only " data-ng-bind="items[0].text">Maximize</label></a></li>
									<li className="dropdown-toggle" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"><a href=""><label className="sr-only">Download</label></a></li>
									<ul className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1">
										<li><a onClick="open(items[2].action)" role="button" data-ng-bind="items[2].text" className=""></a></li>
										<li><a onClick="open(items[1].action)" role="button" data-ng-bind="items[1].text" className="">Download raw data</a></li>
									</ul>
								</ul>

								<h2 ng-if="(!!chartTitle &amp;&amp; !isMaximized &amp;&amp; !titleH3) || (isMaximized &amp;&amp; !longTitle)" data-ng-bind-html="chartTitle" className="title--card  ">GDP per capita in relation to EU27_2020 average</h2>

								<div className="chart--wrapper">
									<div className="legend-text-block">
									</div>
								</div>
								</div>
							</div>
						</div>

						{/* INCOME PER CAPITA */}
						<div className="card--block--chart">
							<div className="select-filter-chart-wrapper">
								<div className="select-filter-chart ng-isolate-scope ng-valid" chart="IncomePerCapita" ng-model="dashboard.parameters.pSplit2">

								<select ng-if="chart == 'IncomePerCapita'" ng-model="pSplit2" ng-change="changeType('split2', pSplit2)" className="ng-pristine ng-untouched ng-valid ">
									<option value="36">Purchasing Power Standards (PPS)</option>
									<option value="279">Euro (€)</option>
								</select>

								</div>
							</div>
							<div className="chart--block with-filter">
								<div className="card--block--chart--wrapper ng-isolate-scope" query="getIncomePerCapitaData" cda="osha-dvt-barometer/dashboards/generic_information.cda" width="330" height="370" type="lines" listen-to="['pSplit', 'pDataset']" orientation="vertical" axis-fixed-min="10000" axis-fixed-max="20000" step="5000" params="[['pIndicator','pSplit2'],['pCountry1', pCountry1],['pCountry2', pCountry2],['pDataset', datasetEurostatBetweenDates]]" color-role="series" colors="[stories[5].color1, stories[5].color2, stories[5].color3]" chart-title="Income per capita" id="6" axis-label-font="12px 'OpenSans-bold'" plots="stories[5].plots" dimensions="stories[5].dimensions" values-visible="true" values-font="14px 'OpenSans-bold'" values-mask="{value}" show-euro-mask="true" multiple-label-colors="false" base-axis-label-text-baseline="top" leaf-content-overflow="visible" legend="true" datasource-and-dates="[datasetEurostatBetweenDates, pSplit2]">

								<ul className="chart--submenu " ng-if="!isMaximized">
									<li><a onClick="open(items[0].action)" className="maximize-button" title="Maximize" role="button"><label className="sr-only " data-ng-bind="items[0].text">Maximize</label></a></li>
									<li className="dropdown-toggle" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"><a href=""><label className="sr-only">Download</label></a></li>
									<ul className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1">
										<li><a onClick="open(items[2].action)" role="button" data-ng-bind="items[2].text" className="">Export as image</a></li>
										<li><a onClick="open(items[1].action)" role="button" data-ng-bind="items[1].text" className="">Download raw data</a></li>
									</ul>
								</ul>

								<h2 ng-if="(!!chartTitle &amp;&amp; !isMaximized &amp;&amp; !titleH3) || (isMaximized &amp;&amp; !longTitle)" data-ng-bind-html="chartTitle" className="title--card  ">Income per capita</h2>
								<div className="chart--wrapper">
									<div className="legend-text-block">
									</div>
								</div>
								</div>
								{/* DATASETS 17 - 36 y 3 - 279 */}
							</div>
						</div>
						{/* END CONTENT */}
					</div>
				</section>
				
				<Methodology />

				<section className="container-full section--page section--related--content ng-isolate-scope" items="relatedItems">
					<div className="container related--content--wrapper">
						<h2 className="title-related-content ng-binding" data-ng-bind="i18nLiterals.L20712">Explore also following topics:</h2>
						<div className="related-content-items">
							{/*  ngRepeat: item in items */}
							<div className="related-content-item ng-scope" data-ng-repeat="item in items">
								<div className="icon-related-item hide-mobile people-group-icon" data-ng-classname="indicatorIcons(item)"></div>
								<div className="content-related-item">
								<h3 className="title-related-item ng-binding" data-ng-bind="i18nLiterals[item.title]">Workforce profile</h3>
								<p className="text-related-item ng-binding" data-ng-bind-html="trim(item.text)">This indicator includes a few key data on ageing workers and the workforce:<span className="dots">...</span></p>
								<p className="button-related-item btn--block-full left-text"><a className="btn-default btn-main-color" data-ui-sref="workforce-profile" href="#!/generic-information/workforce-profile/median-age/ageing-workers">See more</a></p>
								</div>
							</div>
							{/* end ngRepeat: item in items */}
							<div className="related-content-item ng-scope" data-ng-repeat="item in items">
								<div className="icon-related-item hide-mobile prevention-icon" data-ng-classname="indicatorIcons(item)"></div>
								<div className="content-related-item">
								<h3 className="title-related-item ng-binding" data-ng-bind="i18nLiterals[item.title]">Prevention in companies</h3>
								<p className="text-related-item ng-binding" data-ng-bind-html="trim(item.text)">This indicator visualises data on how OSH is implemented on company/enterprise<span className="dots">...</span></p>
								<p className="button-related-item btn--block-full left-text"><a className="btn-default btn-main-color" data-ui-sref="prevention-companies" href="#!/osh-outcomes-working-conditions/prevention-companies/risk-assessment/sector">See more</a></p>
								</div>
							</div>
							{/*  end ngRepeat: item in items */}
						</div>
					</div>
				</section>

			</div>
		)
	}
}

export default EconomicSectorProfile;