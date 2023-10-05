import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { DataItem } from "../components/DataItem";
import { useQueryContext } from "../context/QueryContext";
import { makeInitialQuery, makeQueryByKey, makeFullQuery } from "../hooks/useQuery";
const MAX_PAGES_DISPLAY = 3; // Adjust the number of pages to display

export function Home() {
  const context = useQueryContext();
  // Calculate the range of page numbers to display
  // setStartPage(1)
  const [selectedDoc, setSelectedDoc] = useState<any>(null); // Explicitly set the type as 'any'
  const [pageNum, setPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [startPage, setStartPage] = useState<number>(Math.max(1, pageNum - Math.floor(MAX_PAGES_DISPLAY / 2)));
  const [endPage, setEndPage] = useState<number>(Math.min(totalPages, startPage + MAX_PAGES_DISPLAY - 1));
  
  // Generate the page number links within the calculated range
  const pageLinks = [];
  for (let i = startPage; i <= endPage; i++) {
    pageLinks.push(
      <li key={i} className="page-item">
        <a
          onClick={() => setPageNum(i)}
          className="page-link"
          href="javascript:void(0);"
        >
          {i}
        </a>
      </li>
    );
  }

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await makeInitialQuery(pageNum);
  //     context.setQueryData(data);
  //     setSelectedDoc(null);
  //   };
  const fetchData = async () => {
    try {
      if (context.queryParameters !== undefined) {
        context.setQueryData([]); // Clear previous data
        if (context.initialRender === 0) {
          await context.performInitialQuery(pageNum);
          let pgcount = await context.getCollectionCounts();
          if (pgcount) {
            let startPage = Math.max(1, pageNum - Math.floor(MAX_PAGES_DISPLAY / 2));
            let endPage = Math.min(pgcount, startPage + MAX_PAGES_DISPLAY - 1);
            let totalPages = (pgcount as unknown as number)
            setEndPage(endPage)
            setTotalPages(totalPages)
          }
          // context.setInitialRender(1);
        } else {
          await context.performFullQuery(pageNum)
          let pgcount = await context.getCollectionCounts();
          if (pgcount) {
            let startPage = Math.max(1, pageNum - Math.floor(MAX_PAGES_DISPLAY / 2));
            let endPage = Math.min(pgcount, startPage + MAX_PAGES_DISPLAY - 1);
            let totalPages = (pgcount as unknown as number)
            setEndPage(endPage)
            setTotalPages(totalPages)
          }

          // context.setQueryData(data);
          // setSelectedDoc(null);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // fetchData();

  useEffect(() => {
    fetchData();
  }, [pageNum, context.dataForQuery, context.initialRender]);
  useEffect(() => {
    //placeholder
  }, [context.queryData]);

  const handleSelect = async (doc: any) => {
    try {
      if(doc.doc){
        const response = await makeQueryByKey({ key: doc.doc._key, includeEdges: true });
        setSelectedDoc(response[0]);
      }
      else{
        const response = await makeQueryByKey({ key: doc._key, includeEdges: true });
        setSelectedDoc(response[0]);
      }

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  console.log("selectedDoc:", selectedDoc);

  return (
    <div  className="home-conatiner"> {/* Apply the CSS class to the container */}
    <>
      {/* Conditionally render the title "Selected Doc" */}
      {selectedDoc && <h1>Selected Doc</h1>}
      {selectedDoc ? (
        // Display the selected document and its connected docs
        <Row>
          <Col>
            <div className="data-item"> 
            <DataItem {...selectedDoc.doc} />
            </div> 
            {selectedDoc.connectedDocs && selectedDoc.connectedDocs.length > 0 ? (
              <>
                <h1>Connected Docs</h1>
                <Row md={2} xs={1} lg={3} className="g-3">
                  {selectedDoc.connectedDocs[0].map((data: any) => (
                    <Col key={data._key}>
                      <DataItem {...data} 
                       key={data._key}
                       onSelect={() => handleSelect(data)} // Pass the entire doc as selected
                       />
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
                  <div className="data-item"> 
                  <DataItem
                    {...item.doc}
                    key={item.doc._key}
                    onSelect={() => handleSelect(item)} // Pass the entire doc as selected
                  />
                  </div>
                </Col>
              ))}
          </Row>
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className={`page-item ${pageNum === 1 ? 'disabled' : ''}`}>
                <a
                  onClick={() => setPageNum(pageNum - 1)}
                  className="page-link"
                  href="javascript:void(0);"
                >
                  Previous
                </a>
              </li>
              {context.queryData && (
                <>
                  {Array.from(
                    { length: Math.min(MAX_PAGES_DISPLAY) },
                    (_, i) => pageNum - Math.floor(MAX_PAGES_DISPLAY / 2) + i
                  ).map((number) => (
                    // Check if the number is greater than 0 and less than or equal to totalPages
                    number > 0 && number <= totalPages && (
                      <li
                        key={number}
                        className={`page-item ${number === pageNum ? "active" : ""}`}
                      >
                        <a
                          onClick={() => setPageNum(number)}
                          className="page-link"
                          href="javascript:void(0);"
                        >
                          {number}
                        </a>
                      </li>
                    )
                  ))}
                </>
              )}
              <li className={`page-item ${pageNum === totalPages ? 'disabled' : ''}`}>
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
    </div>
  );
}