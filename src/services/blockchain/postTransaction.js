import Axios from "axios";

export default async function postTransaction(endpoint, transaction) {
  if (!transaction) {
    console.log("No valid transaction provided.");
    return;
  }
  const url = endpoint + "/transactions";
  const response = await Axios.post(url, { transaction });
  console.log(response);
  return response.data;
}
