import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '../entities/users.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserDTO, UserUpdateDTO } from '../dto/user.dto';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class UsersService {
  /**
   * inyectamos el repository en el service. 
   */
  constructor(
    @InjectRepository(UsersEntity) private readonly userRepository: Repository<UsersEntity>
  ) { }
  

  public async createUser(body: UserDTO): Promise<UsersEntity> {
    try {
      return await this.userRepository.save(body);
    } catch (error) {
      throw new Error(error)
    }
  }

  public async findUsers(body: UserDTO): Promise<UsersEntity[]> {
    try {
      const users: UsersEntity[] = await this.userRepository.find();
      if (users.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se han encontrado resultados'
        })
      }
      return users;
    } catch (error) {
      throw new ErrorManager.createSignatureError(error.message);
    }
    
  }


  public async findUserById(id: number): Promise<UsersEntity> {
    try {
      const user: UsersEntity = await this.userRepository.createQueryBuilder('user').where({ id }).getOne();
       if (!user) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se ha encontrado resultado'
        })
      }
      return user;
    } catch (error) {
      throw new ErrorManager.createSignatureError(error.message);
    }
    
  }

  
  public async updateUser(body: UserUpdateDTO, id: number): Promise<UpdateResult>  {
    try {
      const user: UpdateResult = await this.userRepository.update(id, body);

      // si el usuario no sufrio modificaciones
      if (user.affected === 0) {
         throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo actualizar'
        })
      }
      return user
    } catch (error) {
      throw new ErrorManager.createSignatureError(error.message);
    }
  }

   public async deleteUser(id: number): Promise<DeleteResult>  {
    try {
      const user: DeleteResult = await this.userRepository.delete(id);

      // si el usuario no sufrio modificaciones
      if (user.affected === 0) {
                 throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo actualizar'
        })
      }
      return user
    } catch (error) {
      throw new ErrorManager.createSignatureError(error.message);
    }
  }
  }

