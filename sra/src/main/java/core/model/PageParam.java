package core.model;

import lombok.Data;

@Data
public class PageParam<T> {
    // 내가 원하는 페이지
    private int pageNum;

    // 내가 원하는 페이지에서 보여질 행 개수
    private int pageSize;

    // 화면에 표시하고 싶은 페이지 개수
    private int navigatePages;

    private T param;
}
