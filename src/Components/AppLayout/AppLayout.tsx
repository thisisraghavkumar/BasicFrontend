import React from "react";
import { IAppLayoutProps } from "./AppLayout.types";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { SignOutButton } from "../SignOutButton/SignOutButton";
import "./AppLayout.css";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { SignInButton } from "../SigInButton/SignInButton";

export const AppLayout = (props: React.PropsWithChildren<IAppLayoutProps>) => {
    var isAuthenticated = useIsAuthenticated();
    return (<Box sx={{ flexGrow: 1}}>
        <AppBar position="static" className="appBarArea">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>
                    {
                        props.appName
                    }
                </Typography>
                {isAuthenticated?<SignOutButton />:<SignInButton />}
            </Toolbar>
        </AppBar>
        {
            <Box>
                {props.children}
            </Box>
        }
    </Box>);
}