INSERT INTO department(name)
VALUES  ("Accounting"),
        ("Shipping"),
        ("Sales"),
        ("Returns"),
        ("Customer Service");

INSERT INTO role(title, salary, department_id)
VALUES  ("Manager", 92000.00, 1),
        ("Team Lead", 73000.00, 1),
        ("Team Member", 52000.00, 1)
        ("Manager", 92000.00, 2),
        ("Team Lead", 73000.00, 2),
        ("Team Member", 52000.00, 2)
        ("Manager", 92000.00, 3),
        ("Team Lead", 73000.00, 3),
        ("Team Member", 52000.00, 3)
        ("Manager", 92000.00, 4),
        ("Team Lead", 73000.00, 4),
        ("Team Member", 52000.00, 4)
        ("Manager", 92000.00, 5),
        ("Team Lead", 73000.00, 5),
        ("Team Member", 52000.00, 5);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES  ("Steven", "Smith", 1, NULL),
        ("Bob", "Odenkirk", 2, 1),
        ("Jenny", "Thomes", 3, 1),
        ("Sam", "Smith", 4, NULL),
        ("John", "Dude", 5, 4),
        ("Tim", "Guy", 6, 4),
        ("Christy", "Yoohoo", 7, NULL),
        ("Jimmy", "Nutron", 8, 7),
        ("Frank", "Ocean", 9, 7),
        ("Guy", "Ferri", 10, NULL),
        ("Samus", "Ares", 11, 10),
        ("Timothy", "Henry", 12, 10),
        ("Kenny", "Stan", 13, NULL),
        ("Eric", "Cartman", 14, 13),
        ("Lily", "John", 15, 13);