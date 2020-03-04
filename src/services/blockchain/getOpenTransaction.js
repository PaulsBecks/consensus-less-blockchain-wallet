import Axios from "axios";

export default async function getOpenTransaction(endpoint) {
  const url = endpoint + "/transactions/open/one";
  const response = await Axios.get(url);
  return response.data;
}
