import axios from "axios";

export const getData = (url: string, token: string, callback) => {
    const headers = new Headers();
    const bearer = `Bearer ${token}`
    headers.append("Authorization", bearer);
    headers.append("Accept", "application/json");
    headers.append("Odata-MaxVersion", "4.0");
    headers.append("OData-Version", "4.0");

    const options = {
        method: "GET",
        headers: headers
    };

    fetch(url, options).then(async (resp) => {
        var res = await resp.json();
        callback(res);
    });
}