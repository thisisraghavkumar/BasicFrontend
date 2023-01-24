import { IHistoricalTopic } from "../../Models/IHistoricalTopicsModel";

export interface IHistoricalTopicListsProps {
    items: IHistoricalTopic[];
    onItemToggle: (IHistoricalTopic) => void;
}