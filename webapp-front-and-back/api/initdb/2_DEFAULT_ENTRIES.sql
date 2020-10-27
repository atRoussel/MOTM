INSERT INTO defaultdb.users (id, name, mail, date) VALUES (1, 'Paul', 'Harrohide@gmail.com', '01/01/2020');
INSERT INTO defaultdb.users (id, name, mail, date) VALUES (2, 'Harry', 'Covert@gmail.com', '01/01/2020');
INSERT INTO defaultdb.users (id, name, mail, date) VALUES (3, 'Alain', 'Posteur@gmail.com', '01/01/2020');
INSERT INTO defaultdb.users (id, name, mail, date) VALUES (4, 'Elvire', 'Debord@gmail.com', '01/01/2020');
INSERT INTO defaultdb.users (id, name, mail, date) VALUES (5, 'Laurent', 'Barre@gmail.com', '01/01/2020');
INSERT INTO defaultdb.users (id, name, mail, date) VALUES (6, 'Homer', 'Cipourtoux@gmail.com', '01/01/2020');
INSERT INTO defaultdb.users (id, name, mail, date) VALUES (7, 'Gaston', 'Laplouz@gmail.com', '01/01/2020');
INSERT INTO defaultdb.users (id, name, mail, date) VALUES (8, 'Gisèle', 'Detable@gmail.com', '01/01/2020');
INSERT INTO defaultdb.users (id, name, mail, date) VALUES (9, 'Thomas', 'Ouaque@gmail.com', '01/01/2020');
INSERT INTO defaultdb.users (id, name, mail, date) VALUES (10, 'Sacha', 'Telfriz@gmail.com','01/01/2020');
INSERT INTO defaultdb.users (id, name, mail, date) VALUES (11, 'Patrick', 'admin@gmail.com','01/01/2020');

INSERT INTO defaultdb.surveys(id, description, title) VALUES (1, 'Mon premier MOTM', 'MOTM de Noël');
INSERT INTO defaultdb.surveys(id, description, title) VALUES (2, 'Un deuxième pour la route', 'MOTM du Nouvel An');

INSERT INTO defaultdb.users_surveys(user_id, survey_id) VALUES (3,1);

INSERT INTO defaultdb.questions(id, text, survey_id) VALUES (1, 'Comment allez-vous ce mois ci ?',1);
INSERT INTO defaultdb.questions(id, text, survey_id) VALUES (2, 'Etes-vous satisfait de votre travail ?',1);
INSERT INTO defaultdb.questions(id, text, survey_id) VALUES (3, 'T ou ?',2);

INSERT INTO defaultdb.comments(id, value, survey_id) VALUES (1, 'Le soleil brille ! ',1);

INSERT INTO defaultdb.answers(id, value, question_id) VALUES (1,2,1);
