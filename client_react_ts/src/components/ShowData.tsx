import React, { useState } from "react";

import DataCard from "./DataCard";
import DataAccordion from "./DataAccordion";

import { fakeReduxStore, itemData, image } from "../fakeDataToTest";

export default function ShowData() {
  const [toggleView, setToggleView] = useState("accordion");

  const onChangeHandler = () => {
    console.log("heyyyyyyyyyyyyyyyyyyyyyyyyy", toggleView);
    setToggleView(toggleView === "accordion" ? "card" : "accordion");
  };

  return (
    <>
      <button onClick={onChangeHandler}> toggle</button>
      {toggleView === "accordion" ? (
        <DataAccordion data={itemData} />
      ) : (
        <DataCard data={itemData} />
      )}
    </>
  );
}
