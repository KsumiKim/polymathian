package sra.board.service.dao;

import java.util.List;

import core.annotation.PrimaryMapperRepository;
import sra.board.model.ArticleVo;
import sra.board.model.BoardParamVo;

@PrimaryMapperRepository("boardMapperDao")
public interface BoardMapperDao {

    List<ArticleVo> selectArticleList( BoardParamVo paramVo );

    ArticleVo selectArticle( ArticleVo paramArticleVo );

    void updateArticle( ArticleVo paramArticleVo );
}
