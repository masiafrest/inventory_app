import React, { useState } from "react";

import DataCard from "./items/ItemCard";
import DataAccordion from "./items/ItemAccordion";
import ShowAccordion from "./showFetchData/ShowAccordion";

import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ViewHeadlineIcon from "@material-ui/icons/ViewHeadline";
import ViewAgendaIcon from "@material-ui/icons/ViewAgenda";

import SearchBar from "./SearchBar";

export default function ShowData() {
  const [toggleView, setToggleView] = useState("accordion");
  const [resData, setResData] = useState({});

  const onChangeHandler = (event: React.MouseEvent<HTMLElement>) => {
    setToggleView(toggleView === "accordion" ? "card" : "accordion");
  };

  console.log(resData);
  const objHasProp = Object.keys(resData).length === 0 ? false : true;
  //TODO: create a viewContainer to show DataAcordion or card style, making DataAcordion and CardStyle a presentational component
  return (
    <>
      <ToggleButtonGroup
        size="small"
        value={toggleView}
        exclusive
        onChange={onChangeHandler}
      >
        <ToggleButton value="accordion">
          <ViewHeadlineIcon fontSize="small" />
        </ToggleButton>
        <ToggleButton value="card">
          <ViewAgendaIcon fontSize="small" />
        </ToggleButton>
      </ToggleButtonGroup>
      <SearchBar setResData={setResData} />
      {toggleView === "accordion" ? (
        objHasProp ? (
          <ShowAccordion data={resData} />
        ) : null
      ) : objHasProp ? (
        <DataCard data={resData} />
      ) : null}
    </>
  );
}
