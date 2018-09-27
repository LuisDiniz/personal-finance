SELECT *
FROM Lancamento

SELECT *
FROM CategoriaGrupo

SELECT *
FROM Categoria

INSERT INTO Categoria VALUES (1,'Mercado')
INSERT INTO Categoria (Descricao) VALUES ('Transferência')
INSERT INTO Categoria VALUES (3,'Delivery')
INSERT INTO Categoria VALUES (3,'Bar/Restaurante')

SELECT *
FROM LancamentoHistoricoCategoria

INSERT INTO LancamentoHistoricoCategoria VALUES ('Supermercados BH', 'Supermercados BH', 1)
INSERT INTO LancamentoHistoricoCategoria VALUES ('Villefort', 'CEMA CENTRAL', 1)
INSERT INTO LancamentoHistoricoCategoria VALUES ('Estacionamento Unidas', 'NASER ESTACIONAMENTOS', 2)
INSERT INTO LancamentoHistoricoCategoria VALUES ('Parada do Açaí', 'PARADA DO ACAI', 3)
INSERT INTO LancamentoHistoricoCategoria VALUES ('Yuan Lai', 'PAG*RAIZENPN', 3)