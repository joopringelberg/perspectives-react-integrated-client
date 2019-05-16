import React, { Component } from "react";
import "./App.css";
import { main } from 'perspectives-core';
import { Context, Rollen, RolBinding, View, ContextOfRole, ExternalViewOfBoundContext, ViewOnExternalRole, SetProperty, InternalViewOfBoundContext, CreateContext } from "perspectives-react";

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
            <InternalViewOfBoundContext rolname="zaken" viewname="allProps">
              <TestBotActie/>
            </InternalViewOfBoundContext>
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
      <p><label>v2:</label>{props.v2}</p>
      <SetProperty propertyname="trigger" namespace={props.namespace} rolinstance={props.rolinstance}>
        <TriggerInput/>
      </SetProperty>
      <SetProperty propertyname="v1" namespace={props.namespace} rolinstance={props.rolinstance}>
        <V1Input/>
      </SetProperty>
    </div>
  );
}
function V1Input (props)
{
  return (<fieldset>
    <legend>Verander v1:</legend>
    <input defaultValue={props.defaultvalue} onBlur={e => props.setvalue(e.target.value)} />
    </fieldset>);
}

function TriggerInput (props)
{
  return (<fieldset>
    <legend>Verander trigger:</legend>
    <input defaultValue={props.defaultvalue} onBlur={e => props.setvalue(e.target.value)} />
    </fieldset>);
}

function CreateButton (props)
{
  return (<button onClick={e => props.create({trigger: true})}>Maak test</button>);
}

export default App;
