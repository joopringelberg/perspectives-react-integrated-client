import React, { Component } from "react";
import "./App.css";
import { main } from 'perspectives-core';
import {
    Context,
    Rol,
    View,
    SetProperty,
    PSView} from "perspectives-react";

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
        <Context contexttype="model:Perspectives$PerspectivesSysteem" contextinstance="model:User$MijnSysteem">
          <Rol rol="gebruiker">
            <View viewname="VolledigeNaam">
              <GebruikerNaam />
              <SetProperty propertyname="voornaam">
                <GebruikerVoornaamInput/>
              </SetProperty>
            </View>
          </Rol>
        </Context>
      </div>
    );
  }
}

function GebruikerNaam ()
{
  return (
    <PSView.Consumer>
      {value => <p><label>Gebruiker:</label>{value.voornaam + " " + value.achternaam}</p>}
    </PSView.Consumer>
  );
}

function GebruikerVoornaamInput (props)
{
  return (<fieldset>
    <legend>Verander de gebruikers' voornaam in:</legend>
    <input defaultValue={props.defaultvalue} onBlur={e => props.setvalue(e.target.value)} />
    </fieldset>);
}

export default App;
