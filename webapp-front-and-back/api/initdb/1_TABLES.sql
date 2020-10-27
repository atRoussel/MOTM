create table answers (id bigint not null auto_increment, value bigint not null, question_id bigint not null, primary key (id)) engine=InnoDB;
create table comments (id bigint not null auto_increment, value varchar(255), survey_id bigint not null, primary key (id)) engine=InnoDB;
create table questions (id bigint not null auto_increment, text varchar(255), survey_id bigint, primary key (id)) engine=InnoDB;
create table surveys (id bigint auto_increment, description varchar(255), title varchar(255), primary key (id)) engine=InnoDB;
create table users (id bigint not null auto_increment, date varchar(255), mail varchar(255), name varchar(255), primary key (id)) engine=InnoDB;
create table users_surveys (user_id bigint not null, survey_id bigint not null) engine=InnoDB;
alter table answers add constraint FK3erw1a3t0r78st8ty27x6v3g1 foreign key (question_id) references questions (id);
alter table comments add constraint FKufkhjafheycxsyfih634v5f0 foreign key (survey_id) references surveys (id);
alter table questions add constraint FKnf38uiy78c0g0tmo68btk3y0p foreign key (survey_id) references surveys (id);
alter table users_surveys add constraint FKd9mp10dhxtyhetf3j6u5s6m3y foreign key (survey_id) references surveys (id);
alter table users_surveys add constraint FKeopmks0b11k8cde0vnpkejrgq foreign key (user_id) references users (id);
