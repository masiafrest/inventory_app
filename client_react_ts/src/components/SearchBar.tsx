import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useLocation } from "react-router-dom";

import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

import { BearerToken } from "../fakeDataToTest";

export default function SearchBar({ setResData }) {
  const [values, setValues] = useState("");
  const { pathname } = useLocation();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues(event.target.value);
  };

  const submitHandler = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const result: AxiosResponse = await axios.get(`${pathname}/${values}`);
      console.log(result);
      setResData([result.data]);
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
