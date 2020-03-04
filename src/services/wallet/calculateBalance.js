import { isReceivingTransaction, isLoopTransaction } from "..";

export default function calculateBalance(wallet) {
  return Object.values(wallet.transactions)
    .filter(
      t =>
        (t.val || !isReceivingTransaction(wallet, t)) && !isLoopTransaction(t)
    )
    .map(t => (isReceivingTransaction(wallet, t) ? t.amt : -t.amt))
    .reduce((t, total) => t + total, 0);
}
