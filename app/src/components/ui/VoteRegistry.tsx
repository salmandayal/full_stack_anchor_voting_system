import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { VoteItem } from "./VoteItem";
import axios from "axios";
import { useEffect, useState } from "react";

const VoteRegistry = ({
  fetchVoteTopics,
  voteTopics,
}: {
  voteTopics: any;
  fetchVoteTopics: () => Promise<void>;
}) => {
  return (
    <Card className='w-[600px]'>
      <CardHeader>
        <CardTitle>Vote Registry</CardTitle>
        <CardDescription>Cast vote and view vote details</CardDescription>
      </CardHeader>
      <CardContent>
        {voteTopics?.map(voteTopic => (
          <VoteItem
            fetchVoteTopics={fetchVoteTopics}
            key={voteTopic.topic}
            voteName={voteTopic.topic}
            voteOptions={voteTopic.options}
          />
        ))}
      </CardContent>

      <CardFooter></CardFooter>
    </Card>
  );
};

export default VoteRegistry;
