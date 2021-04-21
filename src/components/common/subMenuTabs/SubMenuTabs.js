import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

const SubMenuTabs = props => {
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState(props.selectedTab);
    const [indicatorTabs, setIndicatorTabs] = useState(props.subMenuTabs);
    const [country1,setCountry1]= useState(props.selectCountry1);
    const [country2, setCountry2]= useState(props.selectCountry2)

    const history = useHistory();
    useEffect(() => {
        setSelectedTab(props.selectedTab)
        loadUrl();
    }, [props.selectedTab, props.selectedSurvey, props.selectCountry1, props.selectCountry2]);



const loadUrl = ()=>{
    if (props.selectedSurvey) {
        history.push({
            pathname: `${props.locationPath}${props.selectedTab}/${props.selectedSurvey}`
        })
    } else{
        history.push({
            pathname: `${props.locationPath}${props.selectedTab}/${props.selectCountry1}/${props.selectCountry2}`
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

        const newIndicator = props.literals[`L${indicator}`].toLowerCase().replace(/ /g, '-');
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
        const translateLiteral = props.literals[`L${literal}`].toLowerCase().replace(/ /g, '-');
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
                        <li onClick={onClickSubMenu} key={indicator.literalTab} className={`submenu--item ${literalClass(indicator.literalTab) == true ? 'active' : '' }`} >
                            <a 
                                className={literalClass(indicator.literalTab) == true ? 'active' : ''} 
                                onClick={(e) => onClickIndicator(e, indicator.literalTab)} 
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