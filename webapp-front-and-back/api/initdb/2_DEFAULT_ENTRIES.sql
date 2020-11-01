INSERT INTO defaultdb.users (id, name, mail, date) VALUES (1, 'Patrick', 'admin@gmail.com', '2000-12-01');
INSERT INTO defaultdb.users (id, name, mail, date) VALUES (2, 'Abel Auboisdormant', 'aubois@gmail.com', '2000-12-01');
INSERT INTO defaultdb.users (id, name, mail, date) VALUES (3, 'Barack Afritt', 'lesfrites@gmail.com', '2000-12-01');
INSERT INTO defaultdb.users (id, name, mail, date) VALUES (4, 'Camille Onette', 'onette@gmail.com', '2000-12-01');
INSERT INTO defaultdb.users (id, name, mail, date) VALUES (5, 'Adam Troijours', 'adamajustice@gmail.com', '2000-12-01');
INSERT INTO defaultdb.users (id, name, mail, date) VALUES (6, 'Barbara Dégout', 'degout@gmail.com', '2000-12-01');
INSERT INTO defaultdb.users (id, name, mail, date) VALUES (7, 'Camille Zole', 'xxwriorrxx@gmail.com', '2000-12-01');
INSERT INTO defaultdb.users (id, name, mail, date) VALUES (8, 'Adémar Monoto', 'tki@gmail.com', '2000-12-01');
INSERT INTO defaultdb.users (id, name, mail, date) VALUES (9, 'Eddy Scylla', 'savatwa@gmail.com', '2000-12-01');
INSERT INTO defaultdb.users (id, name, mail, date) VALUES (10, 'Sacha Touille', 'jesus@gmail.com','2000-12-01');
INSERT INTO defaultdb.users (id, name, mail, date) VALUES (11, 'Athénaïs Roussel', 'athenaisroussel@gmail.com','1999-02-23');
INSERT INTO defaultdb.users (id, name, mail, date) VALUES (12, 'Lucas Drencevic', 'shadd412@gmail.com','1998-06-04');
INSERT INTO defaultdb.users (id, name, mail, date) VALUES (13, 'Dimitri Bernadine', 'dimdimfabulousdim@gmail.com','1998-06-04');

INSERT INTO defaultdb.surveys (id, description, title) VALUES (1, 'Sentiments sur le mois d\'août', 'Sondage du mois d\'Août');
INSERT INTO defaultdb.surveys (id, description, title) VALUES (2, 'C\'est la rentrée, dans quel mood êtes-vous?', 'Sondage de Septembre');
INSERT INTO defaultdb.surveys (id, description, title) VALUES (3, 'Octobre est là, début du reconfinement', 'Sondage d\'Octobre');

INSERT INTO defaultdb.questions (id, text, survey_id) VALUES (1, 'Évaluez votre sentiment général', 1);
INSERT INTO defaultdb.questions (id, text, survey_id) VALUES (2, 'Comment avez-vous ressenti la charge de travail ?', 1);
INSERT INTO defaultdb.questions (id, text, survey_id) VALUES (3, 'Notez la présentation de début d\'année', 1);
INSERT INTO defaultdb.questions (id, text, survey_id) VALUES (4, 'Votre état d\'esprit sur le mois', 2);
INSERT INTO defaultdb.questions (id, text, survey_id) VALUES (5, 'Votre mood du mois', 3);
INSERT INTO defaultdb.questions (id, text, survey_id) VALUES (6, 'Que pensez vous de la cantine ?', 3);
INSERT INTO defaultdb.questions (id, text, survey_id) VALUES (7, 'Comment ça va ?', 3);
INSERT INTO defaultdb.questions (id, text, survey_id) VALUES (8, 'Comment trouvez vous l\'EPF ?', 3);

INSERT INTO defaultdb.comments (id, value, survey_id, user_id) VALUES (1, 'J\'aime le mois d\'août si fort !', 1, 4);
INSERT INTO defaultdb.comments (id, value, survey_id, user_id) VALUES (2, 'Incroyable', 1, 10);
INSERT INTO defaultdb.comments (id, value, survey_id, user_id) VALUES (3, 'Quel mois éblouissant', 1, 7);
INSERT INTO defaultdb.comments (id, value, survey_id, user_id) VALUES (5, 'Moyen', 2, 4);
INSERT INTO defaultdb.comments (id, value, survey_id, user_id) VALUES (6, 'J\'ai pas trop aimé', 2, 8);
INSERT INTO defaultdb.comments (id, value, survey_id, user_id) VALUES (7, 'C\'etait fou', 3, 10);
INSERT INTO defaultdb.comments (id, value, survey_id, user_id) VALUES (8, 'Meilleur mois de ma vie', 3, 7);
INSERT INTO defaultdb.comments (id, value, survey_id, user_id) VALUES (9, 'Plutôt bof', 3, 6);
INSERT INTO defaultdb.comments (id, value, survey_id, user_id) VALUES (10, 'Je suis si heureux d\'etre dans cette entreprise', 3, 8);
INSERT INTO defaultdb.comments (id, value, survey_id, user_id) VALUES (11, 'Quel mois épatant !', 3, 9);
INSERT INTO defaultdb.comments (id, value, survey_id, user_id) VALUES (12, 'Tout est merveilleux', 3, 12);

