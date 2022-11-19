import { Injectable } from '@nestjs/common';
import { dbPool } from '@db';
import { throwError } from 'src/shared/helpers';
import { v4 } from 'uuid';
import bcrypt from 'bcryptjs';

import { User, userTableName, userTableValues } from '../models';

@Injectable()
export class UsersService {
  private readonly db = dbPool;

  async findOne(userId: string): Promise<User> {
    try {
      const query = `
      SELECT id, name, email 
      FROM ${userTableName} 
      WHERE id = $1
      ;`;
      const values = [userId];

      const { rows: res } = await this.db.query(query, values);
      return res;
    } catch (e) {
      throwError(e, 502);
    }
  }

  async createOne(data: User): Promise<string> {
    try {
      const { name, email } = data;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(data.password, salt);
      const id = v4();

      const query = `
      INSERT INTO ${userTableName}(${userTableValues})
      VALUES ($1, $2, $3, $4);
      `;
      const values = [id, name, email, hashedPassword];

      await this.db.query(query, values);

      return id;
    } catch (e) {
      throwError(e, 502);
    }
  }

  test() {
    console.log('HELLO! DASDKASKJDASJKDJHADL')
  }
}
