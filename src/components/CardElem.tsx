import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { ICountry } from "../services/interfaces";
import { useNavigate } from "react-router-dom";

const CardElem = ({ country }: { country: ICountry }) => {
  const navigate = useNavigate();
  
  function setPath() {
    const parseObj = encodeURIComponent(JSON.stringify(country)); 
    navigate(`/CardPage/${parseObj}`); 
  } 
  
  return (
    <Card sx={{ minWidth: "300px", width: "45%" }} onClick={setPath}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={country.flags.svg}
          alt={country.flags.alt}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            fontWeight={600}
            component="div"
          >
            {`${country.name.common} (${country.flag}) `}
          </Typography>
          <Typography color="text.secondary" fontSize="18px">
            {`Столица: ${country.capital[0]}`}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CardElem;
