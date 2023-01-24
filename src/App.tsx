import React, { useState } from "react";
import "./App.css"
import { PublicClientApplication } from "@azure/msal-browser";
import { AuthenticatedTemplate, MsalProvider, UnauthenticatedTemplate } from "@azure/msal-react";
import { msalConfig } from "./authConfig";
import { DisplayArea } from "./Components/DisplayArea/DisplayArea";
import { SignInButton } from "./Components/SigInButton/SignInButton";
import { AppLayout } from "./Components/AppLayout/AppLayout";
import { TestComponent } from "./Components/TestComponent/TestComponent";
import { Box } from "@mui/system";
import { HistoryReader } from "./Components/HistoryReader/HistoryReader";

const App = () => {
    var [msalInstance, setMsalInstance] = useState(new PublicClientApplication(msalConfig));
    return (
        <div className="appSurface">
            <MsalProvider instance={msalInstance}>
                    <DisplayArea>
                        <AppLayout appName="History Reader">
                            <HistoryReader />
                        </AppLayout>
                    </DisplayArea>
            </MsalProvider>
        </div>
    );
}

export default App;