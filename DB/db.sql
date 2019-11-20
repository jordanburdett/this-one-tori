
DROP TABLE person CASCADE;
DROP TABLE relationship CASCADE;

CREATE TABLE person 
( id           SERIAL PRIMARY KEY NOT NULL
, firstName    VARCHAR(30) NOT NULL
, midName      VARCHAR(30)
, lastName     VARCHAR(30) NOT NULL
, DOB          DATE NOT NULL
);


CREATE TABLE relationship 
( child_id  INT NOT NULL REFERENCES person(id) ON DELETE CASCADE
, parent_id INT NOT NULL REFERENCES person(id) ON DELETE CASCADE
);


INSERT INTO person
( firstName
, midName
, lastName
, DOB
) VALUES
( 'Jordan'
, 'Lorin'
, 'Burdett'
, '1999-07-29'
);

INSERT INTO person
( firstName
, midName
, lastName
, DOB
) VALUES
( 'Troy'
, 'Glen'
, 'Burdett'
, '1965-07-29'
);

INSERT INTO person
( firstName
, lastName
, DOB
) VALUES
( 'Diane'
, 'Burdett'
, '1968-07-29'
);

INSERT INTO person
( firstName
, midName
, lastName
, DOB
) VALUES
( 'Tori'
, 'Noel'
, 'Fife'
, '1997-12-11'
);

INSERT INTO relationship VALUES
( 1
, 2
);

INSERT INTO relationship VALUES
( 1
, 3
);