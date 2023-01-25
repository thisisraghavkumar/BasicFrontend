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

export const postData = (url: string, token: string, data:any, callback) => {
    const headers = new Headers();
    const bearer = `Bearer ${token}`
    headers.append("Authorization", bearer);
    headers.append("Accept", "application/json");
    headers.append("Odata-MaxVersion", "4.0");
    headers.append("OData-Version", "4.0");
    headers.append("Content-Type", "application/json;charset=utf-8");
    headers.append("Prefer", "return=representation");

    const options: RequestInit = {
        method: "POST",
        headers: headers,
        body: data
    };

    fetch(url, options).then(async (response) => {
        var res = await response.json();
        callback(res);
    });
}