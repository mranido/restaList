drop database if exists todolist;
create database if not exists todolist;
use todolist;

CREATE TABLE IF NOT EXISTS company (
	id INT NOT NULL AUTO_INCREMENT,
    companyName VARCHAR(255) NOT NULL,
    email VARCHAR(320) UNIQUE NOT NULL,
    manager VARCHAR(320) not null,
    verificationCode VARCHAR(64) null,
    companyPassword VARCHAR(255) NOT NULL,
    address VARCHAR(60) NULL,
    logo VARCHAR(255) NULL,
    phono1 VARCHAR(15) NULL,
    phono2 VARCHAR(15) NULL,
    phono3 VARCHAR(15) NULL, 
    website VARCHAR(50) NULL,
    createdAt DATETIME NOT NULL DEFAULT NOW(),
    updatedAt DATETIME NULL,
    deletedAt DATETIME NULL,
    resetLink VARCHAR(255) null,
    verifiedAt DATETIME NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS office (
	id INT NOT NULL AUTO_INCREMENT,
    officeName VARCHAR(255) NOT NULL,
    address VARCHAR(60) NULL,
    phono1 VARCHAR(15) NULL,
    companyId INT NOT NULL,
    manager VARCHAR(320) not null,
    createdAt DATETIME NOT NULL DEFAULT NOW(),
    updatedAt DATETIME NULL,
    deletedAt DATETIME NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`companyId`) REFERENCES `company` (`id`) on delete cascade
);

CREATE TABLE IF NOT EXISTS department (
	id INT NOT NULL AUTO_INCREMENT,
    departmentName VARCHAR(255) NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT NOW(),
    updatedAt DATETIME NULL,
    companyId INT NOT NULL,
    deletedAt DATETIME NULL,
    primary key (`id`),
    FOREIGN KEY (`companyId`) REFERENCES `company` (`id`) on delete cascade
);


CREATE TABLE IF NOT EXISTS department_per_office (
	id INT NOT NULL AUTO_INCREMENT,
    departmentId INT NOT NULL,
    manager VARCHAR(320) not null,
    officeId INT NOT NULL,
    companyId INT NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`officeId`) REFERENCES `office` (`id`) on delete cascade,
    FOREIGN KEY (`companyId`) REFERENCES `company` (`id`) on delete cascade,
    FOREIGN KEY (`departmentId`) REFERENCES `department` (`id`) on delete cascade
);


CREATE TABLE IF NOT EXISTS employee (
	id INT NOT NULL AUTO_INCREMENT,
    employeeName VARCHAR(255) NOT NULL,
    isManager boolean not null default 0 ,
    officeId INT NOT NULL,
    password VARCHAR(255) NOT NULL,
    verificationCode VARCHAR(64) NULL,
    departmentId INT NOT NULL,
    phono VARCHAR(15) NULL,
    companyId INT NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT NOW(),
    updatedAt datetime NULL,
    deletedAt DATETIME NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`officeId`) REFERENCES `office` (`id`) on delete cascade,
    FOREIGN KEY (`companyId`) REFERENCES `company` (`id`) on delete cascade,
    FOREIGN KEY (`departmentId`) REFERENCES `department` (`id`) on delete cascade
);

CREATE TABLE IF NOT EXISTS supplier (
	id INT NOT NULL AUTO_INCREMENT,
    supplierName VARCHAR(255) NOT NULL,
    email VARCHAR(320) UNIQUE NOT NULL,
    manager VARCHAR(320) not null,
    address VARCHAR(60) NULL,
    logo VARCHAR(255) NULL,
    phono1 VARCHAR(15) NULL,
    phono2 VARCHAR(15) NULL,
    phono3 VARCHAR(15) NULL, 
    website VARCHAR(50) NULL,
    createdAt DATETIME NOT NULL DEFAULT NOW(),
    updatedAt DATETIME NULL,
    deletedAt DATETIME NULL,
    PRIMARY KEY (`id`)
);    

CREATE TABLE IF NOT EXISTS category (
	id INT NOT NULL AUTO_INCREMENT,
    categoryName VARCHAR(255) NOT NULL,
	createdAt DATETIME NOT NULL DEFAULT NOW(),
    updatedAt DATETIME NULL,
    deletedAt DATETIME NULL,
    PRIMARY KEY (`id`)
);    

