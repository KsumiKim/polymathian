package sra.board.model;

import lombok.Data;
import sra.common.model.Entity;

@Data
public class ArticleVo extends Entity {
    private Integer boardId;

    private Integer articleId;

    private String articleCd;

    private String title;

    private String content;

    private String useYn;

    private String insertNm;
}
