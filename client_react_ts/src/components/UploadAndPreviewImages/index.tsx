import ImagesPreview from "./ImagesPreview";
import ImagesUpload from "./ImagesUpload";

export default function ImagesUploadAndPreview({ onChange, previewImg }) {
  return (
    <>
      <ImagesPreview previewImg={previewImg} />
      <ImagesUpload onChange={onChange} />
    </>
  );
}

export const components = {
  ImagesPreview,
  ImagesUpload,
};
