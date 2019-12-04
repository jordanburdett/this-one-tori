drop table users cascade;

CREATE TABLE users
( id           SERIAL PRIMARY KEY NOT NULL
, username     VARCHAR(30) UNIQUE NOT NULL
, password     VARCHAR(255) NOT NULL
, created      DATE DEFAULT CURRENT_DATE
);

INSERT INTO users (username, password)
VALUES
('admin'
,'$2b$10$hfQuLCta45URCeFwM/4ovuGPbTsd0gqM2ZTuK1h2gZtTqFfn72m8G'
);

INSERT INTO users (username, password)
VALUES
('fluffyfro'
,'$2b$10$dz3E.EbY6SU7bc6YLQJ1Z.UlA5SlRworN4ucZGw1mkuYDhCTz8SAe'
);

INSERT INTO users (username, password)
VALUES
('tfife'
,'$2b$10$F5b0eVZCd2eCvREtoTrkKOgI0IemApr1tPktM6Zd4.V3k7DlGzoh2'
);

INSERT INTO users (username, password)
VALUES
('UnkleDave'
,'$2b$10$OWNLszwv5abTnrObfC3BC.cdQmhqslujTKTsCv9Lqj.Rc3Fkz3SCS'
);