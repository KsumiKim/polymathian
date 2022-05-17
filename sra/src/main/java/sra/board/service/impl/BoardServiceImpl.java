package sra.board.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

import core.model.PageParam;
import sra.board.model.ArticleVo;
import sra.board.model.BoardParamVo;
import sra.board.service.BoardService;
import sra.board.service.dao.BoardMapperDao;
import sra.common.service.BaseService;

@Service("boardService")
public class BoardServiceImpl extends BaseService implements BoardService {

    @Resource(name = "boardMapperDao")
    private BoardMapperDao boardMapperDao;

    public PageInfo<ArticleVo> selectArticleList( PageParam<BoardParamVo> param ) {

        try ( Page<ArticleVo> page = PageHelper.startPage( param.getPageNum(), param.getPageSize() ) ) {
            page.doSelectPage( () -> boardMapperDao.selectArticleList( param.getParam() ) );
            PageInfo<ArticleVo> pageInfo = PageInfo.of( page, param.getNavigatePages() );
            return pageInfo;
        }
    }
    public ArticleVo selectArticle(ArticleVo articleVo) {
        return this.boardMapperDao.selectArticle(articleVo);
    }
}

