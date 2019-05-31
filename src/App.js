import React, { Component } from "react";
import "./App.css";
import { main } from 'perspectives-core';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
// import Button from 'react-bootstrap/Button'; // to trigger webpack.

//import TestBotActieScreen from './testBotActie.js'

import 'bootstrap/dist/css/bootstrap.min.css';

import Loadable from 'react-loadable';

const LoadableTestBotActieScreen = Loadable({
  loader: () => import('./testBotactie.js'),
  loading: Loading,
});

function Loading(props) {
  if (props.error) {
    return <div>Error! <button onClick={ props.retry }>Retry</button></div>;
  } else {
    return <div>Loading...</div>;
  }
}

main();

class App extends Component
{
  render ()
  {
    return (
      <Container>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col>
              <header className="App-header">
                <h1>InPlace</h1>
              </header>
            </Col>
          </Row>
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="first">Mijn Systeem</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">Test Bot Actie</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <p>Mijn Systeem komt hier.</p>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <LoadableTestBotActieScreen/>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    );
  }
}

export default App;
