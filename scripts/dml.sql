-- Insert some default informations
BEGIN

    -- Contas
    BEGIN

        IF NOT EXISTS (
                        SELECT 1 
                        FROM Conta 
                        WHERE Descricao = 'Dinheiro'
                    )
        BEGIN
            INSERT INTO Conta (Descricao, [Manual])
            VALUES ('Dinheiro', 1)
        END

        IF NOT EXISTS (
                        SELECT 1 
                        FROM Conta 
                        WHERE Descricao = 'Itaú'
                    )
        BEGIN
            INSERT INTO Conta (Descricao)
            VALUES ('Itaú')
        END  

    END 

    -- CategoriaGrupo
    BEGIN 

        IF NOT EXISTS (
                        SELECT 1 
                        FROM CategoriaGrupo 
                        WHERE Descricao = 'Gastos Essenciais'
                    )
        BEGIN
            INSERT INTO CategoriaGrupo
            VALUES ('Gastos Essenciais')
        END

        IF NOT EXISTS (
                        SELECT 1 
                        FROM CategoriaGrupo 
                        WHERE Descricao = 'Estudos'
                    )
        BEGIN
            INSERT INTO CategoriaGrupo
            VALUES ('Estudos')
        END

        IF NOT EXISTS (
                        SELECT 1 
                        FROM CategoriaGrupo 
                        WHERE Descricao = 'Livre'
                    )
        BEGIN
            INSERT INTO CategoriaGrupo
            VALUES ('Livre')
        END

        IF NOT EXISTS (
                        SELECT 1 
                        FROM CategoriaGrupo 
                        WHERE Descricao = 'Objetivos'
                    )
        BEGIN
            INSERT INTO CategoriaGrupo
            VALUES ('Objetivos')
        END

        IF NOT EXISTS (
                        SELECT 1 
                        FROM CategoriaGrupo 
                        WHERE Descricao = 'Aposentadoria'
                    )
        BEGIN
            INSERT INTO CategoriaGrupo
            VALUES ('Aposentadoria')
        END
    END

END