import { compose, withState, withProps, lifecycle } from "recompose";
import {
  withCurrentProject,
  IWithCurrentProjectProp,
  IWithSetProjectProp,
  withSetProject,
  withProjects
} from "../../components/withProject";
import { Project, IProps } from "./Project.component";

interface IConnectedProps
  extends IWithCurrentProjectProp,
    IWithSetProjectProp,
    IProps {}

export default compose<IProps, {}>(
  withProjects,
  withCurrentProject,
  withSetProject,
  withState(
    "activated",
    "onActivate",
    (props: IConnectedProps) => props.project.activated
  ),
  lifecycle<IConnectedProps, {}>({
    componentDidUpdate(prevProps) {
      if (
        prevProps.activated === undefined &&
        this.props.project.activated !== undefined
      )
        this.props.onActivate(this.props.project.activated!);
    }
  }),
  withProps((props: IConnectedProps) => ({
    onActivate: (activated: boolean) => {
      props.onActivate(activated);
      props.setProject({ ...props.project, activated });
    }
  }))
)(Project);
