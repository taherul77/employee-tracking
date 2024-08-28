// src/components/TableComponents/ColumnRenderers.js

import { Checkbox } from "@/components/Ui/checkbox";
import DataTableColumnHeader from "./DataTableColumnHeader";
import { Badge } from "@/components/Ui/badge";
import DataTableRowActions from "./DataTableRowActions";

const labels = [
  { value: 'label1', label: 'Label 1' },
  { value: 'label2', label: 'Label 2' },
];

const statuses = [
  { value: 'status1', label: 'Status 1', icon: null },
  { value: 'status2', label: 'Status 2', icon: null },
];

const priorities = [
  { value: 'priority1', label: 'Priority 1', icon: null },
  { value: 'priority2', label: 'Priority 2', icon: null },
];

export const SelectHeader = (props) => {
  return (
    <Checkbox
      checked={
        props.table.getIsAllPageRowsSelected() ||
        (props.table.getIsSomePageRowsSelected() && "indeterminate")
      }
      onCheckedChange={(value) => props.table.toggleAllPageRowsSelected(!!value)}
      aria-label="Select all"
      className="translate-y-[2px]"
    />
  );
};

export const SelectCell = (props) => (
  <Checkbox
    checked={props.row.getIsSelected()}
    onCheckedChange={(value) => props.row.toggleSelected(!!value)}
    aria-label="Select row"
    className="translate-y-[2px]"
  />
);

export const IdHeader = (props) => <DataTableColumnHeader column={props.column} title="Task" />;

export const IdCell = (props) => <div className="w-[80px]">{props.row.getValue("id")}</div>;

export const TitleHeader = (props) => <DataTableColumnHeader column={props.column} title="Title" />;

export const TitleCell = (props) => {
  const label = labels.find((label) => label.value === props.row.original.label);
  return (
    <div className="flex space-x-2">
      {label && <Badge variant="outline">{label.label}</Badge>}
      <span className="max-w-[500px] truncate font-medium">
        {props.row.getValue("title")}
      </span>
    </div>
  );
};

export const StatusHeader = (props) => <DataTableColumnHeader column={props.column} title="Status" />;

export const StatusCell = (props) => {
  const status = statuses.find(
    (status) => status.value === props.row.getValue("status")
  );
  if (!status) return null;
  return (
    <div className="flex w-[100px] items-center">
      {status.icon && (
        <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
      )}
      <span>{status.label}</span>
    </div>
  );
};

export const PriorityHeader = (props) => <DataTableColumnHeader column={props.column} title="Priority" />;

export const PriorityCell = (props) => {
  const priority = priorities.find(
    (priority) => priority.value === props.row.getValue("priority")
  );
  if (!priority) return null;
  return (
    <div className="flex items-center">
      {priority.icon && (
        <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
      )}
      <span>{priority.label}</span>
    </div>
  );
};

export const ActionsCell = (props) => <DataTableRowActions row={props.row} />;
