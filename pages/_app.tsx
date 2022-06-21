import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";
import { SnackbarProvider } from "notistack";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { lightTheme } from "../themes";
import { CartProvider, UiProvider, AuthProvider, WishlistProvider, ProfileProvider, PickupProvider } from "../context";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { MapProvider } from "react-map-gl";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <PayPalScriptProvider options={{ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "" }}>
        <SWRConfig
          value={{
            fetcher: (resource, init) => fetch(resource, init).then((res) => res.json()),
          }}>
          <AuthProvider>
            <SnackbarProvider
              maxSnack={3}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}>
              <MapProvider>
                <CartProvider>
                  <ProfileProvider>
                    <PickupProvider>
                      <WishlistProvider>
                        <UiProvider>
                          <ThemeProvider theme={lightTheme}>
                            <CssBaseline />
                            <Component {...pageProps} />
                          </ThemeProvider>
                        </UiProvider>
                      </WishlistProvider>
                    </PickupProvider>
                  </ProfileProvider>
                </CartProvider>
              </MapProvider>
            </SnackbarProvider>
          </AuthProvider>
        </SWRConfig>
      </PayPalScriptProvider>
    </SessionProvider>
  );
}

export default MyApp;
