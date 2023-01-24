import { Box } from "@mui/material";
import React from "react";
import { IHistoricalTopic } from "../../Models/IHistoricalTopicsModel";
import { HistoricalEventsList } from "../HistoricalEventsList/HistoricalEventsList";
import { HistoricalTopicsList } from "../HistoricalTopicsList/HistoricalTopicsList";
import { IHistoryReaderLayoutProps } from "./HistoryReaderLayout.types";

export const HistoryReaderLayout = (props: IHistoryReaderLayoutProps) => {
    var [selectedTopicIds, setSlectedTopicIds] = React.useState(new Set());
    var handleTopicToggle = (topic: IHistoricalTopic) => {
        var newIds = new Set([...selectedTopicIds.values()]);
        if (selectedTopicIds.has(topic.Id)) {
            newIds.delete(topic.Id);
        } else {
            newIds.add(topic.Id);
        }
        console.log(newIds);
        setSlectedTopicIds(newIds);
    };
    const {topics, events} = props;

    return (<Box sx={{ display: "flex", width: "100%"}}>
        <HistoricalTopicsList items={topics} onItemToggle={handleTopicToggle} />
        <HistoricalEventsList events={events.filter(event => selectedTopicIds.has(event.TopicValue))} />
    </Box>);
}

