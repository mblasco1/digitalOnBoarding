import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export class Address extends Component {
    displayName = Address.name
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();

        var result = await fetch('/api/address/verify', {
            method: 'POST',
            body: new FormData(event.target)
        });
        console.log(result);
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group as={Row} controlId="name">
                    <Form.Label column sm={2}>
                        Name
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="text" placeholder="Name" name="name" />
                    </Col>
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col} xs={8} controlId="street">
                        <Form.Label>Street</Form.Label>
                        <Form.Control type="text" placeholder="Street" name="street" />
                    </Form.Group>

                    <Form.Group as={Col}  controlId="streetNbr">
                        <Form.Label>Street Number</Form.Label>
                        <Form.Control type="text" placeholder="Street Number" name="houseNumber" />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} xs={4} controlId="zip">
                        <Form.Label>Zip Code</Form.Label>
                        <Form.Control type="number" placeholder="Zip Code" name="postalCode"/>
                    </Form.Group>

                    <Form.Group as={Col} xs={8} controlId="town">
                        <Form.Label>Town</Form.Label>
                        <Form.Control type="text" placeholder="Town" name="city" />
                    </Form.Group>
                </Form.Row>

                <Form.Group as={Row} controlId="email">
                    <Form.Label column sm={2}>
                        Email
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="email" placeholder="Email" />
                    </Col>
                </Form.Group>

                <Form.Group as={Col} controlId="nationality">
                    <Form.Label>Nationality</Form.Label>
                    <Form.Control as="select">
                        <option>Switzerland</option>
                        <option>Germany</option>
                    </Form.Control>
                </Form.Group>


                <Form.Group as={Row}>
                    <Col sm={{ span: 10, offset: 2 }}>
                        <Button type="submit">Submit</Button>
                    </Col>
                </Form.Group>
            </Form>
        );
    }
}