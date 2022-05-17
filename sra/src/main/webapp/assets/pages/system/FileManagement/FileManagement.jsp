<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true" %>
<ts-content v-bind="$props">
    <template #body>
        <ts-layout column>
            <div class="h100">
                <ts-text v-model="board.title"></ts-text>
                <ts-box title="에디터와 파일업로드">
                    <template #body>
                        <ts-layout column>
                            <div class="h50">
                                <ts-editor v-model="board.text"></ts-editor>
                            </div>
                            <div class="h50">
                                {{ files }}
                                <ts-file-list multiple
                                    accept="image/*,.pdf,.xlsx,.docx,.pptx"
                                    @select-files="onSelectFiles"
                                    v-model="files">
                                </ts-file-list>
                            </div>
                        </ts-layout>
                    </template>
                </ts-box>
            </div>
        </ts-layout>
    </template>
</ts-content>
