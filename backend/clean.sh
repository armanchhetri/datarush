#!/bin/sh
SQL = ./sql_app.db
if test -f "$SQL"; then
    rm $SQL
fi
alembic upgrade head