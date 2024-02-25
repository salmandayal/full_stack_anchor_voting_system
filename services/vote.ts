import * as anchorHelpers from "../scripts/helpers";

export async function getCount(voteTopic) {
  //Do web3

  //Get the count from the blockchain

  return { count: 5 };
}

export async function getAllTopic() {
  //Do web3
  try {
    const topics = await anchorHelpers.getAllVoteTopics();
    return topics;
  } catch (error) {
    return [];
  }

  //Get the count from the blockchain
  // [
  //     {
  //       topic: "Trending Token",
  //       options: [
  //         {
  //           name: "BTC",
  //           count: 5,
  //         },
  //         {
  //           name: "ETH",
  //           count: 5,
  //         },
  //       ],
  //     },
  //   ];
}

export async function createVoteTopic(voteTopic, options) {
  try {
    await anchorHelpers.createVoteTopic(voteTopic, options);
    return "Vote topic created successfully";
  } catch (error) {
    console.log("Error creating vote topic", error);
    throw new Error("Error creating vote topic");
  }

  //Create the vote topic on the blockchain
  return "Vote topic created";
}

export async function castVote(voteTopic, option) {
  //Do web3

  //Create the vote topic on the blockchain
  return "Vote casted successfully";
}
