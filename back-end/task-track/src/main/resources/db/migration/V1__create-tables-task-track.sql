create table projects(
                         id integer primary key,
                         name text,
                         description text,
                         created_at date,
                         created_by integer,
                         last_update_at date,
                         last_update_by integer
);


create table sprints(
                        id integer primary key,
                        id_project integer,
                        name text,
                        description text,
                        created_at date,
                        created_by integer,
                        last_update_at date,
                        last_update_by integer,

                        foreign key (id_project) references projects (id)
);

create table user_stories(
                             id integer primary key,
                             id_sprint integer,
                             title text,
                             description text,
                             story_order text,
                             created_at date,
                             created_by integer,
                             last_update_at date,
                             last_update_by integer,

                             foreign key (id_sprint) references sprints (id)
);

create table users(
                      id integer primary key,
                      name text,
                      email text,
                      password text,
                      role text
);

create table tasks(
                      id integer primary key,
                      id_user_story integer,
                      title text,
                      description text,
                      estimated_time real,
                      spent_time real,
                      task_order text,
                      id_responsible integer,
                      created_at date,
                      created_by integer,
                      last_update_at date,
                      last_update_by integer,

                      foreign key (id_user_story) references user_stories (id),
                      foreign key (id_responsible) references users (id)
);

create table project_user(
                             id_user integer,
                             id_project integer,
                             added_by date,
                             added_at date,

                             foreign key (id_user) references users (id),
                             foreign key (id_project) references projects (id)
)