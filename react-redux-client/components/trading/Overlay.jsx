import React from 'react';

function Overlay() {
    return (
        <div className="tile__overlay">
            <span className="tile__overlay-text">Executing Trade...</span>
            <div className="spinner">
                <div className="spinner__bounce1"></div>
                <div className="spinner__bounce2"></div>
                <div className="spinner__bounce3"></div>
            </div>
        </div>
    );
}

export default Overlay;
