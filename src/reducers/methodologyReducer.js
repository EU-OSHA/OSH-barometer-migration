import { SET_METHODOLOGY } from '../constants';

export default (state = {section: 'generic-information',subsection: 'OSH authorities',indicator: 27}, action) => {
    switch (action.type) {
        case SET_METHODOLOGY:
            const { section, subsection, indicator } = action;
            let methodology ={
                section: section,
                subsection: subsection,
                indicatorID: indicator
            }
            return methodology;
        default:
            return state;
    }
}