import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('list')
export class List {
  @PrimaryGeneratedColumn() id: number; //主键，自增

  @Column() category: string;
  @Column() grade: string;

  @Column() classname: string;
  @Column() description: string;

  @Column() photo: string;
  @Column() photoDownLink: string;
  @Column() photoWidth: number;
  @Column() photoHeight: number;
  @Column() photoType: string;

  @Column() panelimgurl: string | null;

  @CreateDateColumn({
    name: 'create_time',
    nullable: true,
  })
  createTime: Date;

  @UpdateDateColumn({
    name: 'update_time',
    nullable: true,
  })
  updateTime: Date | null;

  @DeleteDateColumn({
    name: 'delete_at',
    nullable: true,
  })
  deleteAt: Date | null;
}
