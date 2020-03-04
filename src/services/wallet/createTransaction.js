import sign from "./sign";
import { buf2hex, str2ab } from "../strAb";
import { ARR_SEPERATOR, SEPERATOR } from "../../config";
import findFormer from "./findFormer";
import getReferenceTransactions from "./getReferenceTransactions";
import getOpenTransaction from "../blockchain/getOpenTransaction";

/***/
function buildTransactionString({ sender, receiver, amount, former, refered }) {
  return (
    "frm:" +
    Object.keys(former)
      .map(f => f + "-" + former[f])
      .reduce(
        (former_string, f) =>
          former_string == "" ? f : former_string + ARR_SEPERATOR + f,
        ""
      ) +
    SEPERATOR +
    "snd:" +
    sender +
    SEPERATOR +
    "rcv:" +
    receiver +
    SEPERATOR +
    "amt:" +
    amount +
    SEPERATOR +
    "ref:" +
    refered.reduce(
      (refered_string, r) =>
        refered_string == "" ? r : refered_string + ARR_SEPERATOR + r,
      ""
    ) +
    SEPERATOR
  );
}

function addSig(transactionString, sig) {
  return transactionString + "sig:" + buf2hex(sig);
}

export default async function(amount, receiver, wallet, endpoint) {
  let former = findFormer(wallet, amount);
  if (!former) {
    console.log("Not enough balance apparently!");
    return null;
  }
  let refered = getReferenceTransactions(
    wallet,
    await getOpenTransaction(endpoint)
  );
  console.log(refered);
  let transactionString = buildTransactionString({
    amount,
    receiver,
    former,
    sender: wallet.pem_pub_key,
    refered
  });
  const sig = await sign(transactionString, wallet);
  transactionString = addSig(transactionString, sig);
  return transactionString;
}
