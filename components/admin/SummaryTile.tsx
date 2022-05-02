import { FC } from "react";
import { Grid, Card, CardContent, Typography, SxProps } from "@mui/material";

interface Props {
  title: string | number;
  subtitle: string;
  Icon: JSX.Element;
}

export const SummaryTile: FC<Props> = ({ title, subtitle, Icon }) => {
  return (
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
  );
};
