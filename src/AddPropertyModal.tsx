import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Form, Modal, Row } from "react-bootstrap";
import { AddError, apiUrl, State } from "./types";
import { validateAddForm } from "./utils";

type AddPropertyModalProp = {
  handleModalClose: () => void;
};

type FieldErrorProps = {
  fieldName: string;
};

const AddPropertyModal: React.VFC<AddPropertyModalProp> = ({
  handleModalClose,
}) => {
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState<AddError[]>([]);
  const [globalError, setGlobalError] = useState<string>();
  const [address, setAddress] = useState<string>("");
  const [suburb, setSuburb] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleModalSubmit = () => {
    const errors = validateAddForm(address, suburb, state, price, description);

    if (errors.length) {
      setErrors(errors);
      return false;
    }

    setLoading(true);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        address: address,
        suburb: suburb,
        state: state,
        price: +price,
        description: description,
      }),
    };

    fetch(`${apiUrl}/property`, requestOptions).then((response) => {
      if (!response.ok)
        response.text().then((text) => {
          setGlobalError(text);
          setLoading(false);
        });
      else {
        setLoading(false);
        handleModalClose();
      }
    });
  };

  useEffect(() => {
    setAddress("");
    setSuburb("");
    setState("");
    setPrice("");
    setDescription("");
    setErrors([]);
    setGlobalError("");
  }, []);

  const hasError = (field: string) => errors.indexOf(field) !== -1;

  const FieldError: React.VFC<FieldErrorProps> = ({ fieldName }) => (
    <div className="text-danger ms-1" hidden={!hasError(fieldName)}>
      Invalid {fieldName}
    </div>
  );

  return (
    <Modal backdrop="static" show className="add-property-modal">
      <Modal.Header closeButton onClick={handleModalClose}>
        <Modal.Title>Add property</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row className="pb-3">
          <Col className="col-8">
            <Form.Control
              type="text"
              placeholder="Street Address"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              className={hasError("address") ? "is-invalid" : ""}
            />
            <FieldError fieldName="address" />
          </Col>
          <Col className="col-4">
            <Form.Control
              type="text"
              placeholder="Suburb"
              value={suburb}
              onChange={(e) => {
                setSuburb(e.target.value);
              }}
              className={hasError("suburb") ? "is-invalid" : ""}
            />
            <FieldError fieldName="suburb" />
          </Col>
        </Row>
        <Row className="pb-3">
          <Col className="col-6">
            <Form.Control
              as="select"
              value={state}
              onChange={(e) => {
                setState(e.target.value);
              }}
              className={hasError("state") ? "is-invalid" : ""}
            >
              <option value="">Select a state</option>
              {Object.values(State).map((stateValue: string) => (
                <option key={`state${stateValue}`} value={stateValue}>
                  {stateValue}
                </option>
              ))}
            </Form.Control>
            <FieldError fieldName="state" />
          </Col>
          <Col className="col-6">
            <Form.Control
              type="text"
              placeholder="Price (number only)"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              className={hasError("price") ? "is-invalid" : ""}
            />
            <FieldError fieldName="price" />
          </Col>
        </Row>
        <Row>
          <Col className="col-12">
            <Form.Control
              as="textarea"
              placeholder="Description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              style={{ height: "5em" }}
              className={hasError("description") ? "is-invalid" : ""}
            />
            <FieldError fieldName="description" />
          </Col>
        </Row>
        {globalError && (
          <Row className="pt-3">
            <Col className="col-12">
              <Alert variant="danger">{globalError}</Alert>
            </Col>
          </Row>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={handleModalClose}
          disabled={isLoading}
        >
          Close
        </Button>
        <Button
          variant="primary"
          onClick={handleModalSubmit}
          disabled={isLoading}
        >
          Save changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddPropertyModal;
