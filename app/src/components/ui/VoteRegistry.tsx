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
import { Button } from "./button";

const VoteRegistry = () => {
  return (
    <Card className='w-[400px]'>
      <CardHeader>
        <CardTitle>Vote Registry</CardTitle>
        <CardDescription>Cast vote and view vote details</CardDescription>
      </CardHeader>
      <CardContent className='space-y-2'>
        <div className='space-y-1'>
          <Label htmlFor='current'>Current password</Label>
          <Input id='current' type='password' />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='new'>New password</Label>
          <Input id='new' type='password' />
        </div>
      </CardContent>
      <CardFooter>
        <Button>Save password</Button>
      </CardFooter>
    </Card>
  );
};

export default VoteRegistry;
