import { Entity,PrimaryGeneratedColumn,Column } from 'typeorm';

@Entity({name:'movies'})
export class MovieEntity {

    @PrimaryGeneratedColumn('uuid')
    id:string;
    
    @Column({type:'varchar'})
    title:string;

    @Column({type:'varchar'})
    description:string;

    @Column({type:'varchar'})
    genre:string;

    @Column({type:'int'})
    year:number

}