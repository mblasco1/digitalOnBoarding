import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Phone } from './components/Phone';
import { IdCheck } from './components/IdCheck';
import { Address } from './components/Address';

export default class App extends Component {
  displayName = App.name

  render() {
    return (
        <Tabs defaultActiveKey="profile">
            <Tab eventKey="phone" title="Phone">
                <Phone />
            </Tab>
            <Tab eventKey="adress" title="Address">
                <Address />
            </Tab>
            <Tab eventKey="idcheck" title="ID Check">
                <IdCheck />
            </Tab>
        </Tabs>
    );
  }
}
