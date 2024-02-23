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
import { MuiChipsInput } from "mui-chips-input";
import { ChangeEvent, useState } from "react";

const CreateVote = () => {
  const [options, setOptions] = useState<Array<string>>();
  const [voteName, setVoteName] = useState<string>();

  const handleChange = (newOptions: Array<string>) => {
    setOptions(newOptions);
  };

  const onChangeVoteName = (e: ChangeEvent<HTMLInputElement>) => {
    setVoteName(e.target.value);
  };

  const saveTopic = async () => {
    //Do api call
  };

  return (
    <Card className='w-[400px]'>
      <CardHeader>
        <CardTitle>Add Vote topic</CardTitle>
        <CardDescription>
          Create a new vote topic and add vote options
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-2'>
        <div className='space-y-1'>
          <Label htmlFor='name'>Topic Name</Label>
          <Input
            placeholder='Enter topic name'
            id='name'
            value={voteName}
            onChange={onChangeVoteName}
          />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='username'>Options</Label>
          <br />
          <MuiChipsInput
            size='small'
            className='w-full'
            value={options}
            onChange={handleChange}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={saveTopic}>Save Topic</Button>
      </CardFooter>
    </Card>
  );
};

export default CreateVote;
