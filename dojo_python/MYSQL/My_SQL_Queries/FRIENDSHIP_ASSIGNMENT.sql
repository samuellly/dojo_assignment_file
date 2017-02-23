use friendship:
INSERT INTO users (first_name,last_name,created_at,updated_at) VALUES('Ian','Tsueng',now(),now());
INSERT INTO users (first_name,last_name,created_at,updated_at) VALUES('Jace''Yoon',now(),now());
INSERT INTO users (first_name,last_name,created_at,updated_at) VALUES('Taylor''Krusen',now(),now());
INSERT INTO users (first_name,last_name,created_at,updated_at) VALUES('Sam''Hur',now(),now());

#SELECT users.first_name, users.last_name, users2.first_name AS friend_first_name, users2.last_name AS friend_last_name
#FROM users
#LEFT JOIN friendships ON users.id = friendships.user_id
#LEFT JOIN users AS users2 ON friendships.friend_id = users2.id
#ORDER BY friend_last_name DESC;