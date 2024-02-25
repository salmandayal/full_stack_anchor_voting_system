import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";

export function VoteSelection({
  fetchVoteTopics,
  voteOptions,
  voteName,
}: {
  voteOptions: Array<{ name: string; count: number }>;
  fetchVoteTopics: () => Promise<void>;
  voteName: string;
}) {
  const optionEnum = voteOptions.map(option => option.name);
  const FormSchema = z.object({
    type: z.enum([...optionEnum], {
      required_error: "You need to select an option.",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    try {
      await axios.post("http://localhost:3000/api/castVote", {
        voteTopic: voteName,
        option: data.type,
      });
      await fetchVoteTopics();
      toast({
        title: "Vote Casted 🚀",
        description: "You voted for " + data.type,
      });
      setOpen(false);
    } catch (error) {
      toast({
        title: "Error, try again later",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='mt-2' variant='outline'>
          Vote Now
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Cast Vote Now</DialogTitle>
          <DialogDescription>
            Select your option. Click "Cast Vote" when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='w-2/3 space-y-6'
          >
            <FormField
              control={form.control}
              name='type'
              render={({ field }) => (
                <FormItem className='space-y-3'>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className='flex flex-col space-y-1'
                    >
                      {voteOptions?.map(option => (
                        <FormItem className='flex items-center space-x-3 space-y-0'>
                          <FormControl>
                            <RadioGroupItem value={option.name} />
                          </FormControl>
                          <FormLabel className='font-normal'>
                            {option.name}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!loading ? (
              <Button type='submit'>Submit</Button>
            ) : (
              <Button disabled>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Please wait
              </Button>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
