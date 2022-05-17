package sra.board.web;

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.pagehelper.PageInfo;

import core.model.PageParam;
import sra.board.model.ArticleVo;
import sra.board.model.BoardParamVo;
import sra.board.service.BoardService;

@RestController
@RequestMapping({"/board"})
public class BoardController {

    @Resource(name = "boardService")
    private BoardService boardService;

    @PostMapping({"/selectArticleList"})
    public PageInfo<ArticleVo> selectArticleList( @RequestBody PageParam<BoardParamVo> param ) throws Exception {
        return this.boardService.selectArticleList( param );
    }

    @PostMapping({"/selectArticle"})
    public ArticleVo selectArticle( @RequestBody ArticleVo articleVo ) throws Exception {
        return this.boardService.selectArticle( articleVo );
    }
}