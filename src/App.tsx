import React, { useState } from "react";
import { Alert, Col, Container, Form, Row } from "react-bootstrap";
import AddPropertyModal from "./AddPropertyModal";
import { apiUrl, PropertyResult } from "./types";
import PropertyList from "./PropertyList";

export const App = () => {
  const [isAddNewModalOpen, setAddNewModalOpen] = useState(false);
  const [searchResult, setSearchResult] = useState<PropertyResult[]>();
  const [searchError, setSearchError] = useState<string>();
  const [searchSuburb, setSearchSuburb] = useState<string>("");

  const handleClickAdd = () => {
    setAddNewModalOpen(true);
  };

  const handleModalClose = () => {
    setAddNewModalOpen(false);
  };

  const handleClickSearch = () => {
    setSearchError(undefined);

    const fetchUrl = new URL(`${apiUrl}/properties`);
    const searchParams = { suburb: searchSuburb.trim() };
    fetchUrl.search = new URLSearchParams(searchParams).toString();

    fetch(fetchUrl.toString()).then((response) => {
      if (!response.ok)
        response.text().then((text) => {
          setSearchResult(undefined);
          setSearchError(text);
        });
      else {
        response.json().then((json) => {
          setSearchResult(json.data);
        });
      }
    });
  };

  return (
    <>
      <Container className="w-50 mt-5">
        <Row className="mb-12">
          <Col className="col-2 text-end">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleClickAdd}
            >
              Add
            </button>
          </Col>
          <Col className="col-8 text-start">
            <Container>
              <Row>
                <Col className="col-6 text-end">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleClickSearch}
                  >
                    Search
                  </button>
                </Col>
                <Col className="col-6">
                  <Form.Control
                    type="text"
                    placeholder="Suburb"
                    value={searchSuburb}
                    onChange={(e) => {
                      setSearchSuburb(e.target.value);
                    }}
                  />
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
        {searchError && (
          <Row className="mt-4">
            <Col className="col-12">
              <Alert variant="danger">{searchError}</Alert>
            </Col>
          </Row>
        )}
      </Container>
      {searchResult && (
        <div className="m-auto mt-4" style={{ maxWidth: "50em" }}>
          <PropertyList properties={searchResult} />
        </div>
      )}
      {isAddNewModalOpen && (
        <AddPropertyModal handleModalClose={handleModalClose} />
      )}
    </>
  );
};
