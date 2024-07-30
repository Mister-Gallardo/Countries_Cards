import { useEffect, useState } from "react";
import axios from "axios";
import { Box, CircularProgress, Pagination, Typography } from "@mui/material";
import { ICountry } from "../services/interfaces";
import CardElem from "../components/CardElem";

function CardList() {
  const [counriesList, setCountriesList] = useState<ICountry[] | null>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  // по правилам хорошего тона
  // эту функцию надо вынести в отдельный файл "api"
  // но здесь я всё-таки решил оставить так :)
  async function fetchCountriesList() {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://restcountries.com/v3.1/all?fields=idd,name,capital,flag,flags,area,continents,population"
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
    <Box
      sx={{
        display: "flex",
        gap: "15px",
        flexDirection: "column",
        alignItems: "center",
        padding: "10px 0px 20px",
      }}
    >
      <Typography
        sx={{
          fontSize: "34px",
          fontWeight: "bold",
        }}
      >
        Список стран мира
      </Typography>
      <Box
        sx={{
          width: "60vw",
          margin: "0px auto",
          display: "flex",
          justifyContent: "center",
          gap: "30px 50px",
          flexWrap: "wrap",
        }}
      >
        {counriesList
          .slice((page - 1) * 20, page * 20)
          .map((country: ICountry, index: number) => (
            // могу в качестве ключа указать индекс,
            // так как уверен, что
            // порядок элементов массива не изменится
            <CardElem key={index} country={country} />
          ))}
      </Box>
      <Pagination
        page={page}
        count={Math.ceil(counriesList.length / 20)}
        size="large"
        siblingCount={0}
        color="primary"
        onChange={(_, value) => {
          setPage(value);
        }}
      />
    </Box>
  );
}

export default CardList;
