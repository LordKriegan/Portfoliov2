import React from 'react';
import { LayoutNoSidebar } from '../../components'
import Err404Img from './images/Err404.gif';
function Err404() {
  return (
    <LayoutNoSidebar>
      <div className="err404">
        <h1 className="text-left">Error 404!</h1>
        <img alt="Error 404!" className="img-responsive" src={Err404Img} />
        <h3 className="text-right">Page not found!</h3>
        {/*
        not sure of the original artist of this picture but image was pulled from this site (via google images)
        https://aminoapps.com/c/anime/page/blog/im-so-confused/66tz_uPz7mavEaVoBYGmZNqLP30wdm
        */}
        <p className="text-center" style={{ color: "#151515" }}>I mean.... do you even know de wae?</p>
      </div>
    </LayoutNoSidebar>
  );
}
export default Err404;
