--view

SELECT
    Lancamento = Lancamento.Descricao,
    [Data],
    Valor,
    Categoria = Categoria.Descricao,
    CategoriaGrupo = CategoriaGrupo.Descricao
FROM Lancamento
LEFT JOIN Categoria ON Categoria.CategoriaId = Lancamento.CategoriaId
LEFT JOIN CategoriaGrupo ON CategoriaGrupo.CategoriaGrupoId = Categoria.CategoriaGrupoId
--WHERE ContaId = 2
ORDER BY [Data] DESC