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
import { useState } from "react";

const CreateVote = () => {
  const [options, setOptions] = useState([]);

  const handleChange = (newOptions: any) => {
    setOptions(newOptions);
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
          <Input id='name' />
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
        <Button>Save Topic</Button>
      </CardFooter>
    </Card>
  );
};

export default CreateVote;
