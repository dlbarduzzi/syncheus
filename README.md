# Syncheus

<p>
  <a
    href="https://github.com/dlbarduzzi/syncheus/actions/workflows/test.yaml"
    target="_blank"
    rel="noopener"
  >
    <img
      src="https://github.com/dlbarduzzi/syncheus/actions/workflows/test.yaml/badge.svg"
      alt="test"
    />
  </a>
</p>

## Database

### Setup

Start postgres docker container.

```sh
docker compose up -d
```

Enter container in interactive mode.

```sh
docker exec -it __CONTAINER_NAME__ /bin/bash
```

Verify postgres version.

```sh
psql --version
```

Connect to database.

```sh
psql --host=localhost --dbname=testdb --username=testuser
```

Verify current user.

```sql
SELECT current_user;
```

### Migrations

Follow instructions to install the `migrate` tool [HERE](https://github.com/golang-migrate/migrate/tree/master/cmd/migrate).

Generate a pair of migration files. Visit the [migrations](./migrations) folder to see all the migration files and content.

```sh
migrate create -seq -ext=.sql -dir=./migrations create_users_table
```

Apply migrations.

```sh
# Create database connection url environment variable.
# export DB_CONNECTION_URL='postgres://testuser:testpass@127.0.0.1:5432/testdb?sslmode=disable'
migrate -path=./migrations -database=$DB_CONNECTION_URL up
```

Connect to the database, list and verify tables.

```sql
-- List tables
\dt

-- List schema_migrations table
SELECT * FROM schema_migrations;

-- View users table definition
\d users
```

## LICENSE

[MIT](./LICENSE)
