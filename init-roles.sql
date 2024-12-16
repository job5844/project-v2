CREATE TABLE IF NOT EXISTS roles (
    role_id varchar(5) PRIMARY KEY,
    role_name varchar(255) NOT NULL
);

INSERT INTO roles (role_id, role_name) VALUES ('R0001', 'USER') ON CONFLICT DO NOTHING;
INSERT INTO roles (role_id, role_name) VALUES ('R0002', 'ADMIN') ON CONFLICT DO NOTHING;