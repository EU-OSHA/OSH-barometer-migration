import React, { Component } from 'react';

const defaultProps = {
    initialPage: 1,
    pageSize: 5
}

class Pagination extends Component {
    constructor(props) {
        super(props);

        this.state = { pager: {}, pageSize:  defaultProps.pageSize}; 
    }

    componentDidMount() {
        // setPage if items array isnt empty
        if(this.props.pageSize){
            this.setState({pageSize: this.props.pageSize});
        }
        if (this.props.items && this.props.items.length) {
            this.setPage(this.props.initialPage);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // resets if items array has changed
        if (this.props.items != prevProps.items) {
            this.setPage(this.props.initialPage);
        }
    }
    
    setPage(page) {
        let items = this.props.items;
        let pager = this.state.pager;

        // get new paper object for specified page
        pager = this.getPager(items.length, page);

        // get new page of items from items array
        let pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

        // update state
        this.setState({ pager: pager })

        // call change page function in parent component
        this.props.onChangePage(pageOfItems);

    }

    getPager(totalItems, currentPage, pageSize) {
        currentPage = currentPage || 1;

        // pageSize = pageSize || 5;
        pageSize = pageSize || this.state.pageSize;

        // calculate total pages
        let totalPages = Math.ceil(totalItems / pageSize);

        let startPage;
        let endPage;

       if (totalPages <= 5) {
            // less than 5
            startPage = 1;
            endPage = totalPages
        } else {
            // More than 10
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4
            }
        }


        // calculate end and start page
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        let pages = [...Array((endPage + 1 ) - startPage).keys()].map((i) => startPage + i);


        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        }
    }

    render() {
        return (
            <div className="pagination--wrapper" >
                {this.props.items.length > 0 && (
                    <div className="pagination--elements">
                        <ul className="main-color">
                            <li role="button" className={`arrow firstpage ${this.state.pager.currentPage > 1 ? '' : 'invisible'}`} onClick={() => this.setPage(this.setPage(1))}><span><i className="fa fa-angle-double-left" aria-hidden="true"></i></span></li>
                            <li role="button" className={`arrow previouspage ${this.state.pager.currentPage > 1 ? '' : 'invisible'}`} onClick={() => this.setPage(this.state.pager.currentPage - 1)} ><span><i className="fa fa-angle-left" aria-hidden="true"></i></span></li>
                            <li><span className="">{`${this.state.pager.currentPage}/${this.state.pager.totalPages}`}</span></li>
                            <li role="button" className={`arrow nextpage ${this.state.pager.currentPage == this.state.pager.totalPages ? 'invisible' : ''}`} onClick={() => this.setPage(this.state.pager.currentPage + 1)} ><span><i className="fa fa-angle-right" aria-hidden="true"></i></span></li>
                            <li role="button" className={`arrow lastpage ${this.state.pager.currentPage == this.state.pager.totalPages ? 'invisible' : ''}`} onClick={() => this.setPage(this.state.pager.totalPages)} ><span><i className="fa fa-angle-double-right" aria-hidden="true"></i></span></li>
                        </ul>
                    {/* PAGINATION TEXT */}
                        {!!this.props.items.length > 0 && (
                        <div className="pag-numbers" ><span className="">{`Displaying ${this.state.pager.startIndex + 1}-${this.state.pager.endIndex + 1} of ${this.props.items.length}`}</span></div>
                    )}
                </div>
                )}
            </div>
        );
    }
}

Pagination.defaultProps = defaultProps;

export default Pagination;