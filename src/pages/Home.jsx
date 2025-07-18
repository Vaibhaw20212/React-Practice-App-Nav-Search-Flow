import React from "react";
import { Container, Typography } from "@mui/material";
import PokemonSearch from "../components/Searchbar";
import { useSelector, useDispatch } from "react-redux";
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Box } from "@mui/material";
import { setShowPlayground, setShowBitcoin } from "../features/navSlice";

export default function Home() {
  const dispatch = useDispatch();
  const showPlayground = useSelector((state) => state.nav.showPlayground);
  const showBitcoin = useSelector((state) => state.nav.showBitcoin);

  const handleRadioChange = (event) => {
    const { name, value } = event.target;
    if (name === "playground") {
      dispatch(setShowPlayground(value === "true"));
    } else if (name === "bitcoin") {
      dispatch(setShowBitcoin(value === "true"));
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Pokémon Search
      </Typography>
      <Box mb={3}>
        <FormControl component="fieldset" sx={{ mr: 4 }}>
          <FormLabel component="legend">Show Playground Button</FormLabel>
          <RadioGroup row name="playground" value={showPlayground.toString()} onChange={handleRadioChange}>
            <FormControlLabel value="true" control={<Radio />} label="Show" />
            <FormControlLabel value="false" control={<Radio />} label="Hide" />
          </RadioGroup>
        </FormControl>
        <FormControl component="fieldset">
          <FormLabel component="legend">Show Bitcoin Chart Button</FormLabel>
          <RadioGroup row name="bitcoin" value={showBitcoin.toString()} onChange={handleRadioChange}>
            <FormControlLabel value="true" control={<Radio />} label="Show" />
            <FormControlLabel value="false" control={<Radio />} label="Hide" />
          </RadioGroup>
        </FormControl>
      </Box>
      <PokemonSearch />
    </Container>
  );
}
