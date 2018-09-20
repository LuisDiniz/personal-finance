IF NOT EXISTS (
                SELECT 1
                FROM sys.databases
                WHERE name = 'PersonalFinance'
               )
BEGIN
    CREATE DATABASE PersonalFinance
END

USE PersonalFinance

-- Scripts to create all tables
BEGIN

    IF NOT EXISTS (
                    SELECT 1 
                    FROM sys.tables tables 
                    WHERE tables.name = 'CategoriaGrupo'
                )
    BEGIN
        CREATE TABLE CategoriaGrupo (
            CategoriaGrupoId        INT             IDENTITY    NOT NULL,
            Descricao               VARCHAR(128)                NOT NULL,
            CONSTRAINT PK_CategoriaGrupoId                      PRIMARY KEY (CategoriaGrupoId) 
        )
    END

    IF NOT EXISTS (                    
                    SELECT 1 
                    FROM sys.tables tables 
                    WHERE tables.name = 'Categoria'
                )
    BEGIN
        CREATE TABLE Categoria (
            CategoriaId             INT             IDENTITY    NOT NULL,
            CategoriaGrupoId        INT                         NOT NULL,
            Descricao               VARCHAR(128)                NOT NULL,
            CONSTRAINT PK_CategoriaId                           PRIMARY KEY (CategoriaId),
            CONSTRAINT FK_Categoria_CategoriaGrupoId            FOREIGN KEY (CategoriaGrupoId) REFERENCES Categoria(CategoriaId)
        )
    END

    IF NOT EXISTS (
                    SELECT 1 
                    FROM sys.tables tables 
                    WHERE tables.name = 'Conta'
                )
    BEGIN
        CREATE TABLE Conta (
            ContaId             INT             IDENTITY    NOT NULL,
            Descricao           VARCHAR(128)                NOT NULL,
            Saldo               MONEY                       NOT NULL    CONSTRAINT DF_Conta_Saldo DEFAULT 0.00,
            [Manual]            BIT                         NOT NULL    CONSTRAINT DF_Conta_Manual  DEFAULT 0,
            CONSTRAINT PK_ContaId                           PRIMARY KEY (ContaId) 
        )
    END

    IF NOT EXISTS (
                    SELECT 1 
                    FROM sys.tables tables 
                    WHERE tables.name = 'Lancamento'
                )
    BEGIN
        CREATE TABLE Lancamento (
            LancamentoId        INT             IDENTITY    NOT NULL,
            Descricao           VARCHAR(128)                NOT NULL,
            DescricaoOriginal   VARCHAR(128)                NOT NULL,
            [Data]              DATE                        NOT NULL    CONSTRAINT DF_Lancamento_Data  DEFAULT GETDATE(),
            Valor               MONEY                       NOT NULL,
            ContaId             INT                         NOT NULL,                         
            CategoriaId         INT,                         
            CONSTRAINT PK_LancamentoId                      PRIMARY KEY (LancamentoId),
            CONSTRAINT FK_Lancamento_Conta                  FOREIGN KEY (ContaId) REFERENCES Conta(ContaId),
            CONSTRAINT FK_Lancamento_Categoria              FOREIGN KEY (CategoriaId) REFERENCES Categoria(CategoriaId)            
        )
    END    

    IF NOT EXISTS (
                    SELECT 1 
                    FROM sys.tables tables 
                    WHERE tables.name = 'LancamentoHistoricoCategoria'
                )
    BEGIN
        CREATE TABLE LancamentoHistoricoCategoria (
            LancamentoHistoricoCategoriaId      INT             IDENTITY    NOT NULL,
            Descricao                           VARCHAR(128)                NOT NULL,
            DescricaoParcial                    VARCHAR(128)                NOT NULL,
            CategoriaId                         INT                         NOT NULL,                         
            CONSTRAINT PK_LancamentoHistoricoCategoriaId                    PRIMARY KEY (LancamentoHistoricoCategoriaId),
            CONSTRAINT FK_LancamentoHistoricoCategoria_Categoria            FOREIGN KEY (CategoriaId) REFERENCES Categoria (CategoriaId)            
        )
    END        

END