import { FetchApiConnector } from "@demo/communication/fetchApiConnector";
import { IssuesRepository } from "@demo/dataAccess/issuesRepository";
import { RedmineRequestBuilder } from "@demo/dataAccess/redmineRequestBuilder";
import fetch from "fetch-with-proxy";

const apiFactory = () => {
  const apiConnector = new FetchApiConnector(fetch as any);
  const params: RequestInit = {
    headers: { "X-Redmine-API-Key": "x" },
  };
  return new RedmineRequestBuilder(apiConnector, "https://redmine.dev.eman.cz", params);
};

describe.skip("IssuesRepository", () => {
  test("getAllIssues", async () => {
    const repository = new IssuesRepository(apiFactory);

    const issues = await repository.getAllIssues({ offset: 1, limit: 2 });

    expect(issues).toBeDefined();
    expect(issues.offset).toBe(1);
    expect(issues.limit).toBe(2);
  });

  test("getIssueDetail", async () => {
    const repository = new IssuesRepository(apiFactory);

    const issue = await repository.getIssueDetail(76473);

    expect(issue).toBeDefined();
    expect(issue.id).toBe(76473);
    expect(issue.subject.length).toBeGreaterThan(1);
  });
});
