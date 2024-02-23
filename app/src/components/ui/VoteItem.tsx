import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./button";
import { Separator } from "./separator";
import { Label } from "./label";
import { VoteSelection } from "./VoteSelection";

export function VoteItem({
  voteName,
  voteOptions,
  fetchVoteTopics,
}: {
  voteName: string;
  voteOptions: Array<{
    name: string;
    count: number;
  }>;
  fetchVoteTopics: () => Promise<void>;
}) {
  return (
    <div className='mt-5'>
      <Label>{voteName}</Label>
      <Table>
        <TableHeader>
          <TableRow>
            {voteOptions.map(option => (
              <TableHead className='text-center'>{option.name}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            {voteOptions.map(option => (
              <TableCell>{option.count}</TableCell>
            ))}
            <VoteSelection
              voteName={voteName}
              fetchVoteTopics={fetchVoteTopics}
              voteOptions={voteOptions}
            />
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <Separator />
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
