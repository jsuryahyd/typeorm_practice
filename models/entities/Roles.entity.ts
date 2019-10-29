import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { User } from "./User.entity";

@Entity("role_definitions")
export class Roles {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "varchar", length: 30, unique: true })
  role_label: string;

  @Column({ type: "tinyint", unique: true })
  role: number;

  @ManyToMany(_=>User)
  userRoles:User[]
}
