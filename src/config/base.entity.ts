import { CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('identity')
  id: number;
  @CreateDateColumn({
    type: 'timestamp',
    name: 'fecha_creacion'
})
  fCreacion: Date;
    @CreateDateColumn({
    type: 'timestamp',
    name: 'fecha_mod'
})
  fModificacion: Date;

}