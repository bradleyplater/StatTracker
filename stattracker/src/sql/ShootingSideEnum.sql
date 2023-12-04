CREATE TABLE shooting_side(
	id INT PRIMARY KEY,
	side VARCHAR(255) NOT NULL UNIQUE
);

insert into shooting_side (id, side)
values
  (1, 'Not Specified'),
  (2, 'Right'),
  (3, 'Left')
  