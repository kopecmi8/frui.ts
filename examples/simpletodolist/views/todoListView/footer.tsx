import { ViewComponent } from "@frui.ts/views";
import { observer } from "mobx-react-lite";
import * as React from "React";
import TodoListViewModel from "../../viewModels/todoListViewModel";
import { pluralize } from "../helpers";

const Footer: ViewComponent<TodoListViewModel> = observer(({ vm }) => {
  const getFilterClass = (filter: string) => (vm.filter === filter ? "selected" : undefined);

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{vm.totalIncomplete}</strong> {pluralize(vm.totalIncomplete, "item")} left
      </span>

      <ul className="filters">
        <li>
          <a className={getFilterClass("all")} href="#" onClick={vm.showAll}>
            All
          </a>
        </li>
        <li>
          <a className={getFilterClass("incomplete")} href="#/active" onClick={vm.showIncomplete}>
            Active
          </a>
        </li>
        <li>
          <a className={getFilterClass("complete")} href="#/active" onClick={vm.showComplete}>
            Completed
          </a>
        </li>
      </ul>
      {vm.canDeleteCompleted && (
        <button className="clear-completed" onClick={vm.deleteCompleted}>
          Clear completed
        </button>
      )}
    </footer>
  );
});

export default Footer;
