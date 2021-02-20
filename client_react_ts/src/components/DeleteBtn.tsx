import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";

export default function DeleteBtn({ url, id }) {
  const handleDelete = async () => {
    const res = await axios.delete(url + "/" + id);
    console.log(res);
    window.location.reload();
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={handleDelete}
      startIcon={<DeleteIcon />}
    >
      Delete
    </Button>
  );
}
