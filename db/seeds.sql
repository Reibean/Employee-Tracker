INSERT INTO departments (name) VALUES
    ('Sales'),
    ('Marketing'),
    ('Engineering'),
    ('Finance');

INSERT INTO roles (title, salary, department_id) VALUES
    ('Sales Manager', 80000, 1),
    ('Sales Rep', 50000, 1),
    ('Marketing Manager', 70000, 2),
    ('Marketing Specialist', 50000, 2),
    ('Software Engineer', 100000, 3),
    ('Web Developer', 70000, 3),
    ('Financial Analyst', 90000, 4),
    ('Accountant', 60000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
    ('Black', 'Widow', 1, NULL),
    ('The', 'Incredible Hulk', 2, 1),
    ('Captain', 'America', 3, NULL),
    ('Thor', 'God of Thunder', 4, 3),
    ('Iron', 'Man', 5, NULL),
    ('Spider', 'Man', 6, 5),
    ('Scarlet', 'Witch', 7, NULL),
    ('Ant', 'Man', 8, 7);

