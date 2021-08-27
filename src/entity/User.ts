import { isNonNullType, isNullableType } from "graphql";
import { ObjectType, Field } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  BaseEntity,
  OneToMany,
  AfterLoad,
  BeforeUpdate,
  BeforeInsert,
} from "typeorm";
import * as credential from 'credential';
import { Post } from "./Post";
// import { Updoot } from "./Updoot";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(()=>String)
  @Column({ unique: true }) 
  username!: string;

  @Field(()=>String)
  @Column({ unique: true })


  email!: string;

  @Field()
  @Column(()=>String)
  password!: string;


  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
  
}
