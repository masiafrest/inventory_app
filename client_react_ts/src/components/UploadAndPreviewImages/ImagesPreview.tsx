import React from "react";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";

export default function ImagesPreview({ previewImg }) {
  // const multipleFile = (item.images && []).map((image) => (
  //   <CardMedia src={image} />
  // ));
  console.log("preview: ", previewImg);
  const imgs = previewImg ? (
    previewImg.map((img) => (
      <Card>
        <CardMedia component={() => <img alt="test" src={img} />} />
      </Card>
    ))
  ) : (
    <div>no hay imagen</div>
  );

  return imgs;
}
