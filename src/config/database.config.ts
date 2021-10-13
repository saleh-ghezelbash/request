import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';


// database config for Mysql
export const mysqlConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'request',
    synchronize: false,
    //logging: false,
    entities: [join(__dirname, '/../**/**.entity{.ts,.js}')],
};

// database config for Oracle
export const oracleConfig: TypeOrmModuleOptions = {
    name: 'request',
    type: 'oracle',
    host: 'localhost',
    username: 'hosco',
    password: 'hosco',
    port: 1521,
    sid: 'XE',
    synchronize: false,
    logging: false,
    entities: [join(__dirname, '/../**/**.entity{.ts,.js}')],
};
