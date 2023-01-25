import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { Button, getPaginationItemUtilityClass } from "@mui/material";
import React, { useState } from "react";
import { dataverseConfig, loginRequest } from "../../authConfig";
import { GetEventfromJson, GetTopicFromJson } from "../../Helper/JsonConvertorHelper";
import { getData } from "../../Services/DataverseService";
import { EventsInputForm } from "../EventsInputForm/EventsInputForm";
import { HistoryReaderLayout } from "../HistoryReaderLayout/HistoryReaderlayout";
import { TopicsInputForm } from "../TopicssInputForm/TopicsInputForm";

export const HistoryReader = () => {
    const {instance, accounts} = useMsal();
    const [bearerToken, setBearerToken] = React.useState('');
    var isAuthenticated = useIsAuthenticated();
    var [topics, setTopics] = React.useState([]);
    var [events, setEvents] = React.useState([]);
    var [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
    var [isCreateTopicOpen, setIsCreateTopicOpen] = useState(false);

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
        <Button onClick={() => setIsCreateEventOpen(true)} disabled={bearerToken.length == 0}>Create Event</Button>
        <Button onClick={() => setIsCreateTopicOpen(true)} disabled={bearerToken.length == 0}>Create Topic</Button>
        <HistoryReaderLayout events={events} topics={topics} />
        <EventsInputForm topics={topics} open={isCreateEventOpen} token={bearerToken}
            onClose={() => setIsCreateEventOpen(false)}
            handleAddSuccess={(event) => {
                console.log("Successfully added an event!");
                console.log(event);
                getEvents();
                setIsCreateEventOpen(false);
            }}
        />
        <TopicsInputForm open={isCreateTopicOpen} token={bearerToken}
            onClose={() => setIsCreateTopicOpen(false)}
            handleAddSuccess={(resp) => {
                console.log("Successfully added topic!");
                console.log(resp);
                getTopics();
                setIsCreateTopicOpen(false);
            }}
        />
    </>:
    <>
        Login First!
    </>

}