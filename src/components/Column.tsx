import { Col, Typography } from "antd";
import { ColumnProps } from "../utils/types";
import { useDroppable } from "@dnd-kit/core";
import IssueCard from "./IssueCard";

export default function Column({ title, issues }: ColumnProps) {
  const { setNodeRef } = useDroppable({ id: title });

  return (
    <Col
      span={8}
      style={{
        padding: 10,
        background: "#3480eb",
        borderRadius: 10,
        margin: 2,
        flex: 1,
      }}
      ref={setNodeRef}
    >
      <Typography.Title
        level={4}
        style={{ margin: 2, textAlign: "center", background: "inherit" }}
      >
        {title}
      </Typography.Title>
      {issues.map((issue) => (
        <IssueCard issue={issue} key={issue.id} />
      ))}
    </Col>
  );
}
