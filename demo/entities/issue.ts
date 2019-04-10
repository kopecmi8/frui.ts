import { ItemLink } from "./itemLink";
import { IPageInfo } from "./pageInfo";

export interface Issue {
  id: number;
  project: ItemLink;
  tracker: ItemLink;
  status: ItemLink;
  priority: ItemLink;
  author: ItemLink;
  assigned_to: ItemLink;
  subject: string;
  description: string;
  start_date: Date;
  done_ratio: 0;
  created_on: Date;
  updated_on: Date;
}

export interface IssuesQuery extends IPageInfo {
  issues: Issue[];
}
