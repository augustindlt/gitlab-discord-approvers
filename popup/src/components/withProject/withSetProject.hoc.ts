import { IProject } from "../../types/project";
import { compose, withProps } from "recompose";
import { withProjects, IWithProjectsProp } from "./withProjects.hoc";
import { withSetProjects, IWithSetProjectsProp } from "./withSetProjects.hoc";

export interface IWithSetProjectProp {
  setProject: (project: IProject) => void;
}
export const withSetProject = compose<IWithSetProjectProp, {}>(
  withProjects,
  withSetProjects,
  withProps<IWithSetProjectProp, IWithProjectsProp & IWithSetProjectsProp>(
    props => ({
      setProject: project => {
        props.setProjects({ ...props.projects, [project.id]: project });
      }
    })
  )
);
