import React from 'react';
import Header from './Header';
import Plate from './Plate';
import Footer from './Footer';
import Overlay from './Overlay';

function Tile({isExecuting, symbols, quantity, movement, spread, buyPips, sellPips}) {
    return (
        <div className="tile">
            <Header symbols={symbols} />
            <div className="tile__body">
                <Plate {...sellPips} action="Sell" />
                <div className="tile__spread">{spread}</div>
                <Plate {...buyPips} action="Buy" />
            </div>
            <Footer />
            {isExecuting ? (
                <Overlay />
            ) : null}
        </div>
    );
}

export default Tile;
