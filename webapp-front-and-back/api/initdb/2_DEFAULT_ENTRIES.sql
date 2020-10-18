INSERT INTO defaultdb.users (user_id, user_name, user_email, user_date) VALUES (1, 'Paul', 'Harrohide', '01/01/2020');
INSERT INTO defaultdb.users (user_id, user_name, user_email, user_date) VALUES (2, 'Harry', 'Covert', '01/01/2020');
INSERT INTO defaultdb.users (user_id, user_name, user_email, user_date) VALUES (3, 'Alain', 'Posteur', '01/01/2020');
INSERT INTO defaultdb.users (user_id, user_name, user_email, user_date) VALUES (4, 'Elvire', 'Debord', '01/01/2020');
INSERT INTO defaultdb.users (user_id, user_name, user_email, user_date) VALUES (5, 'Laurent', 'Barre', '01/01/2020');
INSERT INTO defaultdb.users (user_id, user_name, user_email, user_date) VALUES (6, 'Homer', 'Cipourtoux', '01/01/2020');
INSERT INTO defaultdb.users (user_id, user_name, user_email, user_date) VALUES (7, 'Gaston', 'Laplouz', '01/01/2020');
INSERT INTO defaultdb.users (user_id, user_name, user_email, user_date) VALUES (8, 'Gisèle', 'Detable', '01/01/2020');
INSERT INTO defaultdb.users (user_id, user_name, user_email, user_date) VALUES (9, 'Thomas', 'Ouaque', '01/01/2020');
INSERT INTO defaultdb.users (user_id, user_name, user_email, user_date) VALUES (10, 'Sacha', 'Telfriz','01/01/2020');

INSERT INTO defaultdb.surveys(survey_id, survey_description, survey_title) VALUES (1, 'Mon premier MOTM', 'MOTM de Noël');
INSERT INTO defaultdb.surveys(survey_id, survey_description, survey_title) VALUES (2, 'Un deuxième pour la route', 'MOTM du Nouvel An');

INSERT INTO defaultdb.users_surveys(user_id, survey_id) VALUES (3,1);

INSERT INTO defaultdb.questions(question_id, question_text, survey_id) VALUES (1, 'Comment allez-vous ce mois ci ?',1);
INSERT INTO defaultdb.questions(question_id, question_text, survey_id) VALUES (2, 'Etes-vous satisfait de votre travail ?',1);

INSERT INTO defaultdb.comments(comment_id, comment_value, survey_id) VALUES (1, 'Le soleil brille ! ',1);

INSERT INTO defaultdb.answers(answer_id, answer_value, question_id) VALUES (1,'Satisfait',1);
