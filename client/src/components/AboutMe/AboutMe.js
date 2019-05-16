import React from 'react';
import { Link } from 'react-router-dom';
import ProfilePic from './images/bwQ.jpg';
import CertPic from './images/profilePic.jpg';

const AboutMe = () => {
    return (
        <>
            <div className="row">
                <div className="col-12 col-md-4">
                    <img className="img-fluid profilePhoto" src={ProfilePic} alt="black and white profile" />
                </div>
                <div className="text-left col-12 col-md-8">
                    <p>Hello! My name is Qamar Abbas Stationwala. Most people call me Q for short, though (and cue the James Bond jokes...). I graduated from Esperanza High School in 2008.</p>
                    <p>I've always been pretty good with computers; ever since I was a kid. When I was in high school I took a VB6 class in my junior year, and HTML in my senior year. While attending college I took various programming courses, some of which include C, C++, Assembly, and Java. I have also taught myself a bit of Python and PHP.</p>
                </div>
            </div>
            <div className="row">
                <div className="text-left col-12">
                    <p>As far as my work history goes, I have had the same job since high school. I started as a cashier at Rite-Aid, but several years ago I was promoted to shift-supervisor. I learned a lot about working in and managing teams. The lesson I value most though working at Rite-Aid is my strong sense of work ethic.</p>
                    <p>I am also currently a Teaching Assistant for Trilogy's Full-Stack Web Development Boot Camp. I really enjoy teaching because I have found there is an amazing rush to see the light bulb go off over someone's head when you explain a new concept. I have also found that while teaching others I have learned much more myself.</p>
                </div>
            </div>
            <div className="row">
                <div className="text-left col-12 col-md-8">
                    <p>A few of my hobbies include listening to a large variety of music, playing board and card games, and watching movies.</p>
                    <p>I am currently available for freelance projects! Feel free to <Link to="/contact">contact me </Link>if you would like me to work on something for you.</p>
                </div>
                <div className="col-12 col-md-4">
                    <img className="img-fluid profilePhoto" src={CertPic} alt="black and white profile" />
                </div>
            </div>
        </>
    )
}

export default AboutMe;