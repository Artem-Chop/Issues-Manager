import { RootState } from "./store";
import { useSelector, useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { Divider, Flex } from "antd";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import Column from "./components/Column";
import Search from "./components/Search";
import { ColumnType } from "./utils/types";
import { moveIssue } from "./slices/issuesSlice";

const App: React.FC = () => {
  const issues = useSelector((state: RootState) => state.issues.data);
  const dispatch: Dispatch = useDispatch();

  const newIssues = issues.filter(
    (issue) => issue.state === "open" && !issue.assignee
  );
  const inProgressIssues = issues.filter(
    (issue) => issue.state === "open" && issue.assignee
  );
  const doneIssues = issues.filter((issue) => issue.state === "closed");

  const columns: ColumnType[] = [
    { title: "New", columnIssues: newIssues },
    { title: "In Progress", columnIssues: inProgressIssues },
    { title: "Done", columnIssues: doneIssues },
  ];

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;
    const issueStatusChange = () => {
      const issueId = active.id as number;

      if (over.id === "New") {
        dispatch(
          moveIssue({
            issueId,
            state: "open",
            assignee: null,
          })
        );
      }
      if (over.id === "In Progress") {
        dispatch(
          moveIssue({
            issueId,
            state: "open",
            assignee: "Open by User",
          })
        );
      }
      if (over.id === "Done") {
        dispatch(
          moveIssue({
            issueId,
            state: "closed",
            assignee: null,
          })
        );
      }
    };

    issueStatusChange();
  };

  return (
    <div>
      <Search />
      <Divider />
      <Flex style={{ width: "100%", gap: "3px" }} justify="space-between">
        <DndContext onDragEnd={handleDragEnd}>
          {columns.map((column) => (
            <Column
              key={column.title}
              title={column.title}
              issues={column.columnIssues}
            />
          ))}
        </DndContext>
      </Flex>
    </div>
  );
};

export default App;
