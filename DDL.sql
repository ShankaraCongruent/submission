CREATE SCHEMA IF NOT EXISTS training;

CREATE TABLE training.training.Role(
	RoleId INT PRIMARY KEY IDENTITY(1,1),
	RoleName NVARCHAR(50) NOT NULL,
	CreatedBy NVARCHAR(50),
	CreatedOn DATETIME DEFAULT GETDATE(),
	ModifiedBy NVARCHAR(50),
	ModifiedOn DATETIME
);

CREATE TABLE training.training.User(
	UserId INT PRIMARY KEY IDENTITY(1,1),
	UserName NVARCHAR(100) NOT NULL,
	Address NVARCHAR(250),
	RoleId INT FOREIGN KEY REFERENCES training.training.Role(RoleId),
	CreatedBy NVARCHAR(50),
	CreatedOn DATETIME DEFAULT GETDATE(),
	ModifiedBy NVARCHAR(50),
	ModifiedOn DATETIME
);

CREATE TABLE training.training.Currency(
	CurrencyId INT PRIMARY KEY IDENTITY(1,1),
	CurrencyCode NVARCHAR(10),
	CurrencyName NVARCHAR(50),
	CreatedBy NVARCHAR(50),
	CreatedOn DATETIME DEFAULT GETDATE(),
	ModifiedBy NVARCHAR(50),
	ModifiedOn DATETIME
);

CREATE TABLE training.training.Bank(
	BankId INT PRIMARY KEY IDENTITY(1,1),
	BankName NVARCHAR(100),
	BankManagerId INT NULL,
	CreatedBy NVARCHAR(50),
	CreatedOn DATETIME DEFAULT GETDATE(),
	ModifiedBy NVARCHAR(50),
	ModifiedOn DATETIME
);

CREATE TABLE traning.training.Branch(
	BranchId INT PRIMARY KEY IDENTITY(1,1),
	BranchName NVARCHAR(100),
	Address NVARCHAR(250),
	Phone NVARCHAR(20),
	BankId INT FOREIGN KEY REFERENCES training.training.Bank(BankId),
	ManagerId INT NULL, // why not fk?
	CreatedBy NVARCHAR(50),
	CreatedOn DATETIME DEFAULT GETDATE(),
	ModifiedBy NVARCHAR(50),
	ModifiedOn DATETIME
);

CREATE TABLE training.training.Manager(
	ManagerId INT PRIMARY KEY IDENTITY(1,1),
	ManagerName NVARCHAR(100),
	BranchId INT FOREIGN KEY REFERENCES training.training.Branch(BranchId),
	RoleId INT FOREIGN KEY REFERENCES training.training.Role(RoleId),
	CreatedBy NVARCHAR(50),
	CreatedOn DATETIME DEFAULT GETDATE(),
	ModifiedBy NVARCHAR(50),
	ModifiedOn DATETIME
);

CREATE TABLE training.training.Account(
	AccountId INT PRIMARY KEY IDENTITY(1,1)
	AccountNumber NVARCHAR(50),
	AccountType NVARCHAR(50) CHECK (AccountType IN('Saving','Current','TermDeposit')),
	Balance DECIMAL(18,2),
	LimitAmount DECIMAL(18,2),
	UserId INT FOREIGN KEY REFERENCES training.training.User(UserId),
	BranchId INT FOREIGN KEY REFERENCES training.training.Branch(BranchId),
	CurrencyId INT FOREIGN KEY REFERENCES training.training.Currency(CurrencyId),
	CreatedBy NVARCHAR(50),
	CreatedOn DATETIME DEFAULT GETDATE(),
	ModifiedBy NVARCHAR(50),
	ModifiedOn DATETIME
);

ALTER TABLE training.training.Bank
Add CONSTRAINT FK_Bank_manager FOREIGN KEY(BankManagerId) REFERENCES training.training.Manager(ManagerId);

ALTER TABLE training.training.Branch
add CONSTRAINT FK_Branch_Manager FOREIGN KEY(ManagerId) REFERENCES training.training.Manager(ManagerId);