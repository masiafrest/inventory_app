import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";

import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

import { BearerToken } from "../fakeDataToTest";

export default function SearchBar(props: any) {
  const [values, setValues] = useState("");
  //TODO: use react router dom useLocation to determine the path and chage axio request get to the path, if items, users,

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues(event.target.value);
  };
  const submitHandler = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("submit");
    try {
      const result: AxiosResponse = await axios.get(`items/${values}`, {
        headers: { Authorization: BearerToken },
      });
      props.setResData(result.data);
    } catch (error) {
      console.log("error: ", error);
    }
  };
  return (
    <FormControl>
      <InputLabel htmlFor="input-with-icon-adornment">Buscar</InputLabel>
      <Input
        id="input-with-icon-adornment"
        onChange={handleChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={submitHandler}
              disabled={values ? false : true}
            >
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
}
