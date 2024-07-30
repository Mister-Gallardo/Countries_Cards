import { ErrorInfo, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { Box, CircularProgress, Typography } from "@mui/material";
import { ICountry } from "./services/interfaces";
import CardElem from "./components/CardElem";
import "./App.css";

function App() {
  const [counriesList, setCountriesList] = useState<ICountry[] | null>([]);
  const [loading, setLoading] = useState(false);

  async function fetchCountriesList() {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://restcountries.com/v3.1/all?fields=idd,name,capital,flag,flags"
      );
      setCountriesList(data);
    } catch (e: any) {
      setCountriesList(null);
      console.log(`Ошибка: ${e.message}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCountriesList();
  }, []);

  if (loading)
    return (
      <CircularProgress
        size={80}
        sx={{ display: "flex", margin: "30vh auto" }}
      />
    );

  if (!counriesList)
    return (
      <Typography
        sx={{
          fontSize: "32px",
          fontWeight: "bold",
          textAlign: "center",
          marginTop: "30vh",
        }}
      >
        Произошла ошибка!
      </Typography>
    );

  return (
    <>
      <Typography
        sx={{
          fontSize: "34px",
          fontWeight: "bold",
          textAlign: "center",
          marginTop: "10px",
        }}
      >
        Список стран мира
      </Typography>
      <Box
        sx={{
          width: "60vw",
          margin: "20px auto",
          display: "flex",
          justifyContent: "center",
          gap: "30px 50px",
          flexWrap: "wrap",
        }}
      >
        {counriesList.map((country: ICountry, index: number) => (
          // можем в качестве ключа указать индекс,
          // так как уверены, что
          // порядок элементов массива не изменится
          <CardElem key={index} country={country} />
        ))}
      </Box>
    </>
  );
}

export default App;
