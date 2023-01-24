import { dataverseConfig } from "../authConfig";
import { IHistoricalEvent } from "../Models/IHistoricalEventModel";
import { IHistoricalTopic } from "../Models/IHistoricalTopicsModel";

export const GetEventfromJson = (obj: any) : IHistoricalEvent => {
    const p = dataverseConfig.eventsTable.Properties;
    return {
        Etag: obj[p.Etag],
        Id: obj[p.Id],
        Name: obj[p.Name],
        CountryOfOccurrence: obj[p.CountryOfOccurrence],
        CityOfOccurrence: obj[p.CityOfOccurrence],
        IsDateExact: obj[p.IsDateExact],
        DateofOccurrence: obj[p.DateOfOccurrence],
        TopicValue: obj[p.TopicValue]
    };
}

export const GetTopicFromJson = (obj: any): IHistoricalTopic => {
    const p = dataverseConfig.topicTable.Properties;

    return {
        Etag: obj[p.Etag],
        Id: obj[p.Id],
        Name: obj[p.Name]
    }
}