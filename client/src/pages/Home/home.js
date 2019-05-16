import React, { Component } from 'react'
import { Card, DefaultLayout, AboutMe } from '../../components';
import { Carousel } from 'react-responsive-carousel';
class Home extends Component {
    render() {
        return (
            <DefaultLayout>
                <Card title="About Me" titleClass="h1">
                    <Carousel showThumbs={false} useKeyboardArrows={true} emulateTouch={true}>
                        <div>
                            <h3>Biography</h3>
                            <hr />
                            <AboutMe />
                        </div>
                        <div>
                            <h3>Education</h3>
                            <p>education goes here</p>
                        </div>
                        <div>
                            <h3>Work History</h3>
                            <p>work history goes here</p>
                        </div>
                    </Carousel>
                    
                </Card>
            </DefaultLayout>
        )
    }
}

export default Home;