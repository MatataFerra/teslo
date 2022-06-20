import { FC, useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { ClearOutlined, RoomRounded, SearchOutlined, ShoppingCartOutlined } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Input,
  InputAdornment,
  Link,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import { UiContext, CartContext } from "../../context/";

export const Navbar: FC = () => {
  const router = useRouter();
  const [option, setOption] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const { toogleSideMenu } = useContext(UiContext);
  const { numberOfItems } = useContext(CartContext);

  useEffect(() => {
    const { pathname } = router;
    const option = pathname.split("/")[2];

    setOption(option);
  }, [router, router.pathname]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;
    router.push(`/search/${searchTerm}`);
  };

  return (
    <AppBar>
      <Toolbar>
        <NextLink href='/' passHref>
          <Link display='flex' alignItems='center'>
            <Typography variant='h6'> Teslo </Typography>
            <Typography variant='h6' sx={{ ml: 0.5 }}>
              Shop
            </Typography>
          </Link>
        </NextLink>
        <Box flex={1} />
        <Box
          className='fadeIn'
          sx={{
            display: isSearchVisible ? "none" : { xs: "none", sm: "block" },
          }}>
          <NextLink href='/category/men' passHref>
            <Link>
              <Button color={option === "men" ? "primary" : "info"}>Hombres</Button>
            </Link>
          </NextLink>
          <NextLink href='/category/women' passHref>
            <Link>
              <Button color={option === "women" ? "primary" : "info"}>Mujeres</Button>
            </Link>
          </NextLink>
          <NextLink href='/category/kid' passHref>
            <Link>
              <Button color={option === "kid" ? "primary" : "info"}>Niños</Button>
            </Link>
          </NextLink>
        </Box>

        <Box flex={1} />

        {/* Pantallas grandes */}

        {isSearchVisible ? (
          <Input
            sx={{
              display: { xs: "none", sm: "flex" },
            }}
            className='fadeIn'
            autoFocus
            value={searchTerm}
            name='search'
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearchTerm()}
            type='text'
            placeholder='Buscar...'
            endAdornment={
              <InputAdornment position='end'>
                <IconButton aria-label='toggle password visibility' onClick={() => setIsSearchVisible(false)}>
                  <ClearOutlined />
                </IconButton>
              </InputAdornment>
            }
          />
        ) : (
          <IconButton
            onClick={() => setIsSearchVisible(true)}
            className='fadeIn'
            sx={{ display: { xs: "none", sm: "flex" } }}>
            <SearchOutlined />
          </IconButton>
        )}

        {/* Pantallas pequeñas */}

        <NextLink href='/pickup' passHref>
          <Link>
            <IconButton>
              <Tooltip title='Sucursales cercanas' arrow>
                <RoomRounded />
              </Tooltip>
            </IconButton>
          </Link>
        </NextLink>

        <IconButton sx={{ display: { xs: "flex", sm: "none" } }} onClick={toogleSideMenu}>
          <SearchOutlined />
        </IconButton>

        <NextLink href='/cart' passHref>
          <Link>
            <IconButton>
              <Badge badgeContent={numberOfItems > 15 ? "+15" : numberOfItems} color='secondary'>
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
          </Link>
        </NextLink>

        <Button onClick={toogleSideMenu}>Menú</Button>
      </Toolbar>
    </AppBar>
  );
};
