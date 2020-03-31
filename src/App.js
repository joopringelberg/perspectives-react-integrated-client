import React, { Component } from "react";// 19
import "./App.css";
import { authenticate } from 'perspectives-core';

import "./externals.js"

import {
    Context,
    Rol,
    PSRol,
    PSView,
    RolBinding,
    ExternalViewOfBoundContext,
    getModelName,
    Screen,
    RemoveRol,
    MySystem} from "perspectives-react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';

import Octicon, {Trashcan, CloudDownload} from '@primer/octicons-react'

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component
{
  constructor(props)
  {
    super(props);
    const component = this;
    this.state =
      { notLoggedIn:  true
      , username: ""
      , password: ""
      , authenticationFeedback: undefined
      , setusername: function(usr)
        {
          component.setState({username: usr, authenticationFeedback: undefined});
        }
      , setpassword: function(pwd)
        {
          component.setState({password: pwd, authenticationFeedback: undefined});
        }
      , authenticate: function()
        {
          authenticate(component.state.username)(component.state.password)
            (function(n)
            {
              return function()
              {
                switch (n) {
                  // UnknownUser
                  case 0:
                    component.setState({authenticationFeedback: "This user is unknown."})
                    break;
                  // WrongPassword
                  case 1:
                    component.setState({authenticationFeedback: "This password is wrong."})
                    break;
                  // OK
                  case 2:
                    component.setState({notLoggedIn: false})
                    break;
              }
            }
            })();
         }
       };
  }

  render ()
  {
    const component = this;
    if (component.state.notLoggedIn)
    {
      return (<Container>
          <Row>
            <header className="App-header">
              <h1>Login</h1>
            </header>
          </Row>
          <Row>
            <Form>
              <Form.Group as={Row} controlId="username">
                <Col sm="4">
                  <Form.Label>Login name:</Form.Label>
                </Col>
                <Col sm="8">
                  <Form.Control
                  placeholder="Username" aria-label="Username" onBlur={e => component.state.setusername(e.target.value)}/>
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="password">
                <Form.Label column sm="4">Password:</Form.Label>
                <Col sm="8">
                  <Form.Control type="password" placeholder="Password" aria-label="Password" onBlur={e => component.state.setpassword(e.target.value)}/>
                </Col>
              </Form.Group>
              <Button variant="primary" onClick={e => component.state.authenticate()}>Login</Button>
              <Form.Group>
                <br/>
                {(component.state.authenticationFeedback) &&
                  (<Card bg="danger" text="white" style={{ width: '18rem' }}>
                    <Card.Body>
                      <Card.Title>{component.state.authenticationFeedback}</Card.Title>
                    </Card.Body>
                  </Card>)}
              </Form.Group>
            </Form>
          </Row>
      </Container>);
    }
    else
    {
      return (
        <Container>
          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">InPlace</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Container>
                <Row>
                  <Col/>
                  <Col lg={1}>
                    <Download/>
                  </Col>
                  <Col lg={1}>
                    <RemoveRol>
                      <Trash/>
                    </RemoveRol>
                  </Col>
                </Row>
                </Container>
            </Navbar.Collapse>
          </Navbar>
          <div>
            <MySystem>
              <Tab.Container id="left-tabs-example" defaultActiveKey="first" mountOnEnter={true}>
                <Row>
                  <Col lg={3}>
                    <Nav variant="pills" className="flex-column">
                      <Rol rol="IndexedContexts">
                        <ExternalViewOfBoundContext viewname="allProperties">
                          <PSView.Consumer>
                            {value => <Nav.Item>
                                <Nav.Link eventKey={value.rolinstance}>{value.propval("Name")}</Nav.Link>
                              </Nav.Item>}
                          </PSView.Consumer>
                        </ExternalViewOfBoundContext>
                      </Rol>
                    </Nav>
                  </Col>
                  <Col lg={9}>
                    <Tab.Content>
                      <Rol rol="IndexedContexts">
                        <RolBinding>
                          <PSRol.Consumer>
                            {value => <Tab.Pane eventKey={value.rolinstance}>
                                <Screen rolinstance={value.rolinstance}/>
                              </Tab.Pane>
                            }
                          </PSRol.Consumer>
                        </RolBinding>
                      </Rol>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            </MySystem>
          </div>
        </Container>
      );
    }
  }
}

function Trash(props)
{
  return  <div onDragOver={ev => ev.preventDefault()}
              onDrop={ev => {props.removeRol( JSON.parse( ev.dataTransfer.getData("PSRol") ) ); ev.target.classList.remove("border", "p-3", "border-primary")}}
              onDragEnter={ev => ev.target.classList.add("border", "border-primary") }
              onDragLeave={ev => ev.target.classList.remove("border", "border-primary")}>
            <Octicon icon={Trashcan} size='medium'/>
          </div>
}

function Download(props)
{
  return  <div onDragOver={ev => ev.preventDefault()}
              onDrop={ev => {alert(ev.dataTransfer.files[0].type); ev.target.classList.remove("border", "p-3", "border-primary")}}
              onDragEnter={ev => ev.target.classList.add("border", "border-primary") }
              onDragLeave={ev => ev.target.classList.remove("border", "border-primary")}>
            <Octicon icon={CloudDownload} size='medium'/>
          </div>
}

export default App;
