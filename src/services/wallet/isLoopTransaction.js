export default function isLoopTransaction(t) {
  return t.snd == t.rcv;
}
