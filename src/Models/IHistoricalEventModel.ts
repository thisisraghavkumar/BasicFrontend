export interface IHistoricalEvent {
    Etag: string;
    Id: string;
    Name: string;
    DateofOccurrence: string;
    CityOfOccurrence?: string;
    CountryOfOccurrence?: string;
    IsDateExact: boolean;
    TopicValue: string;
}