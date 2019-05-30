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

import 'bootstrap/dist/css/bootstrap.min.css';

// Start the core. 4
main();

class App extends Component
{
  render ()
  {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">perspectives-react-integrated-client</h1>
        </header>
        <Context type="model:Perspectives$PerspectivesSysteem" contextinstance="model:User$MijnSysteem">
          <Rollen rollen={[
            "gebruiker",
            "modellen",
            "trustedCluster",
            "zaken"
          ]}>
            <View rolname="gebruiker" viewname="VolledigeNaam">
              <GebruikerNaam />
              <SetProperty propertyname="voornaam">
                <GebruikerVoornaamInput/>
              </SetProperty>
            </View>
            <RolBinding rolname="trustedCluster">
              <ContextOfRole>
                <ViewOnExternalRole viewname="Kaartje">
                  <TrustedCluster_BuitenRol_Kaartje />
                </ViewOnExternalRole>
              </ContextOfRole>
            </RolBinding>
            <ExternalViewOfBoundContext rolname="trustedCluster" viewname="Kaartje">
              <TrustedCluster_BuitenRol_Kaartje />
            </ExternalViewOfBoundContext>
            <RolBinding rolname="trustedCluster">
              <View viewname="Kaartje">
                <TrustedCluster_BuitenRol_Kaartje />
              </View>
              <ContextOfRole>
                <Rollen rollen={["clusterGenoot"]}>
                  <View rolname="clusterGenoot" viewname="Adressering">
                    <ClusterGenoot />
                  </View>
                </Rollen>
              </ContextOfRole>
            </RolBinding>
            <ModelId rolname="modellen" />
            <RolBinding rolname="zaken">
              <ContextOfRole>
                <ViewOnInternalRole viewname="allProps">
                  <TestBotActie/>
                </ViewOnInternalRole>
                <DeleteContext>
                  <DeleteButton/>
                </DeleteContext>
              </ContextOfRole>
            </RolBinding>
          </Rollen>
          <CreateContext rolname="zaken" contextname="model:TestBotActie$Test">
            <CreateButton/>
          </CreateContext>
        </Context>

      </div>
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
    <div>
      <Form.Group controlId="testBotActie">
        <Form.Label>Afhankelijke property</Form.Label>
        <Form.Text>{props.v2}</Form.Text>
      </Form.Group>
      <SetProperty propertyname="trigger" namespace={props.namespace} rolinstance={props.rolinstance} rolname={props.rolname} value={props.trigger}>
        <TriggerInput/>
      </SetProperty>

      <SetProperty propertyname="v1" namespace={props.namespace} rolinstance={props.rolinstance} rolname={props.rolname} value={props.v1}>
        <V1Input/>
      </SetProperty>
    </div>
  );
}

function TriggerInput (props)
{
  return (
    <Form.Group>
      <Form.Label>Zet aan of uit:</Form.Label>
      <Form.Text className="text-muted">
        Alleen als de trigger 'true' is, wordt de onafhankelijke property naar de afhankelijke gekopieerd.
      </Form.Text>
      <ToggleButtonGroup type="checkbox" defaultValue={props.defaultvalue} onBlur={e => props.setvalue(e.target.value)} >
        <ToggleButton value={"true"}>true</ToggleButton>
        <ToggleButton value={"false"}>false</ToggleButton>
      </ToggleButtonGroup>
    </Form.Group>);
}

function V1Input (props)
{
  return (<fieldset>
    <legend>Verander v1:</legend>
    <input defaultValue={props.defaultvalue} onBlur={e => props.setvalue(e.target.value)} />
    </fieldset>);
}

function CreateButton (props)
{
  return (<Button variant="primary" onClick={e => props.create({"model:TestBotActie$Test$binnenRolBeschrijving$trigger": ["true"]})}>Maak test</Button>);
}

function DeleteButton (props)
{
  return (<Button variant="danger" onClick={e => props.delete()}>Verwijder</Button>);
}

export default App;
