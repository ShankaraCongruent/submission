--create database
IF DB_ID('training') IS NULL CREATE DATABASE training;
USE training;
IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name='training')
    EXEC('CREATE SCHEMA training');

--create tables

CREATE TABLE training.training.Role(
	RoleId INT PRIMARY KEY IDENTITY(1,1),
	RoleName NVARCHAR(50) NOT NULL UNIQUE,
	CreatedBy NVARCHAR(50),
	CreatedOn DATETIME DEFAULT GETDATE(),
	ModifiedBy NVARCHAR(50),
	ModifiedOn DATETIME
);

CREATE TABLE training.training.User(
	UserId INT PRIMARY KEY IDENTITY(1,1),
	UserName NVARCHAR(100) NOT NULL UNIQUE,
	Email NVARCHAR(254) NOT NULL UNIQUE,
	Password VARBINARY(512) NOT NULL,
	RefreshToken NVARCHAR(512) NULL,
	RefreshTokenExpiry DATETIME NULL,
	IsActive BIT DEFAULT 1,
	LastLogin DATETIME NULL,
	Address NVARCHAR(250) NOT NULL,
	IsMinor BIT DEFAULT 0,
	IsNRI BIT DEFAULT 0,
	PAN NVARCHAR(10) NOT NULL,
	Aadhar NVARCHAR(20) NOT NULL,
	POA_Exists BIT DEFAULT 0,
	POA_Details NVARCHAR(500) NULL,
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

CREATE TABLE training.training.Branch(
	BranchId INT PRIMARY KEY IDENTITY(1,1),
	BranchName NVARCHAR(100),
	Address NVARCHAR(250),
	Phone NVARCHAR(20),
	BankId INT FOREIGN KEY REFERENCES training.training.Bank(BankId),
	ManagerId INT NOT NULL FOREIGN KEY REFERENCES training.training.[User](UserId),
	CreatedBy NVARCHAR(50),
	CreatedOn DATETIME DEFAULT GETDATE(),
	ModifiedBy NVARCHAR(50),
	ModifiedOn DATETIME
);

-- CREATE TABLE training.training.Manager(
	-- ManagerId INT PRIMARY KEY IDENTITY(1,1),
	-- ManagerName NVARCHAR(100),
	-- BranchId INT FOREIGN KEY REFERENCES training.training.Branch(BranchId),
	-- RoleId INT FOREIGN KEY REFERENCES training.training.Role(RoleId),
-- );

CREATE TABLE training.training.Account(
	AccountId INT PRIMARY KEY IDENTITY(1,1),
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

CREATE TABLE training.training.Permission(
	PermissionId INT PRIMARY KEY IDENTITY(1,1),
	PermissionCode NVARCHAR(100) NOT NULL UNIQUE,
	CreatedBy NVARCHAR(50),
	CreatedOn DATETIME DEFAULT GETDATE(),
	ModifiedBy NVARCHAR(50),
	ModifiedOn DATETIME
);

CREATE TABLE training.training.RolePermission(
    RolePermissionId INT PRIMARY KEY IDENTITY(1,1),
    RoleId INT NOT NULL FOREIGN KEY REFERENCES training.training.Role(RoleId),
    PermissionId INT NOT NULL FOREIGN KEY REFERENCES training.training.Permission(PermissionId),
    CreatedBy NVARCHAR(50),
    CreatedOn DATETIME DEFAULT GETDATE()
);

-- CREATE TABLE training.training.UserRole(
    -- UserRoleId INT PRIMARY KEY IDENTITY(1,1),
    -- UserId INT NOT NULL FOREIGN KEY REFERENCES training.training.[User](UserId),
    -- RoleId INT NOT NULL FOREIGN KEY REFERENCES training.training.Role(RoleId),
    -- AssignedBy NVARCHAR(50),
    -- AssignedOn DATETIME DEFAULT GETDATE(),
    -- CONSTRAINT UQ_User_Role UNIQUE (UserId, RoleId)
-- );
CREATE TABLE training.training.[Transaction] (
    TranscationId BIGINT PRIMARY KEY IDENTITY(1,1),
    AccountId INT NOT NULL FOREIGN KEY REFERENCES training.training.Account(AccountId),
    TranscationType NVARCHAR(50) NOT NULL,
    Amount DECIMAL(18,2) NOT NULL,
    TranscationDate DATETIME DEFAULT GETDATE(),
    CreatedBy NVARCHAR(50),
    CreatedOn DATETIME DEFAULT GETDATE(),
    ModifiedBy NVARCHAR(50),
    ModifiedOn DATETIME
);

ALTER TABLE training.training.Bank
ADD CONSTRAINT FK_Bank_Manager FOREIGN KEY (BankManagerId) REFERENCES training.training.[User](UserId);

