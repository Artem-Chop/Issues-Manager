import React, { useState } from "react";
import { RootState } from "./store";
import { useSelector } from "react-redux";

import { Divider, Row } from "antd";
import Column from "./components/Column";
import Search from "./components/Search";

const App: React.FC = () => {
  const issues = useSelector((state: RootState) => state.issues.data);

  const newIssues = issues.filter(
    (issue) => issue.state === "open" && !issue.assignee
  );
  const inProgressIssues = issues.filter(
    (issue) => issue.state === "open" && issue.assignee
  );
  const doneIssues = issues.filter((issue) => issue.state === "closed");

  return (
    <div>
      <Search />
      <Divider orientation="left" />
      <Row justify="space-around">
        <Column title="New" issues={newIssues} />
        <Column title="In Progress" issues={inProgressIssues} />
        <Column title="Done" issues={doneIssues} />
      </Row>
    </div>
  );
};

export default App;
