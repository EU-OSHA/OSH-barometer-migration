import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

const SubMenuTabs = props => {

    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState(props.selectedTab);
    const [indicatorTabs, setIndicatorTabs] = useState(props.subMenuTabs);
    // const [country1,setCountry1]= useState(props.selectCountry1);
    // const [country2, setCountry2]= useState(props.selectCountry2);

    const history = useHistory();
    useEffect(() => {
        setSelectedTab(props.selectedTab)
        loadUrl();
    }, [props.selectedTab, props.selectedSurvey, props.selectCountry1, props.selectCountry2, props.split]);

    const loadUrl = ()=>{
        if (props.selectedTab != 'exposure-to-dangerous-substances' && props.locationPath.indexOf('exposure-to-dangerous-substances') == -1)
        {
            if (props.selectedTab == 'ergonomic-risks')
            {
                const country2 = props.selectCountry2 == undefined ? 0 : props.selectCountry2;
                history.push({
                    pathname: `${props.locationPath}ergonomic-risks/${props.selectedSurvey}/${props.selectCountry1}/${country2}`
                })
            }
            else if (props.selectedSurvey && props.selectedTab != 'vibrations-loud-noise-and-temperature') {
                history.push({
                    pathname: `${props.locationPath}${props.selectedTab}/${props.selectedSurvey}`
                })
            } else if (props.selectCountry1 && props.selectCountry2) {
                if (props.split){
                    history.push({
                        pathname: `${props.locationPath}${props.selectedTab}/${props.split}/${props.selectCountry1}/${props.selectCountry2}`
                    })
                }
                else
                {
                    history.push({
                        pathname: `${props.locationPath}${props.selectedTab}/${props.selectCountry1}/${props.selectCountry2}`
                    })
                }                
            } else {
                history.push({
                    pathname: `${props.locationPath}${props.selectedTab}`
                })
            }
        }
        else if (props.locationPath.indexOf('exposure-to-dangerous-substances') > -1)
        {
            history.push({
                pathname: `${props.locationPath}${props.selectedTab}`
            })
        }
    }

    useEffect(() => {
        if (window.innerWidth > 990) {
            setIsSubMenuOpen(false);
        }
    }, [window.innerWidth])

    const onClickIndicator = (e, indicator) => {
		e.preventDefault();
        let newIndicator
        if (indicator == '20692') {
            newIndicator = 'establishments-inspected'
        } else if (indicator == '336') {
            newIndicator = 'strategy-plan'
        } else {
            newIndicator = indicator;
        }

        setSelectedTab(newIndicator);
        props.callbackSelectedTab(newIndicator);

        if (newIndicator != props.selectedTab) {
            if (props.selectedSurvey) {
                history.push({
                    pathname: `${props.locationPath}${newIndicator}/${props.selectedSurvey}`
                });
            } else {
                history.push({
                    pathname: `${props.locationPath}${newIndicator}`
                });
            }
        }
	}

    const literalClass = (literal) => {
        let translateLiteral;

        if (literal == '20692') {
            translateLiteral = 'establishments-inspected'
        } else if (literal == '336') {
            translateLiteral = 'strategy-plan'
        } else {
            translateLiteral = literal;
        }
        if (selectedTab == translateLiteral) {
            return true
        } else {
            return false
        }
    }

    const onClickSubMenu = (e) => {
		e.preventDefault();
        if (window.innerWidth <= 990) {
            setIsSubMenuOpen(!isSubMenuOpen);
        }
	}

    return (
        <div className="compare--block" >
			<div className="submenu--block container">
				<ul  className={`submenu--items--wrapper ${isSubMenuOpen ? 'open-list' : ''} `} >
                    {indicatorTabs.map((indicator) => (
                        <li onClick={onClickSubMenu} key={indicator.literalTab} className={`submenu--item ${literalClass(indicator.url) == true ? 'active' : '' }`} >
                            <a 
                                className={literalClass(indicator.url) == true ? 'active' : ''} 
                                onClick={(e) => onClickIndicator(e, indicator.url)} 
                                >
                                {props.literals[`L${indicator.literalTab}`]} 
                            </a>
                        </li>
                    ))}
				</ul>
			</div>
		</div>
    )
}

export default SubMenuTabs;