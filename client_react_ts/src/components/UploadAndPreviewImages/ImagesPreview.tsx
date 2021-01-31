import React from "react";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";

export default function ImagesPreview({ item }) {
  // const multipleFile = (item.images && []).map((image) => (
  //   <CardMedia src={image} />
  // ));
  console.log("item", item);

  return item?.images ? (
    <Card>
      <CardMedia src={item.images} />
    </Card>
  ) : (
    <div>no hay imagen</div>
  );
}
