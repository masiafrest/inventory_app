import React from "react";
import Button from "@material-ui/core/Button";

export default function ImagesUpload({ onChange }) {
  return (
    <>
      <input
        name="images"
        accept="image/*"
        id="contained-button-file"
        multiple
        type="file"
        onChange={onChange}
      />
    </>
  );
}
