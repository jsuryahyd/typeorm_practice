import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { UserBio } from "./UserBio.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100 })
  name: string;

  @Column({ type: "varchar", length: 255 })
  email: string;

  @Column({ default: false })
  verified: boolean;

  @OneToOne(_ => UserBio, userBio => userBio.user, { cascade: ['insert','update','remove'] })
  userBio: UserBio;
}
