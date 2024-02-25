export type OpikaVotingSystem = {
  version: "0.1.0";
  name: "opika_voting_system";
  instructions: [
    {
      name: "createVoteTopic";
      accounts: [
        {
          name: "voteRegistryAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "voteTopicAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "user";
          isMut: true;
          isSigner: true;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "title";
          type: "string";
        },
        {
          name: "options";
          type: {
            vec: "string";
          };
        }
      ];
    },
    {
      name: "castVote";
      accounts: [
        {
          name: "voteTopicAccount";
          isMut: true;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "optionIndex";
          type: "u8";
        }
      ];
    }
  ];
  accounts: [
    {
      name: "voteTopicsRegistry";
      type: {
        kind: "struct";
        fields: [
          {
            name: "voteTopics";
            type: {
              vec: "string";
            };
          }
        ];
      };
    },
    {
      name: "voteTopic";
      type: {
        kind: "struct";
        fields: [
          {
            name: "title";
            type: "string";
          },
          {
            name: "voteCounts";
            type: {
              vec: "u64";
            };
          },
          {
            name: "options";
            type: {
              vec: "string";
            };
          }
        ];
      };
    }
  ];
  errors: [
    {
      code: 6000;
      name: "InvalidOptionIndex";
      msg: "The provided option index is invalid.";
    }
  ];
};

export const IDL: OpikaVotingSystem = {
  version: "0.1.0",
  name: "opika_voting_system",
  instructions: [
    {
      name: "createVoteTopic",
      accounts: [
        {
          name: "voteRegistryAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "voteTopicAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "user",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "title",
          type: "string",
        },
        {
          name: "options",
          type: {
            vec: "string",
          },
        },
      ],
    },
    {
      name: "castVote",
      accounts: [
        {
          name: "voteTopicAccount",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "optionIndex",
          type: "u8",
        },
      ],
    },
  ],
  accounts: [
    {
      name: "voteTopicsRegistry",
      type: {
        kind: "struct",
        fields: [
          {
            name: "voteTopics",
            type: {
              vec: "string",
            },
          },
        ],
      },
    },
    {
      name: "voteTopic",
      type: {
        kind: "struct",
        fields: [
          {
            name: "title",
            type: "string",
          },
          {
            name: "voteCounts",
            type: {
              vec: "u64",
            },
          },
          {
            name: "options",
            type: {
              vec: "string",
            },
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: "InvalidOptionIndex",
      msg: "The provided option index is invalid.",
    },
  ],
};
