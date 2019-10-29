import "reflect-metadata";
import { createConnection } from "typeorm";

import { server } from "./server";
import { User } from "./models/entities/User.entity";

createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "admin",
    password: "Tvisha@123",
    database: "type_orm_1",
    entities: [
        __dirname+"/models/entities"+"/*.entity.ts"
    ],
    synchronize: true,
    logging: true
}).then(conn => {
  server.listen(9000, (err: any) => {
    console.log("listening on port : ", 9000);
  });
});
