import { compose } from "recompose";
import {
  withCurrentProject,
  IWithCurrentProjectProp,
  IWithSetProjectProp,
  withSetProject,
} from "../withProject";
import { ImportExport, IProps } from "./ImportExport.component";

interface IConnectedProps
  extends IWithCurrentProjectProp,
    IWithSetProjectProp,
    IProps {}

export default compose<IProps, {}>(
  withCurrentProject,
  withSetProject
)(ImportExport);
