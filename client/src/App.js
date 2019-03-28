import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home, Portfolio, Contact, Err404 } from './pages';
import { Navbar, Footer } from './components';
import './App.css'
class App extends Component {

  render() {
    return (
      <Router>
        <>
          <Navbar />
          <div className="container">
            <div className="row" style={{ paddingTop: "20px" }}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/portfolio" component={Portfolio} />
                <Route exact path="/contact" component={Contact} />
                <Route component={Err404} />
              </Switch>
            </div>
          </div>
          <Footer />
        </>
      </Router>
    );
  }
}

export default App;
