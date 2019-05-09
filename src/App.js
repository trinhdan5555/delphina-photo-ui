import React from 'react';
// import './App';
import ExampleWithLightbox from './components/photos/LightBox';
import Portfolio from './components/portfolio/Portfolio';
import Menu from './components/menu/Menu';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


function App() {

  return (
    <Router>
      <div className="App">
        <Menu/>
        <Route exact path="/" component={ExampleWithLightbox} />
        <Route exact path="/portfolio" component={Portfolio} />
      </div>
    </Router>
  );
}

export default App;
