import { Entity,PrimaryGeneratedColumn,Column, BeforeInsert } from 'typeorm';
import { hashSync } from 'bcrypt'
@Entity({name:'users'})
export class UserEntity {

    @PrimaryGeneratedColumn('uuid')
    id:string;
    
    @Column({type:'varchar'})
    username:string;

    @Column({type:'varchar'})
    email:string;

    @Column({type:'varchar'})
    password:string;

    @BeforeInsert()
    handlePassword(){
        this.password = hashSync(this.password,10);
    }

}