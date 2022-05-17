package core.model;

import java.util.List;

import core.support.ExceptionConsumer;
import core.support.FunctionHelper;
import lombok.Data;

@Data
public class RowState<T> {
    private List<T> created;
    private List<T> updated;
    private List<T> deleted;

    public void forEachCreated ( ExceptionConsumer<T> consumer ) {
        created.forEach( FunctionHelper.exceptConsumer( consumer ) );
    }

    public void forEachUpdated ( ExceptionConsumer<T> consumer ) {
        updated.forEach( FunctionHelper.exceptConsumer( consumer ) );
    }

    public void forEachDeleted ( ExceptionConsumer<T> consumer ) {
        deleted.forEach( FunctionHelper.exceptConsumer( consumer ) );
    }
}
