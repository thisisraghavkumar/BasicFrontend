import { IHistoricalEvent } from "../../Models/IHistoricalEventModel";
import { IHistoricalTopic } from "../../Models/IHistoricalTopicsModel";

export interface IHistoryReaderLayoutProps {
    events: IHistoricalEvent[];
    topics: IHistoricalTopic[];
}