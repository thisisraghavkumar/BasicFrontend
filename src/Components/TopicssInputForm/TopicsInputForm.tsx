import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, MenuItem, Switch, TextField } from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import { dataverseConfig } from "../../authConfig";
import { IHistoricalEvent } from "../../Models/IHistoricalEventModel";
import { IHistoricalTopic } from "../../Models/IHistoricalTopicsModel";
import { postData } from "../../Services/DataverseService";


export interface ITopicInputFormProps {
    open: boolean;
    token: string;
    onClose: () => void;
    handleAddSuccess: (any) => void;
}

export const TopicsInputForm = (props: ITopicInputFormProps) => {
    var [name, setName] = useState('');

    const {open, onClose} = props;

    const addTopic = useCallback((nm) => {
        const p = dataverseConfig.topicTable.Properties;
        var repObj = `{
            "${p.Name}": "${nm}"
        }`;

        postData(dataverseConfig.dataApiEndpoint+'/'+dataverseConfig.topicTable.Id, props.token, repObj, props.handleAddSuccess);
    }, [ props.token]);

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Topic</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please add a new historical topic.
                </DialogContentText>
                <TextField id="topicName"
                    required
                    label="Name Of Topic"
                    onChange={(event) => {
                        console.log(event.target.value);
                        setName(event.target.value ?? '');
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {addTopic(name);}}>Add</Button>
                <Button onClick={() => {onClose();}} color="error">Close</Button>
            </DialogActions>
        </Dialog>
    );
}