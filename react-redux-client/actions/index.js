import {
    TRADE_WILLEXECUTE,
    TRADE_EXECUTED,
    RECEIVE_NEW_RATE
} from '../constants/ActionTypes';
import hubProxy from '../utils/hubProxy';

function receiveNewRate(rate) {
    return {
        type: RECEIVE_NEW_RATE,
        rate
    };
}

export function subscribeToRateChange() {
    return dispatch => {
        let pricingHub = hubProxy('pricingHub');
        pricingHub.on('rateChanged', rate => {
            dispatch(receiveNewRate(rate));
        });
        pricingHub.start();
    }
}
