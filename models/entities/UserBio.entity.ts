import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable
} from "typeorm";
import { User } from "./User.entity";
import { Roles } from "./Roles.entity";

@Entity("user_bio")
export class UserBio {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "date" })
  dob: string;

  @Column({ type: "varchar", length: 20 })
  mobile: string;

  @Column({ type: "text" })
  address: string;

  @OneToOne(_ => User)
  @JoinColumn()
  user: User;

  @ManyToMany(_=>Roles,Roles=>Roles.role)
  @JoinTable()
  userRoles:Roles[]
}
