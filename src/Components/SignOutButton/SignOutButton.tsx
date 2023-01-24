import React, { useCallback } from "react";
import { useMsal } from "@azure/msal-react";
import Button from "@mui/material/Button";

export const SignOutButton = () => {
    const {instance} = useMsal();

    const handleSignOut = useCallback(()=>{
        instance.logoutPopup().catch((e) => {
            console.error("Error while signing out!");
            console.error(e);
        })
    },[instance]);

    return (
        <Button variant="contained" onClick={() => {handleSignOut()}} color="error">Sign Out</Button>
    );
}