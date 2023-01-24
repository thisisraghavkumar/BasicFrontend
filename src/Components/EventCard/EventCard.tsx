import { Box, Card, Typography } from "@mui/material";
import React from "react";
import { IEventCardProps } from "./EventCard.types";
import "./EventCard.css"
export const EventCard = (props: IEventCardProps) => {
    return (
        <Card className="eventCard">
            <div className="subjectBox">
                <Typography>
                    {props.event.Name}
                </Typography>
            </div>
            <Typography>
                {`${props.event.IsDateExact? "": "Circa. "}${props.event.DateofOccurrence.split('T')[0]}`}
            </Typography>
            <Typography>
                {`${props.event.CityOfOccurrence ?? ''}${props.event.CityOfOccurrence != null && props.event.CountryOfOccurrence != null ? ",": ""}${props.event.CountryOfOccurrence ?? ""}`}
            </Typography>
        </Card>
    );
}