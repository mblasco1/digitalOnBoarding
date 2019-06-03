import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { BrowserRouter as Route, Link} from 'react-router-dom';
import { Layout } from './components/Layout';
import { Phone } from './components/Phone';
import { IdCheck } from './components/IdCheck';
import { Address } from './components/Address';
import { BioID } from './components/BioID';
import { Home } from './components/Home';

export default class App extends Component {
    displayName = App.name

    constructor(props) {
        super(props);
        this.uploaded = false;
        this.onImageUpload = this.onImageUpload.bind(this);
        this.onRestart = this.onRestart.bind(this);
    }

    onRestart() {
        this.liveimage1 = undefined;
        this.liveimage2 = undefined;
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
        if (this.idphoto && this.liveimage1 && this.liveimage2) {
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
                    accuracy: 1
                })
            });
            console.log("photoverify:", await result.json());
        }
    /*<Tabs defaultActiveKey="profile">
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
        </Tabs>*/

        /* <div>
                <nav>
                    <Link to="/phone">
                        Phone
                    </Link>
                    <Link to="/address">
                        Address
                    </Link>
                    <Link to="/idCheck">
                        Id Check
                    </Link>
                    <Link to="/bioId">
                        BioId
                    </Link>
                </nav>
                <hr />
                <Route path="/phone" component={Phone} />
                <Route path="/address" component={Address} />
                <Route
                    path="/idCheck"
                    component={props => <IdCheck {...props} onImageUpload={me.onImageUpload} />}
                />
                <Route
                    path="/bioId"
                    component={props => <BioID {...props} onImageUpload={me.onImageUpload} />}
                />
            </div>*/
    }

    render() {
        let me = this;
        return (
           
            <Tabs defaultActiveKey="profile">
                <Tab eventKey="phone" title="Phone">
                    <Phone />
                </Tab>
                <Tab eventKey="adress" title="Address">
                    <Address />
                </Tab>
                <Tab eventKey="idcheck" title="ID Check">
                    <IdCheck onImageUpload={this.onImageUpload} />
                </Tab>
                <Tab eventKey="bioId" title="BioID">
                    <BioID onImageUpload={this.onImageUpload} onRestart={this.onRestart}/>
                </Tab>
            </Tabs>
        );
    }
}
