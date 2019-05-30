import React, { Component } from "react";
import "./App.css";
import { main } from 'perspectives-core';
import {
    Context,
    Rol,
    View,
    SetProperty,
    PSView,
    RolBinding,
    ContextOfRole,
    BoundContext,
    ExternalRole,
    ExternalViewOfBoundContext,
    ViewOnExternalRole} from "perspectives-react";

import Form from 'react-bootstrap/Form';
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
            <h1>perspectives-react-integrated-client</h1>
          </header>
        </Row>
        <Row>
          <Form>
            <Context contexttype="model:Perspectives$PerspectivesSysteem" contextinstance="model:User$MijnSysteem">
              <Rol rol="gebruiker">
                <ContextOfRole>
                  <p>Inside ContextOfRole</p>
                  <Rol rol="gebruiker">
                    <View viewname="VolledigeNaam">
                      <Card>
                        <Card.Body>
                          <GebruikerNaam />
                        </Card.Body>
                      </Card>
                    </View>
                  </Rol>
                </ContextOfRole>
                <View viewname="VolledigeNaam">
                  <Card>
                    <Card.Body>
                      <GebruikerNaam />
                    </Card.Body>
                  </Card>
                  <SetProperty propertyname="voornaam">
                    <GebruikerVoornaamInput/>
                  </SetProperty>
                </View>
              </Rol>
              <Rol rol="trustedCluster">
                <RolBinding>
                  <p>Inside RolBinding</p>
                  <View viewname="Kaartje">
                    <TrustedCluster_BuitenRol_Kaartje/>
                  </View>
                </RolBinding>
                <BoundContext>
                  <p>Inside BoundContext, arriving at TrustedCluster.</p>
                  <Rol rol="clusterGenoot">
                    <View viewname="Adressering">
                      <ClusterGenoot/>
                    </View>
                  </Rol>
                  <ExternalRole>
                    <p>Inside ExternalRole, arriving at the buitenRol of TrustedCluster</p>
                    <View viewname="Kaartje">
                      <TrustedCluster_BuitenRol_Kaartje/>
                    </View>
                  </ExternalRole>
                  <ViewOnExternalRole viewname="Kaartje">
                    <p>Inside ViewOnExternalRole, arriving at the View Kaartje of the buitenRol of TrustedCluster</p>
                    <TrustedCluster_BuitenRol_Kaartje />
                  </ViewOnExternalRole>
                </BoundContext>
                <ExternalViewOfBoundContext viewname="Kaartje">
                  <p>Inside ExternalViewOfBoundContext, arriving at the View Kaartje of the buitenRol of TrustedCluster</p>
                  <TrustedCluster_BuitenRol_Kaartje />
                </ExternalViewOfBoundContext>
              </Rol>
            </Context>
          </Form>
        </Row>
      </Container>
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

function TrustedCluster_BuitenRol_Kaartje ()
{
  return (
    <PSView.Consumer>
      {value => <p><label>TrustedCluster:</label>{value.naam}</p>}
    </PSView.Consumer>
  );
}

function ClusterGenoot ()
{
  return (
    <PSView.Consumer>
      {value => <p>Clustergenoot {value.voornaam} heeft url: {value.url}</p>}
    </PSView.Consumer>
  );
}


export default App;
