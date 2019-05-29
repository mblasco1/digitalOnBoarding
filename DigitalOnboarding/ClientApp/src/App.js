import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Phone } from './components/Phone';
import { IdCheck } from './components/IdCheck';
import { Address } from './components/Address';
import { BioID } from './components/BioID';

export default class App extends Component {
    displayName = App.name

    constructor(props) {
        super(props);
        this.uploaded = false;
        this.onImageUpload = this.onImageUpload.bind(this);
    }

    async onImageUpload(dataUrl, type) {
        if (type === "id") {
            this.idphoto = dataUrl;
        } else {
            if (!this.liveimage1) {
                this.liveimage1 = dataUrl;
            } else {
                this.liveimage2 = dataUrl;
            }
        }
        if (!this.uploaded && this.idphoto && this.liveimage1 && this.liveimage2) {
            this.uploaded = true;
            let result = await fetch('/api/bioid/photoverify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idphoto: this.idphoto,
                    liveimage1: this.liveimage1,
                    liveimage2: this.liveimage2,
                    accuracy: 5
                })
            });
            console.log(result);
        }
    }

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
                    <IdCheck onImageUpload={this.onImageUpload}/>
                </Tab>
                <Tab eventKey="bioId" title="BioID">
                    <BioID onImageUpload={this.onImageUpload}/>
                </Tab>
            </Tabs>
        );
    }
}
