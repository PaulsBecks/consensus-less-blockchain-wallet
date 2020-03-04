function getLastOpenTransaction(wallet) {
  for (let t of Object.entries(wallet.transactions)) {
    if (!t[1].isValid) {
      return t[0];
    }
  }
}

export default function getReferenceTransactions(wallet, openTransaction) {
  const reference = [];
  const lot = getLastOpenTransaction(wallet);
  console.log(lot, openTransaction);
  if (lot) {
    reference.push(lot);
  }
  if (openTransaction) {
    reference.push(openTransaction.sig);
  }
  return reference;
}
