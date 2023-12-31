import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PaymentMethod, TypeOperation } from '../types';
import { Category } from 'src/categories/entities/category.entity';
import { User } from 'src/user/entities/user.entity';
import { Subcategory } from 'src/subcategories/entities/subcategory.entity';
import { CreditCard } from 'src/user/entities/creditCard.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: TypeOperation })
  type: TypeOperation;

  @Column({ type: 'enum', enum: PaymentMethod })
  paymentMethod: PaymentMethod;

  @Column()
  amount: number;

  @Column({ nullable: true })
  recipient: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Category, (category) => category.transaction)
  category: Category;

  @ManyToOne(() => Subcategory, (subcategory) => subcategory.transaction, { nullable: true })
  subcategory: Subcategory;

  @ManyToOne(() => User, (user) => user.transactions, {onDelete: 'CASCADE'})
  user: User;

  @ManyToOne(() => CreditCard,creditCard => creditCard.transactions, {nullable: true, onDelete: 'CASCADE'})
  creditCard: CreditCard

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
