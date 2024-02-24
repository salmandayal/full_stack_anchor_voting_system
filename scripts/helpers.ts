import anchor, {
  AnchorProvider,
  Program,
  setProvider,
} from "@coral-xyz/anchor";
import { OpikaVotingSystem } from "../target/types/opika_voting_system";
import { Connection, Keypair, clusterApiUrl } from "@solana/web3.js";

export function loadWalletKey(keypainFile) {
  const fs = require("fs");
  const path = require("path");

  const loaded = Keypair.fromSecretKey(
    new Uint8Array(
      JSON.parse(fs.readFileSync(path.join(__dirname, keypainFile)).toString())
    )
  );
  return loaded;
}

const createVoteTopic = async (programId, title, options) => {
  const wallet = loadWalletKey("main_wallet.json");
  const connection = new Connection(clusterApiUrl("devnet"));
  const provider = new AnchorProvider(connection, wallet, {});
  setProvider(provider);
  const program = new Program();
};

const getAllVoteTopics = async programId => {
  //Get account data
  // loop through the accounts
  // get the account data
  // append data to the topics array
};

const castVote = async (topic, vote) => {
  //Call program and update the vote - Validate the vote
};

exports.module = {
  loadWalletKey,
  getAllVoteTopics,
  castVote,
};
