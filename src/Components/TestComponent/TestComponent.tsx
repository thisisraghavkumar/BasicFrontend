import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import React from "react";
import { loginRequest } from "../../authConfig";
import { useState } from "react";
import { Box, Button } from "@mui/material";
import { HistoricalEventsList } from "../HistoricalEventsList/HistoricalEventsList";
import { HistoricalTopicsList } from "../HistoricalTopicsList/HistoricalTopicsList";
import { HistoryReaderLayout } from "../HistoryReaderLayout/HistoryReaderlayout";
import { HistoryReader } from "../HistoryReader/HistoryReader";

export const TestComponent = () => {
    const { instance, accounts, inProgress } = useMsal();
    const [accessToken, setAccessToken] = useState('');
    var isAuthenticated = useIsAuthenticated();
    const name = accounts[0] && accounts[0].name;

    function RequestAccessToken() {
        console.log(accounts);
        const request = {
            scopes: loginRequest.authZscopes,
            account: accounts[0]
        };

        instance.acquireTokenPopup(request).then((response) => {
            setAccessToken(response.accessToken);
        });
    }

    return (
        isAuthenticated ?
            <HistoryReader />:
        <>
            Login first!
        </>
    );
};