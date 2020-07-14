import { IProject, TProjectsStatus } from "../../types/project";
import { compose, withProps } from "recompose";
import {
  withCurrentProjectId,
  IWithProjectIdProp,
} from "./withCurrentProjectId.hoc";
import { withProjects, IWithProjectsProp } from "./withProjects.hoc";
import { withSetProjects, IWithSetProjectsProp } from "./withSetProjects.hoc";

export interface IWithCurrentProjectProp {
  project: IProject;
  projectStatus: TProjectsStatus;
}

export const withCurrentProject = compose<IWithCurrentProjectProp, {}>(
  withCurrentProjectId,
  withProjects,
  withSetProjects,
  withProps<
    IWithCurrentProjectProp,
    IWithProjectIdProp & IWithProjectsProp & IWithSetProjectsProp
  >((props) => {
    const project = props.projects[props.projectId];
    const projectStatus =
      props.projectIdStatus === "loading" || props.projectsStatus === "loading"
        ? "loading"
        : "fetched";

    if (!project) {
      const projectToAdd = { id: props.projectId, approvers: [] };
      return { project: projectToAdd, projectStatus };
    }
    return { project, projectStatus };
  })
);
