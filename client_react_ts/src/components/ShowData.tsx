import React, { useState } from "react";

import DataCard from "./DataCard";
import DataAccordion from "./DataAccordion";

import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ViewHeadlineIcon from "@material-ui/icons/ViewHeadline";
import ViewAgendaIcon from "@material-ui/icons/ViewAgenda";

import { fakeReduxStore, itemData, image } from "../fakeDataToTest";

export default function ShowData() {
  const [toggleView, setToggleView] = useState("accordion");

  const onChangeHandler = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setToggleView(toggleView === "accordion" ? "card" : "accordion");
  };

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
      {toggleView === "accordion" ? (
        <DataAccordion data={itemData} />
      ) : (
        <DataCard data={itemData} />
      )}
    </>
  );
}
