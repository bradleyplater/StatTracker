CREATE TABLE players (
 	id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	shooting_side INT,
		CONSTRAINT fk_shooting_side
			FOREIGN KEY (shooting_side)
				REFERENCES shooting_side(id),
	userId INT,
		CONSTRAINT fk_userId
      		FOREIGN KEY(userId) 
	  			REFERENCES users(id)
)