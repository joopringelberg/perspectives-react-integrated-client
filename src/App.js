import React, { Component } from "react";
import "./App.css";
import { main } from 'perspectives-core';
import { Context, Rollen, RolBinding, View, ContextOfRole, ExternalViewOfBoundContext, ViewOnExternalRole, SetProperty } from "perspectives-react";

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
        <Context type="model:Systeem$Systeem" contextinstance="model:User$MijnSysteem">
          <Rollen rollen={[
            "gebruiker",
            "modellen",
            "trustedCluster"
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

            {/*<View rolname="modellen" viewname="AlleModellen">*/}
            {/*<Models/>*/}
            {/*</View>*/}
          </Rollen>
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

export default App;
