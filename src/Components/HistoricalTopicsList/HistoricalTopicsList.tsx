import React from "react";
import { List, ListItem, Checkbox, Box } from "@mui/material";
import { IHistoricalTopicListsProps } from "./HistoricalTopicsList.types";
import "./HistoricalTopicsList.css"


export const HistoricalTopicsList = (props: IHistoricalTopicListsProps) => {
    var listItems = props.items.map((topic) => {
        return (
        <ListItem
            key={"topic_item_"+topic.Id}
            secondaryAction={
                <Checkbox
                    edge = "end"
                    onChange={() => props.onItemToggle(topic)}
                />
            }
            className="topicListItem"
        >
            <Box className="topicListItemTextBox">
                {topic.Name}
            </Box>
        </ListItem>);
    });

    return (
        <List className="topicsList">
            {
                listItems
            }
        </List>
    );
}