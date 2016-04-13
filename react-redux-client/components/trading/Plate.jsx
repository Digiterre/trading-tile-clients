import React from 'react';

function Footer({action, bigFig, fractionalPips, pips}) {
    return (
        <div className="tile__plate">
            <div className="tile__action">
                {action}
            </div>
            <div className="tile__spotrate">
                <span className="tile__big-fig">
                    {bigFig}
                </span>
                <span className="tile__pips">
                    {pips}
                </span>
                <span className="tile__fractional-pips">
                    {fractionalPips}
                </span>
            </div>
        </div>
    );
}

export default Footer;
