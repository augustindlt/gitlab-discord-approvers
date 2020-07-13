import { IProject } from "../../types/project";
import { compose, withProps } from "recompose";
import {
  withCurrentProjectId,
  IWithProjectIdProp
} from "./withCurrentProjectId.hoc";
import { withProjects, IWithProjectsProp } from "./withProjects.hoc";
import { withSetProjects, IWithSetProjectsProp } from "./withSetProjects.hoc";

export interface IWithCurrentProjectProp {
  project: IProject;
}

export const withCurrentProject = compose<IWithCurrentProjectProp, {}>(
  withCurrentProjectId,
  withProjects,
  withSetProjects,
  withProps<
    IWithCurrentProjectProp,
    IWithProjectIdProp & IWithProjectsProp & IWithSetProjectsProp
  >(props => {
    const project = props.projects[props.projectId];
    if (!project) {
      const projectToAdd = { id: props.projectId, approvers: [] };
      return { project: projectToAdd };
    }
    return { project };
  })
);
