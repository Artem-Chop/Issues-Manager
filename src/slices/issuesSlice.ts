import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Issue, IssuesState } from "../utils/types";

// Rebuild IssuesState
// interface IssuesState {
//   isLoading: boolean;
//   columns: {
//     ToDo: Issue[];
//     InProgress: Issue[];
//     Done: Issue[];
//   };
// }

// const initialState: IssuesState = {
//   isLoading: false,
//   columns: {
//     ToDo: [],
//     InProgress: [],
//     Done: [],
//   },
// };
// Rebuild IssuesState

const initialState: IssuesState = {
  isLoading: false,
  data: [],
};

export const fetchIssues = createAsyncThunk(
  "issues/fetchIssues",
  async ({ owner, repo }: { owner: string; repo: string }) => {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/issues`
      );
      if (!response.ok) {
        throw new Error("Failed to load issues");
      }
      return response.json();
    } catch (error) {
      console.error(error);
    }
  }
);

const issuesSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {
    // moveIssue: there should be function for drag&drop here in future
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIssues.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchIssues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      // .addCase(
      //   fetchIssues.fulfilled,
      //   (state, action: PayloadAction<Issue[]>) => {
      //     state.isLoading = false;
      //     state.columns.ToDo = action.payload
      //       .filter((issue) => issue.state === "open" && !issue.assignee)
      //       .map((issue) => issue);
      //     state.columns.InProgress = action.payload
      //       .filter((issue) => issue.state === "open" && issue.assignee)
      //       .map((issue) => issue);
      //     state.columns.Done = action.payload
      //       .filter((issue) => issue.state === "closed")
      //       .map((issue) => issue);
      //   }
      // )
      .addCase(fetchIssues.rejected, (state, action) => {
        state.isLoading = false;
        console.error(action.error.message);
      });
  },
});

export default issuesSlice.reducer;
