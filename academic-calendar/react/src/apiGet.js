const apiGet = async (resource) => {
  const headers = new Headers();
  headers.append("X-McMaster-Api-Revision", `${window._env.calendarApi.revision}`);
  headers.append("Ocp-Apim-Subscription-Key", `${window._env.calendarApi.key}`);
  
  const options = {
    method: "GET",
    headers: headers
  };

  return fetch(`${window._env.calendarApi.endpoint}/${resource}`, options)
    .then(response => response.json())
    .catch(error => console.log(error));
}

export default apiGet;