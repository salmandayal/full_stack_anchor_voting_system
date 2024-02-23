import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import VoteRegistry from "./VoteRegistry";
import CreateVote from "./CreateVote";

export function Content() {
  return (
    <div className='w-[80] justify-evenly flex flex-row mt-5 mx-auto'>
      <VoteRegistry />
      <CreateVote />
    </div>
  );
}
