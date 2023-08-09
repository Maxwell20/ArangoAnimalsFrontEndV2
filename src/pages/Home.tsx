import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { DataItem } from "../components/DataItem";
import { useQueryContext } from "../context/QueryContext";
import { makeInitialQuery } from "../hooks/useQuery";

export function Home() {
  const context = useQueryContext();
  const [selectedDoc, setSelectedDoc] = useState<any>(null); // Explicitly set the type as 'any'
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const data = await makeInitialQuery(pageNum);
      context.setQueryData(data);
      setSelectedDoc(null);
    };

    fetchData();
  }, [pageNum, context.setQueryData]);

  const handleSelect = (doc: any) => {
    setSelectedDoc(doc);
  };

  console.log("selectedDoc:", selectedDoc);

  return (
    <>
      <h1>Selected Doc</h1>
      {selectedDoc ? (
        // Display the selected document and its connected docs
        <Row>
          <Col>
            <DataItem {...selectedDoc.doc} />
            {selectedDoc.connectedDocs && selectedDoc.connectedDocs.length > 0 ? (
              <>
                <h1>Connected Docs</h1>
                <Row md={2} xs={1} lg={3} className="g-3">
                  {selectedDoc.connectedDocs.map((data: any) => (
                    <Col key={data._key}>
                      <DataItem {...data} />
                    </Col>
                  ))}
                </Row>
              </>
            ) : null}
          </Col>
        </Row>
      ) : (
        // Display the original list of data items if context.queryData is defined
        <>
          <Row md={2} xs={1} lg={3} className="g-3 mh-100">
            {context.queryData &&
              context.queryData.map((item: any) => (
                <Col key={item.doc._key}>
                  <DataItem
                    {...item.doc}
                    key={item.doc._key}
                    onSelect={() => handleSelect(item)} // Pass the entire doc as selected
                  />
                </Col>
              ))}
          </Row>
          <nav aria-label="Page navigation example">
            {/* Page navigation */}
            <ul className="pagination">
              <li className="page-item">
                <a
                  onClick={() => setPageNum(pageNum - 1)}
                  className="page-link"
                  href="javascript:void(0);"
                >
                  Previous
                </a>
              </li>
              <li className="page-item">
                <a
                  onClick={() => setPageNum(1)}
                  className="page-link"
                  href="javascript:void(0);"
                >
                  1
                </a>
              </li>
              <li className="page-item">
                <a
                  onClick={() => setPageNum(2)}
                  className="page-link"
                  href="javascript:void(0);"
                >
                  2
                </a>
              </li>
              <li className="page-item">
                <a
                  onClick={() => setPageNum(3)}
                  className="page-link"
                  href="javascript:void(0);"
                >
                  3
                </a>
              </li>
              <li className="page-item">
                <a
                  onClick={() => setPageNum(pageNum + 1)}
                  className="page-link"
                  href="javascript:void(0);"
                >
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </>
      )}
    </>
  );
}