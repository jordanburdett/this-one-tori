
DROP Scriptures CASCADE;

CREATE TABLE Scriptures
( id        SERIAL PRIMARY KEY
, book      VARCHAR(30) NOT NULL
, chapter   INTEGER NOT NULL
, verse     INTEGER NOT NULL
, content   VARCHAR(500) NOT NULL
);

INSERT INTO scriptures 
( book
, chapter
, verse
, content
) VALUES
( 'Jordan'
, 1
, 20
, 'I am team Lead');