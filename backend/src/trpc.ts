import { initTRPC } from "@trpc/server";

const memories = [
  {
    id: "head1",
    name: "Header1",
    description: "This is the header number 1",
  },
  {
    id: "head2",
    name: "Header2",
    description: "This is the header number 2",
  },
  {
    id: "head3",
    name: "Header3",
    description: "This is the header number 3",
  },
  {
    id: "head4",
    name: "Header4",
    description: "This is the header number 4",
  },
  {
    id: "head5",
    name: "Header5",
    description: "This is the header number 5",
  },
];

const x: string = "hello";
console.info(x)

const trpc = initTRPC.create();

export const trpcRouter = trpc.router({
  getMemories: trpc.procedure.query(() => {
    return { memories };
  }),
});

export type TrpcRouter = typeof trpcRouter;
