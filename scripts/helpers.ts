import anchor, {
  AnchorProvider,
  Program,
  Wallet,
  setProvider,
} from "@coral-xyz/anchor";
import { Connection, Keypair, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { IDL, OpikaVotingSystem } from "./Idl/opika_voting_system";
import fs from "fs";
import path from "path";

const PROGRAM_ID = "5FNAvGjh53rUH2cNJps5CqYmTeuBNAv8m6zaKLqFoA3m";

function loadWalletKey(keypainFile) {
  const loaded = Keypair.fromSecretKey(
    Buffer.from(
      JSON.parse(
        fs.readFileSync(path.join(__dirname, keypainFile), {
          encoding: "utf-8",
        })
      )
    )
  );
  return loaded;
}

const getProgram = () => {
  const keypair = loadWalletKey("main_wallet.json");

  const wallet = new Wallet(keypair);
  const connection = new Connection(clusterApiUrl("devnet"));
  const provider = new AnchorProvider(connection, wallet, {
    commitment: "finalized",
  });
  setProvider(provider);
  const program = new Program<OpikaVotingSystem>(
    IDL,
    new PublicKey(PROGRAM_ID),
    provider
  );

  return program;
};

const getVoteTopicRegistryAccount = () => {
  const [voteRegistry] = PublicKey.findProgramAddressSync(
    [Buffer.from("vote_registry")],
    new PublicKey(PROGRAM_ID)
  );
  return voteRegistry;
};

const getVoteTopicAccount = (title: string) => {
  const [voteTopicAccount] = PublicKey.findProgramAddressSync(
    [Buffer.from(title)],
    new PublicKey(PROGRAM_ID)
  );
  return voteTopicAccount;
};

const createVoteTopic = async (title: string, options: Array<string>) => {
  const program = getProgram();

  return program.methods
    .createVoteTopic("Favt Coin", ["BTC", "ETH"])
    .accounts({
      voteTopicAccount: getVoteTopicAccount(title),
      voteRegistryAccount: getVoteTopicRegistryAccount(),
    })
    .rpc();
};
// createVoteTopic("favt coin", ["A", "B", "C"]).catch(e => console.log(e));

const getAllVoteTopics = async () => {
  const program = getProgram();
  const voteRegistry = getVoteTopicRegistryAccount();
  const voteRegistryData = await program.account.voteTopicsRegistry.fetch(
    voteRegistry
  );
  const topics = voteRegistryData.voteTopics.map(async topic => {
    const voteTopic = await program.account.voteTopic.fetch(topic);
    return voteTopic;
  });
  return topics;
};

const castVote = async (topic: string, vote: string) => {
  const program = getProgram();
  const voteIndex = await getVoteIndex(topic, vote);
  await program.methods
    .castVote(voteIndex)
    .accounts({
      voteTopicAccount: getVoteTopicAccount(topic),
    })
    .rpc();
};

const getVoteIndex = async (topic: string, vote: string) => {
  const program = getProgram();
  const voteTopic = await program.account.voteTopic.fetch(
    getVoteTopicAccount(topic)
  );
  const voteIndex = voteTopic.options.findIndex(v => v === vote);
  return voteIndex;
};

export {
  createVoteTopic,
  getAllVoteTopics,
  castVote,
  getVoteIndex,
  getVoteTopicRegistryAccount,
  getVoteTopicAccount,
  getProgram,
  PROGRAM_ID,
  loadWalletKey,
};
