import { FC, useState } from "react";
import NextLink from "next/link";
import { Grid, Card, CardContent, Typography, SxProps } from "@mui/material";

interface Props {
  title: string | number;
  subtitle: string;
  Icon: JSX.Element;
  route?: string;
}

export const SummaryTile: FC<Props> = ({ title, subtitle, Icon, route }) => {
  const [mouseEnter, setMouseEnter] = useState(false);

  return (
    <>
      {route ? (
        <Grid item xs={12} sm={4} md={3}>
          <NextLink href={route} passHref>
            <Card
              sx={{
                display: "flex",
                cursor: "pointer",
                transition: "0.3s ease all",
                backgroundColor: mouseEnter ? "#efefef" : "#FFF",
              }}
              onMouseEnter={() => setMouseEnter(true)}
              onMouseLeave={() => setMouseEnter(false)}>
              <CardContent sx={{ width: 50, display: "flex", justifyContent: "center", alignItems: "center" }}>
                {Icon}
              </CardContent>
              <CardContent sx={{ flex: "1 0 auto", display: "flex", flexDirection: "column" }}>
                <Typography variant='h5'> {title} </Typography>
                <Typography variant='caption'> {subtitle} </Typography>
              </CardContent>
            </Card>
          </NextLink>
        </Grid>
      ) : (
        <Grid item xs={12} sm={4} md={3}>
          <Card sx={{ display: "flex" }}>
            <CardContent sx={{ width: 50, display: "flex", justifyContent: "center", alignItems: "center" }}>
              {Icon}
            </CardContent>
            <CardContent sx={{ flex: "1 0 auto", display: "flex", flexDirection: "column" }}>
              <Typography variant='h5'> {title} </Typography>
              <Typography variant='caption'> {subtitle} </Typography>
            </CardContent>
          </Card>
        </Grid>
      )}
    </>
  );
};
