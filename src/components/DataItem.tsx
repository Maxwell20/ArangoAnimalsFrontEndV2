import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { formatTime } from "../utilities/formatTime";
import { makeQueryByKey } from "../hooks/useQuery";
import { getQueryData } from "../context/QueryContext";
import React from "react"

type dataItemProps = {
  _key: string;
  _id: string;
  _rev?: string;
  attribute1?: number;
  country?: string;
  longitude: number;
  attribute2?: number;
  true_sighting_id?: string;
  timestamp: string;
  latitude: number;
  species?: string;
};

export function DataItem({
  _key,
  _id,
  _rev,
  attribute1,
  country,
  longitude,
  attribute2,
  true_sighting_id,
  timestamp,
  latitude,
  species,
}: dataItemProps) {
  //const { makeQueryByKey } = makeQuery();
  //const { queryData, setQueryData } = getQueryData();

  function selectItem(){
    //put API call in here
  }

  return (
    <Card className="h-100">
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-5">{species}</span>
          <span className="ms-4 text-muted">
            {formatTime(timestamp)[0]} {formatTime(timestamp)[1]}
          </span>
        </Card.Title>
        <div className="d-flex justify-content-between align-items-baseline mb-4-auto">
          <span>Collection:</span>
          <span>{_id.split("/")[0]}</span>
        </div>
        <div className="d-flex justify-content-between align-items-baseline mb-4-auto">
          <span>Rev:</span>
          <span>{_rev}</span>
        </div>
        <div className="d-flex justify-content-between align-items-baseline mb-4-auto">
          <span>Lat/Long:</span>
          <span>
            {latitude.toFixed(6)}/{longitude.toFixed(6)}
          </span>
        </div>
        <div className="d-flex justify-content-between align-items-baseline mb-4-auto">
          <span>Country:</span>
          <span>{country}</span>
        </div>
        <div className="d-flex justify-content-between align-items-baseline mb-4-auto">
          <span>Attribute 1:</span>
          <span>{attribute1}</span>
        </div>
        <div className="d-flex justify-content-between align-items-baseline mb-4-auto">
          <span>Attribute 2:</span>
          <span>{attribute2}</span>
        </div>
        <div className="d-flex justify-content-between align-items-baseline mb-4-auto">
          <span>True Sighting ID:</span>
          <span>{true_sighting_id}</span>
        </div>
        <div className="d-flex justify-content-between align-items-baseline mb-4-auto">
          <span>DB Key:</span>
          <span>{_key}</span>
        </div>
        <Button className="w-100" onClick={() => makeQueryByKey({key: _key, includeEdges: true})}>
          Select
        </Button>
      </Card.Body>
    </Card>
  );
}
