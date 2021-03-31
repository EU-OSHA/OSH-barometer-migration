import React, { Component } from 'react';

class SubMenuTabs extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isSubMenuOpen: false,
            selectedTab: this.props?.subMenuTabs[0].literalTab,
            indicatorTabs: this.props.subMenuTabs
        }
    }

    onClickIndicator = (e, indicator) => {
		e.preventDefault();

		this.setState({ selectedTab: `${indicator}` });
	}

    componentDidMount() {
        this.props.onSelectedTab(this.state.selectedTab);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.selectedTab != this.state.selectedTab) {
            this.props.onSelectedTab(this.state.selectedTab);
        }
    }
    
    render() {
        const props = this.props
        return (
            <div className="compare--block" >
				<div className="submenu--block container">
					<ul  className={`submenu--items--wrapper ${this.state.isSubMenuOpen ? 'open-list' : ''} `} >
                        {this.state.indicatorTabs.map((indicator) => (
                            <li onClick={this.onClickSubMenu} key={indicator.literalTab} className={`submenu--item ${this.state.selectedTab == indicator.literalTab ? 'active' : '' }`} >
                                <a 
                                    className={this.state.selectedTab == indicator.literalTab ? 'active' : ''} 
                                    onClick={(e) => this.onClickIndicator(e, indicator.literalTab)} 
                                    >
                                    {this.props.literals[`L${indicator.literalTab}`]} 
                                </a>
                            </li>
                        ))}
					</ul>
				</div>
			</div>
        );
    }
}

export default SubMenuTabs;