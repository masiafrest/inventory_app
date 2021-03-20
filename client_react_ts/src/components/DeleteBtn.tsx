import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";

export default function DeleteBtn({ url, id, data, setData}) {
  const handleDelete = async () => {
    const res = await axios.delete(url + "/" + id);
    if(res.data === 1){
      const newList = data.filter(item => item.id !== id)
      setData(newList)
    }

    // window.location.reload();
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
