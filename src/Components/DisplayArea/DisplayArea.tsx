import React from "react";
import Paper from "@mui/material/Paper";
import "./DisplayArea.css"

export const DisplayArea = (props: React.PropsWithChildren) => {

    return (
        <Paper elevation={3} variant="outlined" className="displayArea">
            {props.children}
        </Paper>
    );
}