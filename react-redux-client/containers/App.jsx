import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Tile from '../components/trading/Tile';
import {subscribeToRateChange} from '../actions';

class App extends Component {

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(subscribeToRateChange());
    }

    render() {
        return (
            <div className="container">
                <Tile {...this.props.currencyTrade} />
            </div>
        );
    }
}

App.propTypes = {
    dispatch: PropTypes.func.isRequired,
    currencyTrade: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        currencyTrade: state.currencyTrade
    };
}

export default connect(mapStateToProps)(App);
