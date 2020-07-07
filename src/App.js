import React, { Component } from "react";// 19
import "./App.css";
import { authenticate, resetAccount } from 'perspectives-core';

const { shell, ipcRenderer } = require('electron');

import "./externals.js";

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
    importContexts,
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
import InputGroup from 'react-bootstrap/InputGroup';
import ListGroup from 'react-bootstrap/ListGroup';

import Octicon, {Trashcan, CloudDownload} from '@primer/octicons-react'

import 'bootstrap/dist/css/bootstrap.min.css';

const Perspectives = require("perspectives-proxy").Perspectives;

class App extends Component
{
  constructor(props)
  {
    super(props);
    const component = this;
    const urlParams = new URLSearchParams(window.location.search);
    this.state =
      { notLoggedIn:  true
      , username: ""
      , password: ""
      , host: atob( urlParams.get("host") )
      , port: isNaN( parseInt ( urlParams.get("port") ) ) ? 5984 : parseInt ( urlParams.get("port") )
      , authenticationFeedback: undefined
      , resetAccount: false
      , couchdbInstalled: false
      , usersConfigured: false
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
          if (component.state.resetAccount)
          {
            resetAccount(component.state.username)(component.state.password)(component.state.host)(component.state.port)
              (function(success)
              {
                if (!success)
                {
                  alert("Unfortunately your account could not be reset and may be in an undefined state. You can reset by hand by opening Fauxton and removing all three databases whose name starts with your username.")
                }
                window.location.reload();
              })();

          }
          else
          {
            authenticate(component.state.username)(component.state.password)(component.state.host)(component.state.port)
              (function(n)
              {
                return function()
                {
                  switch (n) {
                    // UnknownUser
                    case 0:
                      component.setState({authenticationFeedback: "This combination of username and password is unknown."})
                      break;
                    // WrongPassword
                    case 1:
                      component.setState({authenticationFeedback: "Detected a valid Couchdb System Admin who is not yet an InPlace user. However, an error occurred on creating a new InPlace account!"})
                      break;
                    // OK
                    case 2:
                      component.setState({notLoggedIn: false})
                      break;
                }
              }
              })();
          }
         }
       };
  }

  componentDidMount ()
  {
    const component = this;
    // look up the base url of Couchdb and set couchdbInstalled to true if found.
    fetch( component.state.host + ":" + component.state.port ).then(function(response) {
      if (response.ok)
      {
        component.setState( {couchdbInstalled: true} );
      } } );
    // Find out if a user has been configured. In other words, if the db is in partymode. Any account information would do. The localusers database is not public.
    fetch(component.state.host + ":" + component.state.port + "/localusers", {method:'GET' })
      .then(function(response)
        {
          if (response.status == 401 || response.status == 200)
          {
            // Database exists and cannot be accessed without authentication with an authorized account (check for 200 is just in case).
            component.setState( {usersConfigured: true } );
          }
        });
    ipcRenderer.on('quit', function(event, text)
      {
        fetch( component.state.host + ":" + component.state.port + "/_session", { method: 'delete' } )
          .then(function(response) {
            if (response.ok)
            {
              // Now shut down, with an asynchronous message.
              ipcRenderer.send('sessionTerminated', "sessionTerminated");
            } } )
          .finally(function()
            {
              ipcRenderer.send('sessionTerminated', "sessionTerminated");
            });
      });
  }

  render ()
  {
    const component = this;

    function Welcome(){
      return <Card>
              <Card.Header as="h5">Welcome to InPlace</Card.Header>
              <Card.Body>
                <Card.Text>There is no user of this InPlace installation yet. Enter the username and password you've used to create a Server Admin in Couchdb. If you have not done that yet, follow these instructions:</Card.Text>
                <ol>
                  <li>Go to the <a href="" onClick={function() {shell.openExternal('http://127.0.0.1:5984/_utils')}}>Fauxton admin interface</a>.</li>
                  <li>Enter "admin" for username and the password you've set on installing Couchdb.</li>
                  <li>Click the lowest button in the left column, select the "Create Server Admin" tab. </li>
                  <li>Enter the name you will use to open InPlace. Enter a password.</li>
                  <li>Click "Create Admin".</li>
                  <li>Finally close InPlace (this program) and open it again.</li>
                </ol>
              </Card.Body>
            </Card>
    }

    if (component.state.couchdbInstalled)
    {
        if (component.state.notLoggedIn)
        {
          return (<Container>
              <Row>
                <header className="App-header">
                  <h1>Login</h1>
                </header>
              </Row>
              <Row className="pb-3">
                {component.state.usersConfigured ? <p>Enter the username and password for an InPlace user on this computer. Alternatively, to create a new InPlace user, enter a valid combination of username and password of a Couchdb Server Admin.</p> : <Welcome/>}
              </Row>
              <Row>
                <Form>
                  <Form.Group as={Row} controlId="username">
                    <Col sm="4">
                      <Form.Label>Login name:</Form.Label>
                    </Col>
                    <Col sm="8">
                      <Form.Control
                      placeholder="Username" aria-label="Username" onBlur={e => component.state.setusername(e.target.value)} autoFocus/>
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
                    <Col sm="6">
                      <Form.Label>Check to reset account (removes all data!):</Form.Label>
                    </Col>
                    <Col sm="6">
                    <InputGroup.Checkbox
                      aria-label="Check to reset account"
                      onChange={e => component.setState( {resetAccount: e.target.value == "on" } ) }/>
                    </Col>
                  </Form.Group>
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
                    <Row className="align-items-stretch">
                      <Col lg={3} className="App-border-right">
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
    else {
      return (<Card>
          <Card.Header as="h5">Couchdb installation required</Card.Header>
          <Card.Body>
            <Card.Title>No Couchdb detected</Card.Title>
            <Card.Text>
              InPlace cannot detect a Couchdb instance on your computer. This may have the following reasons:
            </Card.Text>
            <ol>
              <li>Couchdb was not installed. See instructions below.</li>
              <li>Couchdb was installed, but is not running. Start Couchdb on your computer, then restart InPlace.</li>
              <li>Couchdb is running, but not on the default port 5984. Currently it is not possible to configure the port Perspectives uses to access Couchdb. Try to make Couchdb listen on port 5984.</li>
            </ol>
            <Card.Title>How to install Coudchb</Card.Title>
            <Card.Text>Just download, install, start and verify Couchdb. You need not follow instructions in the Couchdb documents. Just perform the steps below.</Card.Text>
            <ol variant="flush">
              <li>Download Couchb version 3.1.0 from <a href="" onClick={function() {shell.openExternal('https://couchdb.apache.org/#download')}}>Couchdb</a>.</li>
              <li>Run Couchdb. An small dialog will appear stating: "Nou CouchDB Admin password found". Enter a password and remember it well!</li>
              <li>This will open up a page in your webbrowser: this is the Fauxton admin interface. If this does not happen, click <a href="" onClick={function() {shell.openExternal('http://127.0.0.1:5984/_utils')}}>here</a>.</li>
              <li>Enter "admin" for username and the password you've just set.</li>
              <li>Verify the install by clicking on the Verify button in the left column (the button with the checkmark), then click the button "Verify Installation".</li>
              <li>Create a new System Admin.
                <ol>
                  <li>Click the lowest button in the left column, select the "Create Server Admin" tab.</li>
                  <li>Enter the name you will use to open InPlace. Enter a password.</li>
                  <li>Click "Create Admin".</li>
                </ol>
              </li>
              <li>Close InPlace (this application) and start it again. Then enter the username and password you've just added to Couchdb.</li>
            </ol>
          </Card.Body>
        </Card>)
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
              onDrop={ev => {importContexts(ev.dataTransfer.files); ev.target.classList.remove("border", "p-3", "border-primary")}}
              onDragEnter={ev => ev.target.classList.add("border", "border-primary") }
              onDragLeave={ev => ev.target.classList.remove("border", "border-primary")}>
            <Octicon icon={CloudDownload} size='medium'/>
          </div>
}

export default App;
