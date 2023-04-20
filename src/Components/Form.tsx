import { optAccount, optCategory } from "../Object/Options";
import Select from "react-select";
import CurrencyInput from "react-currency-input-field";
import { useState } from "react";
import axios from "axios";
import { Backdrop } from "@mui/material";
import ReactLoading from "react-loading";

const Form = () => {
  const [data, setData] = useState({
    name: "",
    category: "",
    account: "",
    amount: null,
  });
  const [isLoading, setLoading] = useState(false);

  const handleChange = (key, value) => {
    setData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleClick = () => {
    setLoading(true);
    console.log(data);
    axios
      .post("https://api.danilaudza.com/sendFinance", data)
      //   .post("http://127.0.0.1:5000/sendFinance", data)
      .then(function (response) {
        setLoading(false);
        alert("Sudah Terkirim");
        console.log(response);
      })
      .catch(function (error) {
        setLoading(false);
        alert("Error");
        console.log(error);
      });
  };

  return (
    <div className="flex items-center justify-center h-screen font-poppins ">
      {isLoading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open
        >
          <ReactLoading type={"bubbles"} color={"#ffffff"} />
        </Backdrop>
      )}
      <div className="container mx-auto bg-white p-12 rounded-lg w-80 shadow-lg">
        <div className="font-semibold text-md mb-1">Name</div>
        <input
          type="text"
          className="border-2 rounded-md px-3 py-2 focus:outline-blue-600 mb-4 w-full transition-all"
          placeholder={"Indomie"}
          onChange={(e) => handleChange("name", e.target.value)}
          value={data.name}
        />
        <div className="font-semibold text-md mb-1">Category</div>
        <Select
          isSearchable={false}
          placeholder={"Expenses"}
          className="mb-4"
          onChange={(e) => handleChange("category", e.value)}
          options={optCategory}
        />
        <div className="font-semibold text-md mb-1">Account</div>
        <Select
          isSearchable={false}
          placeholder={"Needs"}
          className="mb-4"
          onChange={(e) => handleChange("account", e.value)}
          options={optAccount}
        />
        <div className="font-semibold text-md mb-1">Amount</div>
        <CurrencyInput
          placeholder="Rp 12,000"
          className="border-2 rounded-md px-3 py-2 focus:outline-blue-600 mb-4 w-full transition-all"
          prefix={"Rp "}
          onValueChange={(e) => handleChange("amount", e)}
        />
        <button
          type="button"
          onClick={handleClick}
          className="bg-blue-500 px-3 py-2 my-5 rounded-md text-white hover:bg-blue-700 transition-all duration-300 w-full"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Form;
