import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(3000);

}
bootstrap();

const mysql = require('mysql');
const MySQLEvents = require('@rodrigogs/mysql-events');

const program = async () => {
    const connection = mysql.createConnection(
        {host: 'localhost', user: 'root', password: 'root'}
    );

    const instance = new MySQLEvents(connection, {
        startAtEnd: true,
    });

    await instance.start();

    instance.addTrigger({
        name: 'TEST',
        expression: 'test.cat',
        statement: MySQLEvents.STATEMENTS.ALL,
        onEvent: (event) => { // You will receive the events here
            if (event.schema === 'test' && event.table == 'cat') {
                if (event.type == 'INSERT') {
                    console.log('test 스키마에 cat 테이블에 데이터가 INSERT되었습니다.');
                    const {affectedRows} = event;
                    const id = affectedRows[0].after.id;
                    connection.query(
                        `INSERT INTO test.COPY (name, age, breed, isActive ) SELECT name, age, breed, isActive FROM test.CAT WHERE id = ${id}`,
                        (error, results) => {
                            if (error) {
                                console.log("ERROR!!!!!!!")
                                console.error(error);
                            } else 
                                console.log("copy 성공");
                            }
                        )
                }
                if (event.type == 'DELETE') {
                    console.log('test 스키마에 cat 테이블에 데이터가 DELETE되었습니다.');
                }
            }
        }
    });
};

program()