CREATE TABLE IF NOT EXISTS supplier_per_category (
	id INT NOT NULL AUTO_INCREMENT,
	supplierId INT NOT NULL,
	categoryId INT NOT NULL,
	createdAt DATETIME NOT NULL DEFAULT NOW(),
	PRIMARY KEY (`id`),
	FOREIGN KEY (`supplierId`) REFERENCES `supplier` (`id`) on delete cascade,
	FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`) on delete cascade
);

CREATE TABLE IF NOT EXISTS product (
	id INT NOT NULL AUTO_INCREMENT,
	productName VARCHAR(255) NOT NULL,
	categoryId INT NOT NULL,
	createdAt DATETIME NOT NULL DEFAULT NOW(),
	updatedAt DATETIME NULL,
	deletedAt DATETIME NULL,
	PRIMARY KEY (`id`),
	FOREIGN KEY(`categoryId`) REFERENCES `category` (`id`) on delete cascade
);

CREATE TABLE IF NOT EXISTS product_per_supplier (
	id INT NOT NULL AUTO_INCREMENT,
	productId INT NOT NULL,
	supplierId INT NOT NULL,
	categoryId INT NOT NULL,
	createdAt DATETIME NOT NULL DEFAULT NOW(),
	updatedAt DATETIME NULL,
	deletedAt DATETIME NULL,
	PRIMARY KEY (`id`),
	FOREIGN KEY(`categoryId`) REFERENCES `category` (`id`) on delete cascade,
	FOREIGN KEY(`supplierId`) REFERENCES `supplier` (`id`) on delete cascade,
	FOREIGN KEY(`productId`) REFERENCES `product` (`id`) on delete cascade
);

CREATE TABLE IF NOT EXISTS subproduct (
	id INT NOT NULL AUTO_INCREMENT,
	subProductName VARCHAR(255) NOT NULL,
	productId INT NOT NULL,
	categoryId INT NOT NULL,
	createdAt DATETIME NOT NULL DEFAULT NOW(),
	updatedAt DATETIME NULL,
	deletedAt DATETIME NULL,
	PRIMARY KEY (`id`),
	FOREIGN KEY(`productId`) REFERENCES `product` (`id`) on delete cascade,
	FOREIGN KEY(`categoryId`) REFERENCES `category` (`id`) on delete cascade
);

CREATE TABLE IF NOT EXISTS subproduct_per_supplier (
	id INT NOT NULL AUTO_INCREMENT,
    subproductId INT NOT NULL,
	productId INT NOT NULL,
	supplierId INT NOT NULL,
	categoryId INT NOT NULL,
	createdAt DATETIME NOT NULL DEFAULT NOW(),
	updatedAt DATETIME NULL,
	deletedAt DATETIME NULL,
	PRIMARY KEY (`id`),
	FOREIGN KEY(`categoryId`) REFERENCES `category` (`id`) on delete cascade,
	FOREIGN KEY(`supplierId`) REFERENCES `supplier` (`id`) on delete cascade,
	FOREIGN KEY(`productId`) REFERENCES `product` (`id`) on delete cascade
);

CREATE TABLE IF NOT EXISTS shopping_list (
	id INT NOT NULL AUTO_INCREMENT,
    companyId INT NOT NULL,
    officeId INT NOT NULL,
    employeeId INT NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT NOW(),
	updatedAt DATETIME NULL,
	deletedAt DATETIME NULL,
	PRIMARY KEY (`id`),
	FOREIGN KEY(`companyId`) REFERENCES `company` (`id`) on delete cascade,
	FOREIGN KEY(`officeId`) REFERENCES `office` (`id`) on delete cascade,
	FOREIGN KEY(`employeeId`) REFERENCES `employee` (`id`) on delete cascade
);

CREATE TABLE IF NOT EXISTS shopping_items (
	id INT NOT NULL AUTO_INCREMENT,
    listId INT NOT NULL,
    subproductId INT NOT NULL,
    supplierId INT NOT NULL, 
    employeeId INT NOT NULL,
    officeId INT NOT NULL,
    metric ENUM('CAJAS', 'DOCENAS', 'KILOS', 'GRAMOS', 'PALES', 'BOTELLAS', 'SACO', 'UNIDADES', 'GALONES' ,'OTRO'),
    quantity DECIMAL(7,2) NOT NULL,
    isaccepted BOOLEAN NOT NULL DEFAULT 0,
    createdAt DATETIME NOT NULL DEFAULT NOW(),
	updatedAt DATETIME NULL,
	deletedAt DATETIME NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY(`supplierId`) REFERENCES `supplier` (`id`) on delete cascade,
    FOREIGN KEY(`subproductId`) REFERENCES `subproduct` (`id`) on delete cascade,
	FOREIGN KEY(`officeId`) REFERENCES `office` (`id`) on delete cascade,
	FOREIGN KEY(`employeeId`) REFERENCES `employee` (`id`) on delete cascade,
	FOREIGN KEY(`listId`) REFERENCES `shopping_list` (`id`) on delete cascade
);
    
    



