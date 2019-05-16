import React from 'react'

function LayoutNoSidebar(props) {
    return (
        <>
            <div className="col-12">
                {props.children}
            </div>
        </>
    );
}

export default LayoutNoSidebar;