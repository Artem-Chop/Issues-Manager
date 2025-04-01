export interface Issue {
  id: number;
  title: string;
  state: "open" | "closed";
  assignee: string | null;
  user: {
    login: string;
  };
  html_url: string;
}

// export interface IssuesState {
//   isLoading: boolean;
//   columns: {
//     ToDo: Issue[];
//     InProgress: Issue[];
//     Done: Issue[];
//   };
// }

export interface IssuesState {
  isLoading: boolean;
  data: Issue[];
  // columns: "ToDo" | "In Progress" | "Done";
}
