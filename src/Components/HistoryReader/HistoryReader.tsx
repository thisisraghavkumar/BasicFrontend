import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { Button } from "@mui/material";
import React from "react";
import { dataverseConfig, loginRequest } from "../../authConfig";
import { GetEventfromJson, GetTopicFromJson } from "../../Helper/JsonConvertorHelper";
import { getData } from "../../Services/DataverseService";
import { HistoryReaderLayout } from "../HistoryReaderLayout/HistoryReaderlayout";

export const HistoryReader = () => {
    const {instance, accounts} = useMsal();
    const [bearerToken, setBearerToken] = React.useState('');
    var isAuthenticated = useIsAuthenticated();
    var [topics, setTopics] = React.useState([]);
    var [events, setEvents] = React.useState([]);
    
    var getTopics = React.useCallback(() => {
        var url = dataverseConfig.dataApiEndpoint + '/' + dataverseConfig.topicTable.Id;
        const propertyName = dataverseConfig.topicTable.Properties;
        url += `?$select=${propertyName.Id},${propertyName.Name}`;

        var putInState = (obj: any) => {
            setTopics(obj?.value.map((item) => GetTopicFromJson(item)));
        }
        getData(url, bearerToken, putInState);
    }, [bearerToken]);

    var getEvents = React.useCallback(() => {
        var url = dataverseConfig.dataApiEndpoint + '/' + dataverseConfig.eventsTable.Id;
        const propertyName = dataverseConfig.eventsTable.Properties;
        url += `?$select=${propertyName.Id},${propertyName.Name},${propertyName.IsDateExact},${propertyName.DateOfOccurrence},${propertyName.CityOfOccurrence},${propertyName.CountryOfOccurrence},${propertyName.TopicValue}`;
        url += `&$orderby=${propertyName.DateOfOccurrence}`
        
        var putInState = (obj: any) => {
            setEvents(obj?.value.map(item => GetEventfromJson(item)));
        }
        
        getData(url, bearerToken, putInState);
    }, [bearerToken]);

    var getToken = React.useCallback(() => {
        console.log(accounts);
        const request = {
            scopes: loginRequest.authZscopes,
            account: accounts[0]
        };

        instance.acquireTokenPopup(request).then((response) => {
            setBearerToken(response.accessToken);
        });
    }, [accounts]);

    var getAllTables = React.useCallback(() => {
        console.log(`Bearer ${bearerToken}`);
        getEvents();
        getTopics();
    }, [bearerToken]);

    return isAuthenticated ? <>
        <Button onClick={() => getToken()}>Get Token</Button>
        <Button onClick={() => getAllTables()} disabled={bearerToken.length == 0}>Get Data</Button>
        <HistoryReaderLayout events={events} topics={topics} />
    </>:
    <>
        Login First!
    </>

}