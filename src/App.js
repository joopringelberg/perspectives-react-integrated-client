import React, { Component } from "react";
import "./App.css";
import { main } from 'perspectives-core';
import { Context, Binding, View, ContextVanRol, ExterneView } from "perspectives-react";

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
        <Context type="model:Systeem$Systeem" rollen={[
          "gebruiker",
          "modellen",
          "trustedCluster"
        ]} instance="model:User$MijnSysteem">
          <View rol="gebruiker" viewnaam="VolledigeNaam">
            <GebruikerNaam />
          </View>
          <ExterneView rol="trustedCluster" viewnaam="Kaartje">
            <TrustedCluster_BuitenRol_Kaartje />
          </ExterneView>
          <Binding rol="trustedCluster">
            <View viewnaam="Kaartje">
              <TrustedCluster_BuitenRol_Kaartje />
            </View>
            <ContextVanRol rollen={["clusterGenoot"]}>
              <View rol="clusterGenoot" viewnaam="Adressering">
                <ClusterGenoot />
              </View>
            </ContextVanRol>
          </Binding>
          <ModelId rol="modellen" />

          {/*<View rol="modellen" viewnaam="AlleModellen">*/}
          {/*<Models/>*/}
          {/*</View>*/}
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
  return <li key={props.instance}>{props.instance}</li>;
}

function ClusterGenoot (props)
{
  return <p>Clustergenoot {props.voornaam} heeft url: {props.url}</p>;
}

export default App;
