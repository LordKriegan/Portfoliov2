import React, { Component } from 'react'
import { Card, DefaultLayout, AboutMe, WorkEdCard } from '../../components';
import { Carousel } from 'react-responsive-carousel';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
class Home extends Component {
    state = {
        education: '',
        workhistory: '',
        skills: ''
    }
    componentDidMount() {
        axios
            .all([axios.get('/api/education/all'), axios.get('/api/workhistory/all'), axios.get('/api/skills/all')])
            .then(response => this.setState({
                education: response[0].data,
                workhistory: response[1].data,
                skills: response[2].data
            }))
            .catch(error => console.error(error));
    }
    render() {
        return (
            <DefaultLayout>
                <Card title="About Me" titleClass="h1">
                    <Carousel showStatus={false} showThumbs={false} useKeyboardArrows={true} emulateTouch={true}>
                        <div>
                            <h2>Biography</h2>
                            <AboutMe />
                        </div>
                        <div className="parentScroller">
                            <h2>Education</h2>
                            <div className="childScroller">
                                {(this.state.education)
                                    ? this.state.education.map(elem => <WorkEdCard key={elem.id} type="education" school={elem.school} degree={elem.degree} yearStart={elem.yearStart} yearEnd={elem.yearEnd} />)
                                    : "Loading Education..."
                                }
                            </div>
                        </div>
                        <div className="parentScroller">
                            <h2>Work History</h2>
                            <div className="childScroller">
                                {(this.state.workhistory)
                                    ? this.state.workhistory.map(elem => <WorkEdCard key={elem.id} type="workhistory" employer={elem.employer} title={elem.title} yearStart={elem.yearStart} yearEnd={elem.yearEnd} />)
                                    : "Loading Work History..."
                                }
                            </div>
                        </div>
                        <div className="parentScroller">
                            <h2>Skill Set</h2>
                            <div className="childScroller">
                                {(this.state.skills)
                                    ?  this.state.skills.map(elem => {
                                        return(
                                            <div key={elem.id} className="card">
                                                <div className="card-body text-center">
                                                    <h3>{elem.name}</h3>
                                                    <p>{Array.from({length: elem.rating}).map((e, i) => <FaStar key={i} />)}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                    : "Loading Skill Set..."
                                }
                            </div>
                        </div>
                    </Carousel>

                </Card>
            </DefaultLayout>
        )
    }
}

export default Home;