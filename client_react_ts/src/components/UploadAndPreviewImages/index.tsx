import ImagesPreview from "./ImagesPreview";
import ImagesUpload from "./ImagesUpload";

export default function ImagesUploadAndPreview({ item, onChange }) {
  return (
    <>
      <ImagesPreview item={item} />
      <ImagesUpload onChange={onChange} />
    </>
  );
}

export const components = {
  ImagesPreview,
  ImagesUpload,
};
