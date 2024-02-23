import VoteRegistry from "./VoteRegistry";
import CreateVote from "./CreateVote";
import { useEffect, useState } from "react";
import axios from "axios";

export function Content() {
  const [voteTopics, setVoteTopics] = useState<
    Array<{
      topic: string;
      options: {
        name: string;
        count: number;
      }[];
    }>
  >([]);

  async function fetchVoteTopics() {
    try {
      const res = await axios.get("http://localhost:3000/api/topics");
      setVoteTopics(res.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchVoteTopics();
  }, []);

  return (
    <div className='w-[80] justify-evenly flex flex-row mt-5 mx-auto'>
      <VoteRegistry voteTopics={voteTopics} fetchVoteTopics={fetchVoteTopics} />
      <CreateVote fetchVoteTopics={fetchVoteTopics} />
    </div>
  );
}
