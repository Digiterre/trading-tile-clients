import React from 'react';

function Footer() {
    return (
        <div className="tile__footer">
            <div className="tile__quantity">
                <span className="tile__quantity-unit">
                    GBP
                </span>
                <span className="tile__quantity-value">
                    1,000,000
                </span>
            </div>
            <div className="tile__tenor">
                <span className="tile__tenor-unit">
                    SP
                </span>
                {' '}
                <span className="tile__tenor-value">
                    11-Jan-2015
                </span>
            </div>
        </div>
    );
}

export default Footer;
