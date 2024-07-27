import { BaseEntity } from "../../config/base.entity";
import { ACCESS_LEVEL } from "../../constants/roles";
import { Column, Entity, ManyToMany, ManyToOne } from "typeorm";
import { UsersEntity } from "./users.entity";
import { ProjectsEntity } from "../../projects/entities/projects.entity";

@Entity({name: 'user_project'})
export class UsersProjectsEntity extends BaseEntity {
  @Column({ type: 'enum', enum: ACCESS_LEVEL })
  accessLevel: ACCESS_LEVEL;
  @ManyToOne(() => UsersEntity, (user) => user.projectIncludes)
  user: UsersEntity;
  @ManyToOne(() => ProjectsEntity, (project) => project.usersInclude)
  project: ProjectsEntity;
}