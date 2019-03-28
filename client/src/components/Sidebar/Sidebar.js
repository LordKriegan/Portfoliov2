import React from 'react';
import GithubImg from './images/github.png';
import EmailImg from './images/email.png';
import LinkedInImg from './images/linkedin.png';
import PhoneImg from './images/phone.png';
import { Card } from '..';
function Sidebar() {
    return (
        <Card title="Connect with me!" titleClass="h4">
            <div className="contactLinks row text-center no-gutters">
                <div className="col-3 col-md-6">
                    <a rel="noopener noreferrer" target="_blank" href="https://www.linkedin.com/in/qstationwala"><img alt="LinkedIn" className="contactLinkImg" src={LinkedInImg} /></a>
                </div>
                <div className="col-3 col-md-6">
                    <a rel="noopener noreferrer" target="_blank" href="https://www.github.com/lordkriegan"><img alt="Github" className="contactLinkImg" src={GithubImg} /></a>
                </div>
                <div className="col-3 col-md-6">
                    <a rel="noopener noreferrer" target="_blank" href="mailto:qstationwala@gmail.com"><img alt="Email" className="contactLinkImg" src={EmailImg} /></a>
                </div>
                <div className="col-3 col-md-6">
                    <a rel="noopener noreferrer" target="_blank" href="tel:1-714-308-3063"><img alt="Phone" className="contactLinkImg" src={PhoneImg} /></a>
                </div>
            </div>
        </Card>
    );
}

export default Sidebar;