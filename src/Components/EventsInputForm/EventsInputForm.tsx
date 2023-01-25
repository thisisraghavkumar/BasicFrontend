import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, MenuItem, Switch, TextField } from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import { dataverseConfig } from "../../authConfig";
import { IHistoricalEvent } from "../../Models/IHistoricalEventModel";
import { IHistoricalTopic } from "../../Models/IHistoricalTopicsModel";
import { postData } from "../../Services/DataverseService";


export interface IEventInputFormProps {
    topics: IHistoricalTopic[]
    open: boolean;
    token: string;
    onClose: () => void;
    handleAddSuccess: (any) => void;
}

export const EventsInputForm = (props: IEventInputFormProps) => {
    var [name, setName] = useState('');
    var [date, setDate] = useState('');
    var [isexact, setisexact] = useState(true);
    var [city, setCity] = useState('');
    var [country, setCountry] = useState('');
    var [topicId, setTopicId] = useState('');

    const {open, topics, onClose} = props;

    const addEvent = useCallback((nm, dt, ie, tp, ct, co) => {
        const p = dataverseConfig.eventsTable.Properties;
        var repObj = `{
            "${p.Name}": "${nm}",
            "${p.DateOfOccurrence}": "${dt}",
            "${p.IsDateExact}": ${ie},
            "${p.TopicValue}": "${tp}",
            "${p.CityOfOccurrence}": ${ct.length != 0 ? `"${ct}"`: null},
            "${p.CountryOfOccurrence}": ${co.length != 0 ? `"${co}"`: null}
        }`;

        postData(dataverseConfig.dataApiEndpoint+'/'+dataverseConfig.eventsTable.Id, props.token, repObj, props.handleAddSuccess);
    }, [props.token]);

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Event</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please add a new historical event. If you're not sure of the date mark is date exact to false and specify an exact date in the input.
                </DialogContentText>
                <TextField id="eventName"
                    required
                    label="Name Of Event"
                    onChange={(event) => {
                        setName(event.target.value ?? '');
                    }}
                />
                <TextField id="eventDate"
                    required
                    label="Date Of Event (yyyy-mm-dd)"
                    onChange={(event) => {
                        setDate(event.target.value ?? '');
                    }}
                />
                <FormControlLabel control={<Switch id="isEventDateExact" defaultChecked onChange={(_, checked) => {
                    setisexact(checked);
                }}/>} label={"Is Date Exactly Known"} labelPlacement="start"/>
                
                <TextField id="eventCity"
                    label="City Of Occurrence"
                    value={city}
                    onChange={(event) => {
                        setCity(event.target.value ?? '');
                    }}
                />
                <TextField id="eventCountry"
                    label="Country Of Occurrence"
                    value={country}
                    onChange={(event) => {
                        setCountry(event.target.value ?? '');
                    }}
                />
                <TextField id="eventTopic"
                    required
                    select
                    label="Topic Of Event"
                    value={topicId}
                    onChange={(event) => {
                        setTopicId(event.target.value ?? '');
                    }}
                >
                    {
                        topics.map((topic) => {
                            return <MenuItem key={topic.Id} value={topic.Id}>
                                {topic.Name}
                            </MenuItem>
                        })
                    }
                </TextField>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {addEvent(name, date, isexact, topicId, city, country);}}>Add</Button>
                <Button onClick={() => {onClose();}} color="error">Close</Button>
            </DialogActions>
        </Dialog>
    );
}