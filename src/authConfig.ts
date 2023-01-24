export const msalConfig = {
  auth: {
    clientId: "c948743e-d8db-43d0-ab21-41e8545dd85b",
    authority: "https://login.microsoftonline.com/f54a8fe2-6bdc-4ee0-8f00-e21a3095dad3", // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
    redirectUri: "http://localhost:1947",
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  }
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
 authNscopes: ["User.Read", "https://orgc82df470.crm.dynamics.com/user_impersonation"],
 authZscopes: ["https://orgc82df470.crm.dynamics.com/.default"]
};

// Add the endpoints here for Microsoft Graph API services you'd like to use.
export const graphConfig = {
    graphMeEndpoint: "Enter_the_Graph_Endpoint_Here/v1.0/me"
};

export const dataverseConfig = {
  environmentEndpoint: "https://orgc82df470.crm.dynamics.com",
  dataApiEndpoint: "https://orgc82df470.api.crm.dynamics.com/api/data/v9.2",
  eventsTable: {
    Id: "cr17b_eventses",
    Properties: {
      Id: "cr17b_eventsid",
      Name: "cr17b_name",
      DateOfOccurrence: "cr17b_dateofoccurrence",
      CityOfOccurrence: "cr17b_cityofoccurrence",
      CountryOfOccurrence: "cr17b_countryofoccurrence",
      IsDateExact: "cr17b_isdateexact",
      Keywords: "cr17b_keywords",
      Etag: "@odata.etag",
      TopicValue: "_cr17b_topic_value"
    }
  },
  topicTable: {
    Id: "cr17b_historicaltopicses",
    Properties: {
      Id: "cr17b_historicaltopicsid",
      Name: "cr17b_name",
      Etag: "@odata.etag"
    }
  }
}