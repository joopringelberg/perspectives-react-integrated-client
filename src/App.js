import React, { Component } from "react";// 18
import "./App.css";
import { main } from 'perspectives-core';

import "./externals.js"

import {
    Context,
    Rol,
    View,
    PSRol,
    PSView,
    RolBinding,
    getModelName,
    Screen} from "perspectives-react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import Octicon, {Trashcan} from '@primer/octicons-react'

import 'bootstrap/dist/css/bootstrap.min.css';

main();

class App extends Component
{
  render ()
  {
    return (
      <Container>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">InPlace</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            </Nav>
            <Octicon icon={Trashcan} size='medium'/>
          </Navbar.Collapse>
        </Navbar>
        <Context contexttype="model:Perspectives$PerspectivesSysteem" contextinstance="model:User$MijnSysteem">
          <Tab.Container id="left-tabs-example" defaultActiveKey="first" mountOnEnter={true}>
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
                        {value => <Tab.Pane eventKey={value.rolinstance}>
                            <Screen roltype={value.roltype}/>
                          </Tab.Pane>                        }
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

export default App;
