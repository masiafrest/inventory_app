export default function ImagesUpload({ onChange }) {
  //TODO: boton agregar segundo imagen
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
