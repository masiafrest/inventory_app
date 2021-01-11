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
  const [data, setData] = useState();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues(event.target.value);
  };
  const submitHandler = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("submit");
    try {
      console.log("value: ", values);
      const result: AxiosResponse = await axios.get(`items/${values}`, {
        headers: { Authorization: BearerToken },
      });
      console.log("result:, ", result);
      setData(result.data);
      props.setResData(result.data);
    } catch (error) {
      console.log("error: ", error);
    }
  };
  console.log(values);
  return (
    <FormControl>
      <InputLabel htmlFor="input-with-icon-adornment">Buscar</InputLabel>
      <Input
        id="input-with-icon-adornment"
        onChange={handleChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={submitHandler}>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
}
