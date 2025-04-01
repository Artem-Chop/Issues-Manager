import { Card, Col, Divider, Typography } from "antd";
import { Issue } from "../utils/types";

export default function Column({
  title,
  issues,
}: {
  title: string;
  issues: Issue[];
}) {
  return (
    <Col span={8} style={{ margin: "0" }}>
      <Typography.Title
        level={4}
        style={{ margin: 0, textAlign: "center", background: "white" }}
      >
        {title}
      </Typography.Title>
      {issues.map((issue) => (
        <Card
          key={issue.id}
          style={{ background: "#172085", margin: "5px 10px" }}
        >
          <a href={issue.html_url} target="_blank" rel="noopener noreferrer">
            {issue.title}
          </a>
          <p>Added by {issue.user.login}</p>
          <h3>Status: {issue.state}</h3>
        </Card>
      ))}
    </Col>
  );
}
