
cso2-users-service
==================

User service for a Nexon's Counter-Strike: Online 2 master server written in Typescript on top of NodeJS.

You can find the `docker-compose` scripts used to run this in [cso2-master-services](https://github.com/Ochii/cso2-master-services).

Building
--------

After downloading the source code, go to a terminal instance, inside the source code's directory and:

```sh
npm install # installs the required dependencies
gulp build # builds the service
```

Starting the service
--------------------

You can start the user service with:

```sh
# environment variables
export USERS_PORT=30100 # tells the service to host on port 30100
export DB_HOST=127.0.0.1 # the host's database to connect
export DB_PORT=27017 # the host's database port to connect
export DB_NAME=cso2 # the database's name

# starts the service
node dist/service.js
```

You **must** set those environment variables, or the service will not start.

Testing the service
-------------------

You can test the service by running:

```sh
# environment variables
export USERS_PORT=30100 # tells the service to host on port 30100
export DB_HOST=127.0.0.1 # the host's database to connect
export DB_PORT=27017 # the host's database port to connect
export DB_NAME=cso2 # the database's name

# tests the service
gulp test
```

Pull requests
-------------

Pull requests are very much welcome.

Please read the [contributing guide](https://github.com/Ochii/cso2-users-service/blob/master/.github/PULL_REQUEST_TEMPLATE.md) before contributing.

License
-------

Read `LICENSE` for the project's license information.

This project is not affiliated with either Valve or Nexon. Counter-Strike: Online 2 is owned by these companies.

## Index

### External modules

* ["entities/sessionnetworkinfo"](modules/_entities_sessionnetworkinfo_.md)
* ["entities/user"](modules/_entities_user_.md)
* ["entities/usersession"](modules/_entities_usersession_.md)
* ["entities/uservars"](modules/_entities_uservars_.md)
* ["hash"](modules/_hash_.md)
* ["log/loginstance"](modules/_log_loginstance_.md)
* ["log/morgan2winston"](modules/_log_morgan2winston_.md)
* ["routes/users"](modules/_routes_users_.md)
* ["service"](modules/_service_.md)
* ["serviceinstance"](modules/_serviceinstance_.md)

---

