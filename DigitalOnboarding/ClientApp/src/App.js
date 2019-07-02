import React, { Component } from 'react';
import { Route, Link} from 'react-router-dom';
import { IdCheck } from './components/IdCheck';
import { Address } from './components/Address';
import { BioID } from './components/BioID';

export default class App extends Component {
    displayName = App.name

    constructor(props) {
        super(props);
        this.uploaded = false;
        this.onImageUpload = this.onImageUpload.bind(this);
        this.onRestart = this.onRestart.bind(this);
        this.onTabSelect = this.onTabSelect.bind(this);
        this.onAddressValidated = this.onAddressValidated.bind(this);
        this.state = {
            bioIdSelected: false
        };
    }

    onTabSelect(eventKey) {
        this.setState({ bioIdSelected: eventKey === "bioId" });
    }

    onRestart() {
        console.log("restarting...");
        this.liveimage1 = undefined;
        this.liveimage2 = undefined;
    }

    onAddressValidated(address) {
        this.address = {};
        address.forEach((value, key) => { this.address[key] = value });
    }

    async onImageUpload(dataUrl, type) {
        console.log("uploading " + type);
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

            
            let response = await result.json()
            console.log("photoverify:", response);
            window.alert(result.status + ": " + JSON.stringify(response));
        }
    }

    render() {
        return (
            <div>
                <nav>
                    <Link to="/address">
                        <span style={{ margin: 10 }}>Address</span>
                    </Link>&gt;
                    <Link to="/idCheck">
                        <span style={{ margin: 10 }}>Id Check</span>
                    </Link>&gt;
                    <Link to="/livenessCheck">
                        <span style={{ margin: 10 }}>Liveness Check</span>
                    </Link>
                </nav>


                <hr />
                <Route
                    path="/address"
                    component={props => <Address {...props} onAddressValidated={this.onAddressValidated} />}
                />
                <Route
                    path="/idCheck"
                    component={props => <IdCheck {...props} onImageUpload={this.onImageUpload} />}
                />
                <Route
                    path="/livenessCheck"
                    component={props => <BioID {...props} onImageUpload={this.onImageUpload} onRestart={this.onRestart} />}
                />
            </div>
        );
    }
}
