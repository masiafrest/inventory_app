import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";

import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

export default function SearchBar({ setResData, url }) {
  const [values, setValues] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues(event.target.value);
    console.log(values);
  };

  const submitHandler = async (
    e: React.FormEvent<HTMLButtonElement | HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      const result: AxiosResponse = await axios.get(`${url}/${values}`);
      console.log(result);
      setResData(result.data);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <form onSubmit={submitHandler}>
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
    </form>
  );
}
