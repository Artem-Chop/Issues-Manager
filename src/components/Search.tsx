import { Button, Flex, Input } from "antd";
import { fetchIssues } from "../slices/issuesSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { useState } from "react";

export default function Search() {
  const [repoUrl, setRepoUrl] = useState("https://github.com/facebook/react"); // url just for development

  const dispatch = useDispatch<AppDispatch>();

  const getIssues = async () => {
    const valid = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!valid) {
      alert("Invalid URL");
      return;
    }
    const [, owner, repo] = valid;
    dispatch(fetchIssues({ owner: owner, repo: repo }));
  };

  return (
    <Flex gap="small" style={{ padding: 10, paddingBottom: 0 }}>
      <Input
        placeholder="Enter repo URL"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
      />
      <Button
        type="primary"
        ghost
        onClick={getIssues}
        style={{ background: "#172085" }}
      >
        Load
      </Button>
    </Flex>
  );
}
