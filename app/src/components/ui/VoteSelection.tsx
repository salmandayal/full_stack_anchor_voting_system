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

export function VoteSelection({
  voteOptions,
}: {
  voteOptions: Array<{ name: string; count: number }>;
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

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });

    setOpen(false);
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
            <Button type='submit'>Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
