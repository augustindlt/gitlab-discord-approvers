import { IApprover } from "./types";

export const renderApproveButton = ({ onClick }: { onClick: () => void }) => {
  const button = document.createElement("button");
  button.className = "btn btn-sm btn-success";
  button.innerText = "Approve";
  button.onclick = onClick;
  return button;
};

export const renderDisapproveButton = ({
  onClick
}: {
  onClick: () => void;
}) => {
  const button = document.createElement("button");
  button.className = "btn btn-sm btn-danger";
  button.innerText = "Disapprove";
  button.onclick = onClick;
  return button;
};

export const renderApproverSelect = ({
  onApproverSelected,
  approvers
}: {
  onApproverSelected: (selectedApprover: IApprover) => void;
  approvers: IApprover[];
}) => {
  const select = document.createElement("select");
  type TOptionParams = {
    label: string;
    value: string;
    disabled?: boolean;
    selected?: boolean;
  };
  const renderOption = ({
    label,
    value,
    disabled,
    selected
  }: TOptionParams) => {
    const option = document.createElement("option");
    option.innerText = label;
    option.value = value;
    option.disabled = disabled;
    option.selected = selected;
    return option;
  };
  select.append(
    renderOption({
      label: "Select your approver",
      value: "",
      disabled: true,
      selected: true
    })
  );

  approvers.forEach(approver => {
    select.append(
      renderOption({
        label: approver.name,
        value: approver.id
      })
    );
  });

  select.onchange = () => {
    const approver = approvers.find(approver => approver.id === select.value);
    onApproverSelected(approver);
  };

  return select;
};

export const renderWaitingApprovalMessage = () => {
  const p = document.createElement("p");
  p.innerText = "Waiting for approval...";
  return p;
};

export const renderWaitingApprovalRefusedMessage = () => {
  const p = document.createElement("p");
  p.innerText = "Make changes to be approved...";
  return p;
};

export const renderApproverRefusedMessage = () => {
  const p = document.createElement("p");
  p.innerText = "You disapproved this merge request";
  return p;
};
