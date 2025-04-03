import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IssuesState, moveIssueProps } from "../utils/types";

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

const initialState: IssuesState = {
  isLoading: false,
  data: [],
};

const issuesSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {
    moveIssue(State, action: PayloadAction<moveIssueProps>) {
      const { issueId, state, assignee } = action.payload;
      State.data = State.data.map((issue) =>
        issue.id === issueId ? { ...issue, state, assignee } : issue
      );
    },
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
      .addCase(fetchIssues.rejected, (state, action) => {
        state.isLoading = false;
        console.error(action.error.message);
      });
  },
});

export default issuesSlice.reducer;
export const { moveIssue } = issuesSlice.actions;
