import { Row, Col } from "react-bootstrap";
import { DataItem } from "../components/DataItem";
import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { getQueryData } from "../context/QueryContext";
import { makeInitialQuery } from "../hooks/useQuery";

export function Home() {
  const { queryData, setQueryData, initialRender, setInitialRender } = getQueryData();
  const [counter, setCounter] = useState<number>(0);
  useEffect(() => {
    const fetchData = async () => {
      if (initialRender === 1) {
        setInitialRender(2);
        console.log('initial ' + initialRender)
        const data = await makeInitialQuery()
        setQueryData(data);       
      }
    };
    fetchData();
  }, []);

//   useEffect(() => {
//     setQueryData(queryData)
//   }, [queryData])

  if (queryData === undefined) {
    return (
      <>
        <h1>Bad Data</h1>
      </>
    );
  }  

  useEffect(() => {
    setCounter(queryData.length);
  }, [queryData]); 

  return (
    <>
      <h1>Selected Doc</h1>
      <Row md={2} xs={1} lg={3} className="g-3 mh-100">
        {queryData.map((item: any) => (
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
          {queryData.map((item: any) => (
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
    </>
  );
}
