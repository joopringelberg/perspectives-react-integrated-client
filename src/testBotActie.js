import React, { Component } from "react";

import {
    Context,
    Rol,
    RolBinding,
    ContextOfRole,
    SetProperty,
    CreateContext,
    DeleteContext,
    ViewOnInternalRole,
    PSView} from "perspectives-react";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

function TestBotActieScreen()
{
  return (<Container>
            <Row>
              <header className="App-header">
                <h1>Actie voorbeeld formulier</h1>
              </header>
            </Row>
            <Row>
              <Form>
                <Context contexttype="model:Perspectives$PerspectivesSysteem" contextinstance="model:User$MijnSysteem">
                  <Rol rol="zaken">
                    <RolBinding>
                      <ContextOfRole>
                        <ViewOnInternalRole viewname="allProps">
                          <TestBotActie/>
                        </ViewOnInternalRole>
                      </ContextOfRole>
                    </RolBinding>
                  </Rol>
                  <Card>
                    <Card.Body>
                      <CreateContext rolname="zaken" contextname="model:TestBotActie$Test">
                        <CreateButton/>
                      </CreateContext>
                    </Card.Body>
                  </Card>
                </Context>
              </Form>
            </Row>
        </Container>);
}

function TestBotActie (props)
{
  return (
    <PSView.Consumer>
      {value => <Card>
            <Card.Body>
              <Form.Group as={Row} controlId="testBotActie">
                <Form.Label column sm="8">Afhankelijke property</Form.Label>
                <Col sm="4">
                  <Form.Control readOnly={true} plaintext="true" value={value.v2}></Form.Control>
                </Col>
              </Form.Group>
              <SetProperty propertyname="trigger">
                <TriggerInput/>
              </SetProperty>
              <SetProperty propertyname="v1">
                <V1Input/>
              </SetProperty>
              <DeleteContext contextinstance={value.contextinstance}>
                <DeleteButton/>
              </DeleteContext>
            </Card.Body>
          </Card>
        }
    </PSView.Consumer>
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
  const ctxt = {"interneProperties": {"model:TestBotActie$Test$binnenRolBeschrijving$trigger": ["true"]}};
  return (<Button variant="primary" onClick={e => props.create(ctxt)}>Voeg een test toe</Button>);
}

function DeleteButton (props)
{
  return (<Button variant="danger" onClick={e => props.delete()}>Verwijder</Button>);
}

export default TestBotActieScreen
