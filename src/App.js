import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function Quotable() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);

  async function updateQuote() {
    setLoading(true);
    try {
      const response = await fetch("https://api.quotable.io/random");
      const { statusCode, statusMessage, ...data } = await response.json();
      if (!response.ok) throw new Error(`${statusCode} ${statusMessage}`);
      setData(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setData({ content: "Opps... Something went wrong" });
      setLoading(false);
    }
  }

  React.useEffect(() => {
    updateQuote();
  }, []);

  if (!data) return null;

  // function downloadQuote() {
  //   // const saveFile = () => {
  //   saveAs(data.content);
  //   // };
  // }

  return (
    <div className="App">
      <Card>
        <Card.Body>
          <blockquote className="blockquote mb-0">
            {loading ? (
              <p>Generating New Quote .... </p>
            ) : (
              <>
                <p>" {data.content} "</p>
                {data.author && (
                  <footer className="blockquote-footer">
                    <cite title="Source Title">
                      {" "}
                      <span>Author : </span> &nbsp; {data.author}
                    </cite>
                  </footer>
                )}
              </>
            )}
          </blockquote>
        </Card.Body>
        <Card.Footer>
          <Button variant="primary" onClick={updateQuote}>
            New Quote
          </Button>
          {/* <Button variant="primary" onClick={downloadQuote}>
            Download
          </Button> */}
        </Card.Footer>
      </Card>
    </div>
  );
}
