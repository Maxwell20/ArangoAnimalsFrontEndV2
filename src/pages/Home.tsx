import { Row, Col } from "react-bootstrap";
import { DataItem } from "../components/DataItem";
import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useQueryContext } from "../context/QueryContext";
import { makeInitialQuery } from "../hooks/useQuery";

export function Home() {
  console.log("page refreshed!!!");
  const context = useQueryContext();  // Use useQueryContext hook

  const [counter, setCounter] = useState<number>(0);
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const data = await makeInitialQuery(pageNum);
      context.setQueryData(data); // Set the fetched data to the state
    };

    fetchData();
  }, [pageNum, context.setQueryData]);

  return (
    <>
      <h1>Selected Doc</h1>
      <Row md={2} xs={1} lg={3} className="g-3 mh-100">
        {context.queryData?.map((item: any) => (
          <Col key={item.doc._key}>
            <DataItem {...item.doc} key={item.doc._key} />
          </Col>
        ))}
      </Row>
      <Row style={{ height: 50 }}>
        <span>
          <h3> </h3>
        </span>
      </Row>
      {counter < 2 && (
        <Row>
          <span>
            <h1>Connected Docs</h1>
          </span>
        </Row>
      )}
      {counter < 2 && (
        <Row md={2} xs={1} lg={3} className="g-3">
          {context.queryData?.map((item: any) => (
            <Fragment key={item.doc._key}>
              {item.connectedDocs.map(
                (data: any) =>
                  data != null && (
                    <Col key={data._key}>
                      <DataItem {...data} />
                    </Col>
                  )
              )}
            </Fragment>
          ))}
        </Row>
      )}
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item"><a onClick={() => setPageNum(pageNum - 1)} className="page-link" href="javascript:void(0);">Previous</a></li>
        <li className="page-item"><a onClick={() => setPageNum(1)} className="page-link" href="javascript:void(0);">1</a></li>
        <li className="page-item"><a onClick={() => setPageNum(2)} className="page-link" href="javascript:void(0);">2</a></li>
        <li className="page-item"><a onClick={() => setPageNum(3)} className="page-link" href="javascript:void(0);">3</a></li>
        <li className="page-item"><a onClick={() => setPageNum(pageNum + 1)} className="page-link" href="javascript:void(0);">Next</a></li>
      </ul>
    </nav>
    </>
  );
}
