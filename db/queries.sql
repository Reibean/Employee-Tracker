SELECT * FROM departments;

SELECT * FROM roles;

SELECT * FROM employees;

INSERT INTO departments (name) VALUES ('Marketing');

INSERT INTO roles (title, salary, department_id) VALUES ('Software Engineer', 100000, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Iron', 'Man', 1, NULL);

UPDATE employees SET role_id = 2 WHERE first_name = 'Iron' && last_name = 'Man';