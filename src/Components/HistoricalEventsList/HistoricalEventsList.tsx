import { List, ListItem, ListItemText } from "@mui/material";
import React from "react";
import { IHistoricalEventsList } from "./HistoricalEventsList.types";
import "./HistoricalEventsList.css"
import { EventCard } from "../EventCard/EventCard";
export const HistoricalEventsList = (props: IHistoricalEventsList) => {
    var listItems = props.events.map(event => {
        return <ListItem key={`hist_event_${event.Id}`}>
            <EventCard event={event}/>
        </ListItem>;
    });

    return (
        <List className="eventListBox">
            {listItems}
        </List>
    );
}