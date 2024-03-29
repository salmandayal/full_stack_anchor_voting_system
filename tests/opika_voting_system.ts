import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { OpikaVotingSystem } from "../target/types/opika_voting_system";
import { loadWalletKey } from "../scripts/helpers";
import { expect } from "chai";
import { utf8 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";

describe("opika_voting_system", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace
    .OpikaVotingSystem as Program<OpikaVotingSystem>;

  it("Create Vote Topic", async () => {
    const [voteAccount] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("favt coin")],
      program.programId
    );
    const [voteAccount2] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("favt team")],
      program.programId
    );
    const [voteRegistry] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("vote_registry")],
      program.programId
    );

    await program.methods
      .createVoteTopic("favt coin", ["A", "B", "C"])
      .accounts({
        voteTopicAccount: voteAccount,
        voteRegistryAccount: voteRegistry,
      })
      .rpc()
      .catch(e => console.log("Test error:", e));

    await program.methods
      .createVoteTopic("favt team", ["US", "China"])
      .accounts({
        voteTopicAccount: voteAccount2,
        voteRegistryAccount: voteRegistry,
      })
      .rpc()
      .catch(e => console.log("Test error:", e));

    const tx = await program.account.voteTopic.fetch(voteAccount);

    let vtr = await program.account.voteTopicsRegistry.fetch(voteRegistry);

    const tx2 = await program.account.voteTopic.fetch(voteAccount2);

    vtr = await program.account.voteTopicsRegistry.fetch(voteRegistry);

    expect(tx.title).to.equal("favt coin");
    expect(tx2.title).to.equal("favt team");
    expect(vtr.voteTopics.length).to.equal(2);

    // expect(tx.title).to.equal("salman");
  });

  it("Cast Vote", async () => {
    const [voteAccount] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("favt coin")],
      program.programId
    );

    await program.methods
      .castVote(0)
      .accounts({
        voteTopicAccount: voteAccount,
      })
      .rpc();

    await program.methods
      .castVote(0)
      .accounts({
        voteTopicAccount: voteAccount,
      })
      .rpc();

    const tx = await program.account.voteTopic.fetch(voteAccount);
    expect(tx.voteCounts[0].toNumber()).to.equal(2);
  });
});
