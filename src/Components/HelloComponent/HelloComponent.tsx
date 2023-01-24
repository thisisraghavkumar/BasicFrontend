import React from "react";
import IHelloComponentProps from "./HelloComponent.types";
import './HelloComponent.css';


const HelloComponent = (props: IHelloComponentProps) => {
    return (
        <div className="helloBox">
            <h1>Hello {props.nameOfUser}!</h1>
            {props.countryOfUser && <h2>We see that you're from {props.countryOfUser}</h2>}
            {props.organizationOfUser && <h3>And that you work for {props.organizationOfUser}</h3>}
        </div>
    );
}

export default HelloComponent;