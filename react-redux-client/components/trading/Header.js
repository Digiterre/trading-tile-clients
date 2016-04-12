import React from 'react';

function Footer({symbols}) {
    return (
        <nav className="tile__header">
            <div className="tile__currency">
                {symbols}
                <span className="sprite sprite--direction tile__currency-icon"></span>
            </div>
            <div className="tile__product">
                SP<span className="tile__product-divider">/</span>FW
                <span className="sprite sprite--dropdown tile__product-icon"></span>
            </div>
            <span className="sprite sprite--close tile__close"></span>
        </nav>
    );
}

export default Footer;
