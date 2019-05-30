import React, { Component } from "react";
import "./App.css";
import { main } from 'perspectives-core';
import {
    Context,
    Rollen,
    RolBinding,
    View,
    ContextOfRole,
    ExternalViewOfBoundContext,
    ViewOnExternalRole,
    SetProperty,
    InternalViewOfBoundContext,
    CreateContext,
    DeleteContext,
    ViewOnInternalRole } from "perspectives-react";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import 'bootstrap/dist/css/bootstrap.min.css';

// Start the core. 4
main();

class App extends Component
{
  render ()
  {
    return (
      <Container>
          <Row>
            <header className="App-header">
              <h1>Actie voorbeeld formulier</h1>
            </header>
          </Row>
          <Row>
            <Form>
              <Context type="model:Perspectives$PerspectivesSysteem" contextinstance="model:User$MijnSysteem">
                <Rollen rollen={[
                  "zaken"
                ]}>
                  <RolBinding rolname="zaken">
                    <ContextOfRole>
                      <ViewOnInternalRole viewname="allProps">
                        <TestBotActie/>
                      </ViewOnInternalRole>
                    </ContextOfRole>
                  </RolBinding>
                </Rollen>
                <CreateContext rolname="zaken" contextname="model:TestBotActie$Test">
                  <CreateButton/>
                </CreateContext>
                <Card>
                  <Card.Body>
                  <p>Als we hier de create button doen, heeft hij geen contextinstance en geen rolname.</p>
                  </Card.Body>
                </Card>
              </Context>
            </Form>
          </Row>
      </Container>
    );
  }
}

function GebruikerNaam (props)
{
  return <p><label>Gebruiker:</label>{props.voornaam + " " + props.achternaam}</p>;
}

function TrustedCluster_BuitenRol_Kaartje (props)
{
  return <p><label>TrustedCluster:</label>{props.naam}</p>;
}

function Models (props)
{
  return <p><label>Models:</label>{props.modellen}</p>;
}

function ModelId (props)
{
  return <li key={props.rolinstance}>{props.rolinstance}</li>;
}

function ClusterGenoot (props)
{
  return <p>Clustergenoot {props.voornaam} heeft url: {props.url}</p>;
}

function GebruikerVoornaamInput (props)
{
  return (<fieldset>
    <legend>Verander de gebruikers' voornaam in:</legend>
    <input defaultValue={props.defaultvalue} onBlur={e => props.setvalue(e.target.value)} />
    </fieldset>);
}

function TestBotActie (props)
{
  return (
    <Card>
      <Card.Body>
        <Form.Group as={Row} controlId="testBotActie">
          <Form.Label column sm="8">Afhankelijke property</Form.Label>
          <Col sm="4">
            <Form.Control readOnly="true" plaintext="true" value={props.v2}></Form.Control>
          </Col>
        </Form.Group>
        <SetProperty propertyname="trigger" namespace={props.namespace} rolinstance={props.rolinstance} rolname={props.rolname} value={props.trigger}>
          <TriggerInput/>
        </SetProperty>

        <SetProperty propertyname="v1" namespace={props.namespace} rolinstance={props.rolinstance} rolname={props.rolname} value={props.v1}>
          <V1Input/>
        </SetProperty>
        <DeleteContext contextinstance={props.contextinstance}>
          <DeleteButton/>
        </DeleteContext>
      </Card.Body>
    </Card>
  );
}

function TriggerInput (props)
{
  return (
    <Form.Group as={Row} controlId="triggerInput">
      <Col sm="8">
        <Form.Label>Actie aan of uit?</Form.Label>
        <Form.Text className="text-muted">
          Alleen als de trigger 'true' is, wordt de onafhankelijke property naar de afhankelijke gekopieerd.
        </Form.Text>
      </Col>
      <Col sm="4">
        <ToggleButtonGroup type="checkbox" defaultValue={props.defaultvalue} onBlur={e => props.setvalue(e.target.value)} >
          <ToggleButton value={"true"}>true</ToggleButton>
          <ToggleButton value={"false"}>false</ToggleButton>
        </ToggleButtonGroup>
      </Col>
    </Form.Group>);
}

function V1Input (props)
{
  return (
    <Form.Group as={Row} controlId="v1Input">
      <Col sm="8">
        <Form.Label>Geef de onafhankelijke property een waarde:</Form.Label>
      </Col>
      <Col sm="4">
        <Form.Control defaultValue={props.defaultvalue} onBlur={e => props.setvalue(e.target.value)} />
      </Col>
    </Form.Group>
  );
}

function CreateButton (props)
{
  return (<Button variant="primary" onClick={e => props.create({"model:TestBotActie$Test$binnenRolBeschrijving$trigger": ["true"]})}>Voeg een test toe</Button>);
}

function DeleteButton (props)
{
  return (<Button variant="danger" onClick={e => props.delete()}>Verwijder</Button>);
}

export default App;