INSERT INTO defaultdb.answers (id, value, question_id, user_id) VALUES (1, 4, 1, 4);
INSERT INTO defaultdb.answers (id, value, question_id, user_id) VALUES (2, 3, 2, 4);
INSERT INTO defaultdb.answers (id, value, question_id, user_id) VALUES (3, 5, 3, 4);
INSERT INTO defaultdb.answers (id, value, question_id, user_id) VALUES (4, 5, 1, 10);
INSERT INTO defaultdb.answers (id, value, question_id, user_id) VALUES (5, 2, 2, 10);
INSERT INTO defaultdb.answers (id, value, question_id, user_id) VALUES (6, 4, 3, 10);
INSERT INTO defaultdb.answers (id, value, question_id, user_id) VALUES (7, 4, 1, 7);
INSERT INTO defaultdb.answers (id, value, question_id, user_id) VALUES (8, 3, 2, 7);
INSERT INTO defaultdb.answers (id, value, question_id, user_id) VALUES (9, 3, 3, 7);
INSERT INTO defaultdb.answers (id, value, question_id, user_id) VALUES (10, 3, 4, 4);
INSERT INTO defaultdb.answers (id, value, question_id, user_id) VALUES (11, 3, 4, 8);
INSERT INTO defaultdb.answers (id, value, question_id, user_id) VALUES (12, 5, 5, 10);
INSERT INTO defaultdb.answers (id, value, question_id, user_id) VALUES (13, 2, 6, 10);
INSERT INTO defaultdb.answers (id, value, question_id, user_id) VALUES (14, 1, 7, 10);
INSERT INTO defaultdb.answers (id, value, question_id, user_id) VALUES (15, 5, 8, 10);
INSERT INTO defaultdb.answers (id, value, question_id, user_id) VALUES (16, 5, 5, 7);
INSERT INTO defaultdb.answers (id, value, question_id, user_id) VALUES (17, 2, 6, 7);
INSERT INTO defaultdb.answers (id, value, question_id, user_id) VALUES (18, 2, 7, 7);
INSERT INTO defaultdb.answers (id, value, question_id, user_id) VALUES (19, 5, 8, 7);
INSERT INTO defaultdb.answers (id, value, question_id, user_id) VALUES (20, 3, 5, 6);
INSERT INTO defaultdb.answers (id, value, question_id, user_id) VALUES (21, 3, 6, 6);
INSERT INTO defaultdb.answers (id, value, question_id, user_id) VALUES (22, 3, 7, 6);
INSERT INTO defaultdb.answers (id, value, question_id, user_id) VALUES (23, 5, 8, 6);
INSERT INTO defaultdb.answers (id, value, question_id, user_id) VALUES (24, 4, 5, 8);
INSERT INTO defaultdb.answers (id, value, question_id, user_id) VALUES (25, 3, 6, 8);
INSERT INTO defaultdb.answers (id, value, question_id, user_id) VALUES (26, 4, 7, 8);
INSERT INTO defaultdb.answers (id, value, question_id, user_id) VALUES (27, 5, 8, 8);
INSERT INTO defaultdb.answers (id, value, question_id, user_id) VALUES (28, 5, 5, 9);
INSERT INTO defaultdb.answers (id, value, question_id, user_id) VALUES (29, 3, 6, 9);
INSERT INTO defaultdb.answers (id, value, question_id, user_id) VALUES (30, 3, 7, 9);
INSERT INTO defaultdb.answers (id, value, question_id, user_id) VALUES (31, 5, 8, 9);
INSERT INTO defaultdb.answers (id, value, question_id, user_id) VALUES (32, 5, 5, 12);
INSERT INTO defaultdb.answers (id, value, question_id, user_id) VALUES (33, 1, 6, 12);
INSERT INTO defaultdb.answers (id, value, question_id, user_id) VALUES (34, 4, 7, 12);
INSERT INTO defaultdb.answers (id, value, question_id, user_id) VALUES (35, 5, 8, 12);
