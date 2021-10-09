import React, { useState, ChangeEvent } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import ChartContainer from "./ChartContainer";
import { validateUrl } from "./utils";
import { NumericTableData } from "./types";
import SingleColumnTableDataContainer from "./SingleColumnTableDataContainer";

const apiUrl = "http://localhost:3001";

export const App = () => {
  const [wikiUrl, setWikiUrl] = useState<string>(
    "https://en.wikipedia.org/wiki/Women%27s_high_jump_world_record_progression"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [validUrl, setValidUrl] = useState(true);
  const [error, setError] = useState<string>();
  const [data, setData] = useState<NumericTableData[]>();

  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setWikiUrl(url);
  };

  const handleSubmit = () => {
    setError(undefined);
    setData(undefined);

    if (!validateUrl(wikiUrl)) {
      setValidUrl(false);
      return false;
    }
    setIsLoading(true);
    setValidUrl(true);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ wikiUrl }),
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          setError(response.error);
        } else {
          setData(response.data);
        }
        setIsLoading(false);
      });
  };

  const showChart = data && Object.keys(data[0]).length === 2;

  return (
    <>
      <Container className="w-25 mt-5">
        <Row>
          <Col className="col-12">
            <h5>Bar Charts</h5>
            <ul>
              <li>
                https://en.wikipedia.org/wiki/Women%27s_high_jump_world_record_progression
              </li>
              <li>https://en.wikipedia.org/wiki/Academy_Awards</li>
            </ul>
            <h5>Value list when only one numeric column found</h5>
            <ul>
              <li>
                https://en.wikipedia.org/wiki/Make_Me_(Britney_Spears_song)
              </li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col className="col-11">
            <Form.Control
              type="text"
              placeholder="Enter a Wikipedia URL"
              value={wikiUrl}
              onChange={handleUrlChange}
            />
            {!validUrl && (
              <span className={"text-danger"}>
                Please enter a fully qualified Wikipedia URL
              </span>
            )}
          </Col>
          <Col className="col-1">
            <Button
              variant="primary"
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              Submit
            </Button>
          </Col>
        </Row>
        <Row>
          <Col className="col-12">
            {isLoading && <span>Scanning the url for suitable tables...</span>}
            {error && <span className={"text-danger"}>{error}</span>}
          </Col>
        </Row>
      </Container>
      {data && (
        <div className="pt-5">
          {
            // if 2 numeric columns found, show the bar chart. Otherwise show a table of result only. (It's difficult to show a chart for 1-dimensional data)
            showChart ? (
              <ChartContainer data={data} />
            ) : (
              <SingleColumnTableDataContainer data={data} />
            )
          }
        </div>
      )}
    </>
  );
};
