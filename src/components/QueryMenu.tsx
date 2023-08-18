import { Button, Offcanvas, Stack } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useQuery } from "../context/NavContext";
import { FastAPIClient } from "../client";
import ReactDatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import { makeFullQuery as makeFull } from "../hooks/useQuery";
// import { getQueryData } from "../context/QueryContext";
import { useQueryContext } from "../context/QueryContext";
 
interface QueryMenuProps {
  isOpen: boolean;
  pageNumber: number; // Add the pageNumber prop
  onDataForQueryChange: (newDataForQuery: makeQueryProps) => void;
}


interface collectionNames {
  value: string;
  label: string;
}

const badData = {
  collections: "sightings",
  pageSize: 1,
  pageNumber: 1,
  edgeCollection: "edge-sightings",
};

type makeQueryProps = {
  collections: string;
  pageSize: number;
  pageNumber: number;
  startTime?: string;
  endTime?: string;
  longStart?: number;
  longEnd?: number;
  latStart?: number;
  latEnd?: number;
  country?: string;
  type?: string;
  attribute1Start?: number;
  attribute1End?: number;
  attribute2Start?: number;
  attribute2End?: number;
  includeEdges?: boolean;
  edgeCollection?: string;
  excludeEdges?: boolean;
  collectionFilter?: string;
};
export function QueryMenu({ isOpen, pageNumber, onDataForQueryChange }: QueryMenuProps) {
  const [dataForQuery, setDataForQuery] = useState<makeQueryProps>(badData);
  const { queryData, setQueryData, initialRender } = useQueryContext();
  const [goodData, setGoodData] = useState(2);
  const defaultCollection = [{ value: "all", label: "all" }];
  const { closeQuery } = useQuery();
  const [collection, setCollection] = useState(defaultCollection);
  const [speciesLocal, setSpeciesLocal] = useState("");
  const [country, setCountry] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState("00:00:00");
  const [endDate, setEndDate] = useState(new Date());
  const [endTime, setEndTime] = useState("23:59:59");
  const [excludeDateTime, setExclude] = useState(false);
  const [latStart, setLatStart] = useState("");
  const [latEnd, setLatEnd] = useState("");
  const [longStart, setLongStart] = useState("");
  const [longEnd, setLongEnd] = useState("");
  const [att1Start, setAtt1Start] = useState("");
  const [att1End, setAtt1End] = useState("");
  const [att2Start, setAtt2Start] = useState("");
  const [att2End, setAtt2End] = useState("");
  const context = useQueryContext();

  const [collections] = useState<collectionNames[]>([]);


  // const handleQuerySubmit = (queryParameters: makeQueryProps) => {
  //   context.setQueryParameters(queryParameters);
  //   // Other logic to trigger the query
  // }

  // get collection list from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        //const client = new FastAPIClient("https://10.0.0.6");
        const client = new FastAPIClient("https:localhost:8080/rest");
        const names = await client.getColectionNameData();
        //const collectionNames = names[0].join(",");
        //const edgeCollectionNames = names[1].join(",");
        collections.push({ value: "all", label: "all" });
        if (collections.length - 1 < names[0].length) {
          names[0].map((item: any) =>
            collections.push({ value: item, label: item })
          );
        }
      } catch (error) {
        console.error("Error fetching paged documents:", error);
      }
    };
    fetchData();
  }, []);  

  useEffect(() => {
    setDataForQuery(dataForQuery);
  }, [dataForQuery]);

  useEffect(() => {
    const fetchData = async () => {
      if (initialRender === 2) {
        setGoodData(2);
        console.log("making query")
        //console.log(await makeFull(dataForQuery))
        const data = await context.performFullQuery(dataForQuery); // Using makeFullQuery from context        console.log(queryData)
        setQueryData(data);
        alert('pause')
      }
    };
    fetchData();    
  }, [goodData]);

  useEffect(() => {
    setDataForQuery((prevData) => ({
      ...prevData,
      pageNumber: pageNumber, // Update the pageNumber property
    }));
  },[pageNumber]);
  

  // handling functions for modifying input variables
  function handleSelectStartTime(time: any) {
    setStartTime(time);
  }

  function handleSelectEndTime(time: any) {
    setEndTime(time);
  }

  function handleSelectCollection(data: any) {
    setCollection(data);
  }

  // all error handling done here - sanitization and validation

  function handleSubmit(event) {
    event.preventDefault();

    if (parseFloat(latStart) != 0) {
      if (!parseFloat(latStart)) {
        if (latStart != "") {
          alert("Latitude must be a number!");
          return;
        }
      }
    }
    if (parseFloat(latEnd) != 0) {
      if (!parseFloat(latEnd)) {
        if (latEnd != "") {
          alert("Latitude must be a number!");
          return;
        }
      }
    }
    if (
      (latStart === "" && latEnd != "") ||
      (latEnd === "" && latStart != "")
    ) {
      alert("To search using latitude, you must enter both the start and end!");
      return;
    }
    if (
      parseFloat(latStart) < -90 ||
      parseFloat(latStart) > 90 ||
      parseFloat(latEnd) < -90 ||
      parseFloat(latEnd) > 90
    ) {
      alert("Latitude must be between -90 and 90!");
      return;
    }
    if (parseFloat(longStart) != 0) {
      if (!parseFloat(longStart)) {
        if (longStart != "") {
          alert("Longitude must be a number!");
          return;
        }
      }
    }
    if (parseFloat(longEnd) != 0) {
      if (!parseFloat(longEnd)) {
        if (longEnd != "") {
          alert("Longitude must be a number!");
          return;
        }
      }
    }
    if (
      (longStart === "" && longEnd != "") ||
      (longEnd === "" && longStart != "")
    ) {
      alert(
        "To search using longitude, you must enter both the start and end!"
      );
      return;
    }
    if (
      parseFloat(longStart) < -180 ||
      parseFloat(longStart) > 180 ||
      parseFloat(longEnd) < -180 ||
      parseFloat(longEnd) > 180
    ) {
      alert("Longitude must be between -180 and 180!");
      return;
    }
    if (
      (att1Start === "" && att1End != "") ||
      (att1End === "" && att1Start != "") ||
      (att2Start === "" && att2End != "") ||
      (att2End === "" && att2Start != "")
    ) {
      alert(
        "To search using an attribute, you must enter both the start and end!"
      );
      return;
    }
    if (parseFloat(att1Start) != 0) {
      if (!parseFloat(att1Start)) {
        if (att1Start != "") {
          alert("An attribute must be a number!");
          return;
        }
      }
    }
    if (parseFloat(att1End) != 0) {
      if (!parseFloat(att1End)) {
        if (att1End != "") {
          alert("An attribute must be a number!");
          return;
        }
      }
    }
    if (parseFloat(att2Start) != 0) {
      if (!parseFloat(att2Start)) {
        if (att2Start != "") {
          alert("An attribute must be a number!");
          return;
        }
      }
    }
    if (parseFloat(att2End) != 0) {
      if (!parseFloat(att2End)) {
        if (att2End != "") {
          alert("An attribute must be a number!");
          return;
        }
      }
    }

    if (
      parseFloat(att1Start) < 0 ||
      parseFloat(att1Start) > 1 ||
      parseFloat(att1End) < 0 ||
      parseFloat(att1End) > 1 ||
      parseFloat(att2Start) < 0 ||
      parseFloat(att2Start) > 1 ||
      parseFloat(att2End) < 0 ||
      parseFloat(att2End) > 1
    ) {
      alert("An attribute must be a positive number between 0 and 1!");
      return;
    }

    if (
      parseFloat(att1End) < parseFloat(att1Start) ||
      parseFloat(att2End) < parseFloat(att2Start)
    ) {
      alert("Attribute end must be greater than attribute start!");
      return;
    }
    if (parseFloat(latEnd) < parseFloat(latStart)) {
      alert("Latitude end must be greater than latitude start!");
      return;
    }
    if (parseFloat(longEnd) < parseFloat(longStart)) {
      alert("Longitude end must be greater than longitude start!");
      return;
    }
    if (endDate < startDate) {
      alert("Start date must be before end date!");
      return;
    }
    if (endDate.getDate() === startDate.getDate() && endTime < startTime) {
      alert("Start time must be before end time!");
      return;
    }
    setGoodData(1);
    // get just the names from the collection object
    const collectionNameArray: string[] = [];
    for (var obj in collection) {
      collectionNameArray.push(collection[obj].value);
    }
    // convert collection names to comma separated string
    // if 'all' is selected, ignore others
    var collectionNameList = "";
    const hasAll = collectionNameArray.some((element) => {
      if (element === "all") {
        return true;
      }
    });
    if (hasAll) {
      collectionNameList = "all";
    } else {
      collectionNameList = collectionNameArray.join(",");
    }
        
    const convertNaNToEmptyString = (value) => (isNaN(value) ? null : value);
    

    const formattedStartTime = startDate.toISOString() + "T" + startTime;
    const formattedEndTime = endDate.toISOString() + "T" + endTime;
    if (!excludeDateTime) {
      const newData = {
        collections: collectionNameList,
        pageSize: 12,
        pageNumber: pageNumber,
        type: speciesLocal,
        startTime: formattedStartTime,
        endTime: formattedEndTime,
        longStart: convertNaNToEmptyString(parseFloat(longStart)),
        longEnd: convertNaNToEmptyString(parseFloat(longEnd)),
        latStart: convertNaNToEmptyString(parseFloat(latStart)),
        latEnd: convertNaNToEmptyString(parseFloat(latEnd)),
        country: country,
        attribute1Start: convertNaNToEmptyString(parseFloat(att1Start)),
        attribute1End: convertNaNToEmptyString(parseFloat(att1End)),
        attribute2Start: convertNaNToEmptyString(parseFloat(att2Start)),
        attribute2End: convertNaNToEmptyString(parseFloat(att2End)),
        edgeCollection: "edge-sightings",
      };
      context.setDataForQuery(newData)
      context.setInitialRender(1);

      console.log(newData);

      setDataForQuery(newData)
      // onDataForQueryChange(newData);
      console.log(newData)
    } else {
      const newData = {
        collections: collectionNameList,
        pageSize: 12,
        pageNumber: pageNumber,
        type: speciesLocal,
        longStart: convertNaNToEmptyString(parseFloat(longStart)),
        longEnd: convertNaNToEmptyString(parseFloat(longEnd)),
        latStart: convertNaNToEmptyString(parseFloat(latStart)),
        latEnd: convertNaNToEmptyString(parseFloat(latEnd)),
        country: country,
        attribute1Start: convertNaNToEmptyString(parseFloat(att1Start)),
        attribute1End: convertNaNToEmptyString(parseFloat(att1End)),
        attribute2Start: convertNaNToEmptyString(parseFloat(att2Start)),
        attribute2End: convertNaNToEmptyString(parseFloat(att2End)),
        edgeCollection: "edge-sightings",
      } 
      context.setDataForQuery(newData)
      context.setInitialRender(1);
      console.log(newData);
      
      setDataForQuery(newData);
      // onDataForQueryChange(newData);
      console.log(newData)
    } 


    alert(
      "The chosen collection was : " +
        collectionNameList +
        `\n` +
        "The chosen species was : " +
        speciesLocal +
        `\n` +
        "The chosen startDate was : " +
        startDate.toLocaleDateString() +
        `\n` +
        "The chosen startTime was : " +
        startTime +
        `\n` +
        "The chosen endDate was : " +
        endDate.toLocaleDateString() +
        `\n` +
        "The chosen endTime was : " +
        endTime +
        `\n` +
        "The chosen exclude value was : " +
        excludeDateTime +
        `\n` +
        "The chosen country was : " +
        country +
        `\n` +
        "The chosen lat start was : " +
        latStart +
        `\n` +
        "The chosen lat end was : " +
        latEnd +
        `\n` +
        "The chosen long start was : " +
        longStart +
        `\n` +
        "The chosen long end was : " +
        longEnd +
        `\n` +
        "The chosen attribute 1 start was : " +
        att1Start +
        `\n` +
        "The chosen attribute 1 end was : " +
        att1End +
        `\n` +
        "The chosen attribute 2 start was : " +
        att2Start +
        `\n` +
        "The chosen attribute 2 end was : " +
        att2End
    );

    closeQuery;
  }

  return (
    <Offcanvas show={isOpen} onHide={closeQuery} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          <div>Query</div>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div style={{ fontSize: "1rem" }}>Only enter fields to search on</div>
        <div style={{ fontSize: "1rem" }}>
          Required fields are marked with *
        </div>
        <div style={{ fontSize: "1rem" }}>
          If "all" is selected, any other collection will be ignored on submit
        </div>
        <form onSubmit={handleSubmit}>
          <Stack gap={3}>
            <Stack
              direction="horizontal"
              gap={2}
              className="d-flex align-items-center"
            >
              {/* // dropdown menu for ollection select */}
              <div className="me-auto">
                <span className="text-muted" style={{ fontSize: "1.25rem" }}>
                  Collection*:
                </span>
              </div>
              <div className="text-muted">
                <span>
                  <Select
                    placeholder="Select Collections"
                    defaultValue={collections[0]}
                    value={collection}
                    isMulti
                    name="Collections"
                    options={collections}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={handleSelectCollection}
                  />
                </span>
              </div>
            </Stack>
            {/* // input field for species */}
            <Stack
              direction="horizontal"
              gap={2}
              className="d-flex align-items-center"
            >
              <div className="me-auto">
                <span className="text-muted" style={{ fontSize: "1.25rem" }}>
                  Species:
                </span>
              </div>
              <div className="text-muted">
                <span>
                  <input
                    type="text"
                    value={speciesLocal}
                    onChange={(e) => setSpeciesLocal(e.target.value)}
                  />
                </span>
              </div>
            </Stack>
            {/* // date picker for start date */}
            <Stack
              direction="horizontal"
              gap={2}
              className="d-flex align-items-center"
            >
              <div className="me-auto">
                <span className="text-muted" style={{ fontSize: "1.25rem" }}>
                  Start Date:
                </span>
              </div>
              <div className="text-muted">
                <span>
                  <ReactDatePicker
                    selected={startDate}
                    onChange={(date: any) => setStartDate(date)}
                  />
                </span>
              </div>
            </Stack>
            {/* // time picker for start time */}
            <Stack
              direction="horizontal"
              gap={2}
              className="d-flex align-items-center"
            >
              <div className="me-auto ms-4">
                <span className="text-muted" style={{ fontSize: "1.25rem" }}>
                  Start Time:
                </span>
              </div>
              <div className="text-muted">
                <span>
                  <TimePicker
                    maxDetail="second"
                    onChange={handleSelectStartTime}
                    value={startTime}
                  />
                </span>
              </div>
            </Stack>
            {/* // date picker for end date */}
            <Stack
              direction="horizontal"
              gap={2}
              className="d-flex align-items-center"
            >
              <div className="me-auto">
                <span className="text-muted" style={{ fontSize: "1.25rem" }}>
                  End Date:
                </span>
              </div>
              <div className="text-muted">
                <span>
                  <ReactDatePicker
                    selected={endDate}
                    onChange={(date: any) => setEndDate(date)}
                  />
                </span>
              </div>
            </Stack>
            {/* // time picker for end time */}
            <Stack
              direction="horizontal"
              gap={2}
              className="d-flex align-items-center"
            >
              <div className="me-auto ms-4">
                <span className="text-muted" style={{ fontSize: "1.25rem" }}>
                  End Time:
                </span>
              </div>
              <div className="text-muted">
                <span>
                  <TimePicker
                    maxDetail="second"
                    onChange={handleSelectEndTime}
                    value={endTime}
                  />
                </span>
              </div>
            </Stack>
            {/* // checkbox to exclude date/time */}
            <Stack
              direction="horizontal"
              gap={2}
              className="d-flex align-items-center"
            >
              <div className="me-auto">
                <span className="text-muted" style={{ fontSize: "1.25rem" }}>
                  Exclude date and time?:
                </span>
              </div>
              <div className="text-muted">
                <span>
                  <input
                    type="checkbox"
                    checked={excludeDateTime}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setExclude(e.target.checked)
                    }
                  />
                </span>
              </div>
            </Stack>
            {/* // input field for country */}
            <Stack
              direction="horizontal"
              gap={2}
              className="d-flex align-items-center"
            >
              <div className="me-auto">
                <span className="text-muted" style={{ fontSize: "1.25rem" }}>
                  Country:
                </span>
              </div>
              <div className="text-muted">
                <span>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </span>
              </div>
            </Stack>
            {/* // input field for latitude start */}
            <Stack
              direction="horizontal"
              gap={2}
              className="d-flex align-items-center"
            >
              <div className="me-auto">
                <span className="text-muted" style={{ fontSize: "1.25rem" }}>
                  Latitude start:
                </span>
              </div>
              <div className="text-muted">
                <span>
                  <input
                    type="text"
                    value={latStart}
                    onChange={(e) => setLatStart(e.target.value)}
                  />
                </span>
              </div>
            </Stack>
            {/* // input field for latitude end */}
            <Stack
              direction="horizontal"
              gap={2}
              className="d-flex align-items-center"
            >
              <div className="me-auto">
                <span className="text-muted" style={{ fontSize: "1.25rem" }}>
                  Latitude end:
                </span>
              </div>
              <div className="text-muted">
                <span>
                  <input
                    type="text"
                    value={latEnd}
                    onChange={(e) => setLatEnd(e.target.value)}
                  />
                </span>
              </div>
            </Stack>
            {/* // input field for longitude start */}
            <Stack
              direction="horizontal"
              gap={2}
              className="d-flex align-items-center"
            >
              <div className="me-auto">
                <span className="text-muted" style={{ fontSize: "1.25rem" }}>
                  Longitude start:
                </span>
              </div>
              <div className="text-muted">
                <span>
                  <input
                    type="text"
                    value={longStart}
                    onChange={(e) => setLongStart(e.target.value)}
                  />
                </span>
              </div>
            </Stack>
            {/* // input field for longitude end */}
            <Stack
              direction="horizontal"
              gap={2}
              className="d-flex align-items-center"
            >
              <div className="me-auto">
                <span className="text-muted" style={{ fontSize: "1.25rem" }}>
                  Longitude end:
                </span>
              </div>
              <div className="text-muted">
                <span>
                  <input
                    type="text"
                    value={longEnd}
                    onChange={(e) => setLongEnd(e.target.value)}
                  />
                </span>
              </div>
            </Stack>
            {/* // input field for attribute 1 start */}
            <Stack
              direction="horizontal"
              gap={2}
              className="d-flex align-items-center"
            >
              <div className="me-auto">
                <span className="text-muted" style={{ fontSize: "1.25rem" }}>
                  Attribute 1 start:
                </span>
              </div>
              <div className="text-muted">
                <span>
                  <input
                    type="text"
                    value={att1Start}
                    onChange={(e) => setAtt1Start(e.target.value)}
                  />
                </span>
              </div>
            </Stack>
            {/* // input field for attribute 1 end */}
            <Stack
              direction="horizontal"
              gap={2}
              className="d-flex align-items-center"
            >
              <div className="me-auto">
                <span className="text-muted" style={{ fontSize: "1.25rem" }}>
                  Attribute 1 end:
                </span>
              </div>
              <div className="text-muted">
                <span>
                  <input
                    type="text"
                    value={att1End}
                    onChange={(e) => setAtt1End(e.target.value)}
                  />
                </span>
              </div>
            </Stack>
            {/* // input field for attribute 2 start */}
            <Stack
              direction="horizontal"
              gap={2}
              className="d-flex align-items-center"
            >
              <div className="me-auto">
                <span className="text-muted" style={{ fontSize: "1.25rem" }}>
                  Attribute 2 start:
                </span>
              </div>
              <div className="text-muted">
                <span>
                  <input
                    type="text"
                    value={att2Start}
                    onChange={(e) => setAtt2Start(e.target.value)}
                  />
                </span>
              </div>
            </Stack>
            {/* // input field for attribute 2 end */}
            <Stack
              direction="horizontal"
              gap={2}
              className="d-flex align-items-center"
            >
              <div className="me-auto">
                <span className="text-muted" style={{ fontSize: "1.25rem" }}>
                  Attribute 2 end:
                </span>
              </div>
              <div className="text-muted">
                <span>
                  <input
                    type="text"
                    value={att2End}
                    onChange={(e) => setAtt2End(e.target.value)}
                  />
                </span>
              </div>
            </Stack>
            {/* // submit button fot the form */}
            <div>
              <Button type="submit" className="w-100">
                Submit
              </Button>
            </div>
          </Stack>
        </form>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
