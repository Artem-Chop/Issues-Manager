import { Card } from "antd";
import { IssueCardProps } from "../utils/types";
import { useDraggable } from "@dnd-kit/core";

export default function IssueCard({ issue }: IssueCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: issue.id,
  });

  const dragStyle = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
        zIndex: 1,
      }
    : undefined;

  return (
    <Card
      key={issue.id}
      style={{
        background: "#172085",
        border: "none",
        cursor: "grab",
        marginBottom: 5,
        ...dragStyle,
      }}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      <a href={issue.html_url} target="_blank" rel="noopener noreferrer">
        {issue.title}
      </a>
      <p>Added by {issue.user.login}</p>
      <h3>Status: {issue.state}</h3>
    </Card>
  );
}
