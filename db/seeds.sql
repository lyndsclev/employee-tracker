INSERT INTO department (name)
VALUES 
('Sales'),
('Marketing'),
('Finance'),
('Legal'),
('Management');

INSERT INTO role (title, salary, department_id)
VALUES
('Sales Representative', 75000, 1),
('Marketing Coordinator', 50000, 2),
('Accountant', 80000, 3),
('Lawyer', 100000, 4),
('Manager', 120000, 5); 

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Jack', 'Black', 1, 1),
('Jane', 'Smith', 2, 1),
('Sara', 'Wong', 3, 1),
('David', 'Wilson', 4, 1),
('Rachel', 'Green', 5, null); 