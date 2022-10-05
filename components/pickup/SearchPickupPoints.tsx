import { SearchOutlined } from "@mui/icons-material";
import { Input, InputAdornment, IconButton } from "@mui/material";
import { ChangeEvent, FC, KeyboardEvent, useState } from "react";
import { pickupApi } from "../../apiRoutes";
import { IApiPickupPoints, IPickupPoint } from "../../interfaces";
import { ListPickupSearch } from "./ListPickupSearch";

export const SearchPickupPoints: FC = () => {
  const [showResults, setShowResults] = useState(false);
  const [inputSearch, setinputSearch] = useState("");
  const [pickupPoints, setPickupPoints] = useState<IPickupPoint[]>([]);

  const onSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    setinputSearch(e.target.value);
  };

  const onSearchSubmit = async () => {
    setPickupPoints([]);
    setinputSearch("");
    if ("e.target.value".length > 2) {
      const search = (await pickupApi({ params: { street: inputSearch } })) as {
        data: IApiPickupPoints[];
      };
      search.data.map((point) => {
        const { lat, lon, display_name } = point;
        const pickupPoint: IPickupPoint = {
          latitude: lat,
          longitude: lon,
          name: display_name,
        };

        setPickupPoints((prev) => [...prev, pickupPoint]);
      });
      setShowResults(true);
    }
  };

  const onGetResults = () => {
    onSearchSubmit();
  };

  const onPressEnter = (e: KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearchSubmit();
    }
  };

  return (
    <>
      <Input
        placeholder='Busqueda por direccion'
        type='text'
        sx={{ width: "100%", mb: 1 }}
        onKeyDown={(e) => onPressEnter(e)}
        endAdornment={
          <InputAdornment position='end'>
            <IconButton aria-label='search icon submit' onClick={onGetResults}>
              <SearchOutlined />
            </IconButton>
          </InputAdornment>
        }
        onChange={onSearch}
      />
      {showResults && <ListPickupSearch pickupPoints={pickupPoints} />}
    </>
  );
};
