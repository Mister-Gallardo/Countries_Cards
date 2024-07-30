import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { ICountry } from "../services/interfaces";

const CardPage = () => {
  const { country } = useParams<{ country: string }>();
  const parsedCountry: ICountry =
    typeof country === "string"
      ? JSON.parse(decodeURIComponent(country))
      : null;

  return (
    <Card sx={{ width: "100%", height: "100vh" }}>
      <CardMedia
        component="img"
        sx={{ height: "45vh" }}
        image={parsedCountry.flags.svg}
        alt={parsedCountry.flags.alt}
      />
      <CardContent>
        <Typography gutterBottom fontSize={36} fontWeight={900} component="div">
          {parsedCountry.name.common}
        </Typography>
        <Typography marginTop="20px" color="text.secondary" fontSize="24px">
          Подробная информация:
        </Typography>
        <Box
          sx={{
            marginTop: "10px",
            display: "flex",
            gap: "5px",
            flexDirection: "column",
            height: { xs: "auto", md: "120px" },
            flexWrap: "wrap",
          }}
        >
          <Typography
            sx={{ display: "inline", fontSize: "22px", fontFamily: "italic" }}
          >{`● Название: ${parsedCountry.name.official}`}</Typography>
          <Typography
            sx={{ fontSize: "22px", fontFamily: "italic" }}
          >{`● Столица: ${parsedCountry.capital[0]}`}</Typography>
          <Typography sx={{ fontSize: "22px", fontFamily: "italic" }}>
            {`● Площадь: ${parsedCountry.area}`} км²
          </Typography>
          <Typography sx={{ fontSize: "22px", fontFamily: "italic" }}>
            {`● Население: ${parsedCountry.population}`} чел.
          </Typography>
          <Typography
            sx={{ fontSize: "22px", fontFamily: "italic" }}
          >{`● Домен: ${parsedCountry.flag}`}</Typography>
          <Typography
            sx={{ fontSize: "22px", fontFamily: "italic" }}
          >{`● Континент: ${parsedCountry.continents[0]}`}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardPage;
