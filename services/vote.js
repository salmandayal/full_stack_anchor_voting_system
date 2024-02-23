async function getCount(voteTopic) {
  //Do web3

  //Get the count from the blockchain

  return { count: 5 };
}

async function getAllTopic() {
  //Do web3

  //Get the count from the blockchain

  return [
    {
      topic: "Trending Token",
      options: [
        {
          name: "BTC",
          count: 5,
        },
        {
          name: "ETH",
          count: 5,
        },
      ],
    },
  ];
}

async function createVoteTopic(voteTopic, options) {
  //Do web3

  //Create the vote topic on the blockchain
  return "Vote topic created";
}

async function castVote(voteTopic, option) {
  //Do web3

  //Create the vote topic on the blockchain
  return "Vote casted successfully";
}

module.exports = {
  getCount,
  createVoteTopic,
  castVote,
  getAllTopic,
};
