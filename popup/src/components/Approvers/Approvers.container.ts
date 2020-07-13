import { compose, withState, withProps, lifecycle } from "recompose";
import {
  withCurrentProject,
  IWithCurrentProjectProp,
  IWithSetProjectProp,
  withSetProject
} from "../../components/withProject";
import { Approvers, IProps } from "./Approvers.component";
import { IApprover } from "../../types/approver";

interface IConnectedProps
  extends IWithCurrentProjectProp,
    IWithSetProjectProp,
    IProps {}

export default compose<IProps, {}>(
  withCurrentProject,
  withSetProject,
  withState(
    "approvers",
    "onChangeApprovers",
    (props: IConnectedProps) => props.project.approvers
  ),
  lifecycle<IConnectedProps, {}>({
    componentDidUpdate(prevProps) {
      if (
        prevProps.approvers.length === 0 &&
        this.props.project.approvers.length !== 0
      )
        this.props.onChangeApprovers(this.props.project.approvers!);
    }
  }),
  withProps((props: IConnectedProps) => ({
    onChangeApprovers: (approvers: IApprover[]) => {
      props.onChangeApprovers(approvers);
      props.setProject({ ...props.project, approvers });
    }
  }))
)(Approvers);
