import {
  ComputeBudgetProgram,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  SystemProgram,
  Transaction,
  TransactionConfirmationStrategy,
  clusterApiUrl,
  sendAndConfirmTransaction,
} from "@solana/web3.js";

function loadWalletKey(keypainFile: string): Keypair {
  const fs = require("fs");

  const loaded = Keypair.fromSecretKey(
    new Uint8Array(JSON.parse(fs.readFileSync(keypainFile).toString()))
  );
  return loaded;
}

(async () => {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  const keypair = new Keypair();

  const airdropTx = await connection.requestAirdrop(
    keypair.publicKey,
    0.1 * LAMPORTS_PER_SOL
  );

  const blockhash = await connection.getLatestBlockhash();

  const strategy: TransactionConfirmationStrategy = {
    ...blockhash,
    signature: airdropTx,
  };

  await connection.confirmTransaction(strategy, "finalized");

  const ix = SystemProgram.transfer({
    fromPubkey: keypair.publicKey,
    toPubkey: new Keypair().publicKey,
    lamports: 0.01 * LAMPORTS_PER_SOL,
  });

  const tx = new Transaction();
  // tx.add(ix);

  //Add priority fee
  const ixPriorityFee = ComputeBudgetProgram.setComputeUnitPrice({
    microLamports: 1,
  });
  tx.add(ixPriorityFee);

  let result = await sendAndConfirmTransaction(connection, tx, [keypair]);
  console.log(result);
})();
