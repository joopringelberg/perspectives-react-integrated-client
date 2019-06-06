import React, { Component } from "react";// 17
import "./App.css";
import { main } from 'perspectives-core';
import importModule from 'appImporter';

import "./externals.js"

import {
    Context,
    Rol,
    View,
    PSRol,
    PSView,
    RolBinding,
    getModelName} from "perspectives-react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';

import 'bootstrap/dist/css/bootstrap.min.css';

import Loadable from 'react-loadable';

// const LoadableTestBotActieScreen = Loadable({
//   loader: () => import('./testBotactie.js'),
//   loading: Loading,
// });

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
        <Context contexttype="model:Perspectives$PerspectivesSysteem" contextinstance="model:User$MijnSysteem">
          <Tab.Container id="left-tabs-example" defaultActiveKey="first" mountOnEnter={true}>
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
                  <Rol rol="indexedContexts">
                    <RolBinding>
                      <View viewname="allProperties">
                        <PSView.Consumer>
                          {value => <Nav.Item>
                              <Nav.Link eventKey={value.rolinstance}>{value.contextLabel}</Nav.Link>
                            </Nav.Item>}
                        </PSView.Consumer>
                      </View>
                    </RolBinding>
                  </Rol>
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Rol rol="indexedContexts">
                    <RolBinding>
                      <PSRol.Consumer>
                        {Screen}
                      </PSRol.Consumer>
                    </RolBinding>
                  </Rol>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Context>
      </Container>
    );
  }
}

function Screen(value)
{
  const LoadableScreen = Loadable({
    loader: () => importModule( value.roltype ), // haalt bestand Perspectives.js op
    loading: Loading,
  });
  return <Tab.Pane eventKey={value.rolinstance}>
      <LoadableScreen/>
    </Tab.Pane>
}

export default App;
