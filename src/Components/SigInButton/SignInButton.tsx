import React, { useCallback } from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../authConfig";
import Button  from "@mui/material/Button";

export const SignInButton = () => {
    const {instance} = useMsal();

    const handleLogin = useCallback((loginType: string) => {
        if (loginType == 'popup') {
            instance.loginPopup({scopes: loginRequest.authNscopes}).catch(e => {
                console.error("Error while logging in using pop up.");
                console.error(e);
            });
        }
    }, [instance]);

    return (
        <Button onClick={() => {handleLogin("popup");}} variant="contained" color="success">Sign In</Button>
    );
}