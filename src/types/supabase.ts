export type TThread = {
  id: string;
  parent_id: string;
  owner_id?: string;
  type: string;
  title: string;
  abstract: string;
};

export type TFormThreadData = {
  threads: Array<{ id: string; title: string }>;
  thread_types: Array<string>;
};
