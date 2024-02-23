import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { VoteItem } from "./VoteItem";

const VoteRegistry = () => {
  return (
    <Card className='w-[600px]'>
      <CardHeader>
        <CardTitle>Vote Registry</CardTitle>
        <CardDescription>Cast vote and view vote details</CardDescription>
      </CardHeader>
      <CardContent>
        <VoteItem
          voteName='Top coin'
          voteOptions={[
            { name: "BTC", count: 5 },
            { name: "ETH", count: 7 },
          ]}
        />
        <VoteItem
          voteName='Top coin'
          voteOptions={[
            { name: "BTC", count: 5 },
            { name: "ETH", count: 7 },
          ]}
        />
      </CardContent>

      <CardFooter></CardFooter>
    </Card>
  );
};

export default VoteRegistry;
