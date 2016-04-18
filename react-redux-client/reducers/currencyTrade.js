import {
    TRADE_WILLEXECUTE,
    TRADE_EXECUTED,
    RECEIVE_NEW_RATE
} from '../constants/ActionTypes';

const initialState = {
    isExecuting: false,
    symbols: 'GBP/USD',
    quantity: 'GBP 1,000,000',
    movement: 'none',
    spread: 0,
    buyPips: {
        bigFig: '0',
        fractionalPips: '0',
        pips: '0'
    },
    sellPips: {
        bigFig: '0',
        fractionalPips: '0',
        pips: '0'
    }
};

// NOTE: Derived data shouldn't be part of state, i.e. this should really done
// in mapStateToProps / 'reselect'.
function formatPips(spotRate) {
    const str = '' + spotRate;
    const pad = '0000000';
    const ans = str + pad.substring(0, pad.length - str.length);
    return {
        bigFig: ans.substring(0, 4),
        pips: ans.substring(4, 6),
        fractionalPips: ans.substring(6, 8)
    };
}

export default function currencyTrade(state = initialState, action) {
    switch (action.type) {
    case RECEIVE_NEW_RATE:
        return {
            ...state,
            spread: action.rate.spread,
            buyPips: formatPips(action.rate.buy),
            sellPips: formatPips(action.rate.sell)
        };
    default:
        return state;
    }
}
