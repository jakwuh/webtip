Creating `docker-compose` files for running `mysql` & `mongo` with GUI took some time. So I've decided to expose configs and leave here for future references:

#### MongoDB

Config:

```yml
# mongo-compose.yml
version: '3.1'

services:
    mongo:
        image: mongo
        ports:
            - 27017:27017

    mongo_gui:
        image: mongo-express
        ports:
            - 8081:8081
```

Command:

```bash
docker-compose -f ./mongo-compose.yml up
```

MongoDB server is exposed at `localhost:27017`.  
GUI is available at `localhost:8081`.

#### Mysql

Config:

```yml
# mysql-compose.yml
version: '3.1'

services:
    db:
        image: mysql
        ports:
            - 3306:3306
        environment:
            MYSQL_ROOT_PASSWORD: admin

    mysql_gui:
        image: phpmyadmin/phpmyadmin
        ports:
            - 8080:80
```

Command:

```bash
docker-compose -f ./mysql-compose.yml up
```

MySQL server is exposed at `localhost:3306`.  
GUI is available at `localhost:8080`.

![phpmyadmin](./phpmyadmin.png)
