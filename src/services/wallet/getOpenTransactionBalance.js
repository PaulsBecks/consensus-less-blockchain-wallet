export default function getOpenTransactionBalance(transactions, transaction) {
  console.log(transaction);
  return (
    transaction.amt -
    transactions
      .filter(t => {
        return !!t.frm[transaction.sig];
      })
      .map(t => {
        return t.amt;
      })
      .reduce((total, x) => {
        return total + x;
      }, 0)
  );
}
