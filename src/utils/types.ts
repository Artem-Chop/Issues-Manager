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

export interface IssuesState {
  isLoading: boolean;
  data: Issue[];
}

export interface ColumnType {
  title: string;
  columnIssues: Issue[];
}

export interface ColumnProps {
  title: string;
  issues: Issue[];
}

export interface IssueCardProps {
  issue: Issue;
}

export interface moveIssueProps {
  issueId: number;
  state: "open" | "closed";
  assignee: string | null;
}
