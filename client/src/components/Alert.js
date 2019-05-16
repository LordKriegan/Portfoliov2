import React from 'react';

const Alert = ({alertType, dismissAlert, message}) => {
    console.log(alertType)
    return(
        <div className="fixed-bottom">
        <div id="myAlert" className={"alert row " + alertType} role="alert">
            <div className="col-1">
                <span style={{ cursor: "pointer" }} onClick={dismissAlert}>&times;</span>
            </div>
            <div className="col-11 text-center">
                {message}
            </div>

        </div>
    </div>
    )
}

export default Alert;