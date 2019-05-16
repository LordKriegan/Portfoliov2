import React from 'react'
import { Sidebar } from '.';
//using this as a default layout so that err404 page wont have sidebar. also means less clutter in app.js
function DefaultLayout(props) {
    return (
        <>
            <div className="col-12 col-md-9">
                {props.children}
            </div>
            <div className="col-12 col-md-3">
                <Sidebar />
            </div>
        </>
    );
}

export default DefaultLayout;