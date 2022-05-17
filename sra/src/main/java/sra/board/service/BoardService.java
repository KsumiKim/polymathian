package sra.board.service;

import com.github.pagehelper.PageInfo;

import core.model.PageParam;
import sra.board.model.ArticleVo;
import sra.board.model.BoardParamVo;

public interface BoardService {
    PageInfo<ArticleVo> selectArticleList( PageParam<BoardParamVo> paramPageParam );

    ArticleVo selectArticle( ArticleVo paramArticleVo );
}
