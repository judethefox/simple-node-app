import React from "react";
import { PricePoint, PropertyResult } from "./types";
import { Badge, Col, Container, Row, Table } from "react-bootstrap";

type PropertyListProps = {
  properties: PropertyResult[];
};

type PricePointIndicatorProps = {
  pricePoint: PricePoint;
};

const PricePointIndicator: React.VFC<PricePointIndicatorProps> = ({
  pricePoint,
}) =>
  pricePoint === PricePoint.AboveAverage ? (
    <Badge bg="warning">High</Badge>
  ) : pricePoint === PricePoint.EqualAverage ? (
    <Badge bg="info">Average</Badge>
  ) : (
    <Badge bg="success">Low</Badge>
  );

const PropertyList: React.VFC<PropertyListProps> = ({ properties }) => (
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>Address</th>
        <th>Suburb</th>
        <th>State</th>
        <th>Price</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      {properties.map(
        ({ address, suburb, state, price, description, pricePoint }) => (
          <tr key={`propertyList${address}${suburb}${state}`}>
            <td>{address}</td>
            <td>{suburb}</td>
            <td>{state}</td>
            <td>
              <Container className="pe-4">
                <Row>
                  <Col className="col-7">{price}</Col>
                  <Col className="col-5">
                    <PricePointIndicator pricePoint={pricePoint} />
                  </Col>
                </Row>
              </Container>
            </td>
            <td>{description}</td>
          </tr>
        )
      )}
    </tbody>
  </Table>
);
export default PropertyList;
