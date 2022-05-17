define( [
    'text!./MenuManagementModal.html',
    '../MenuManagementApi'
], function ( template, http ) {
    return {
        template: template,
        code: function () {
            return {
                MY_AUTH_CD: { groupCd: 'AUTH_CD' }
            };
        },
        data: function () {
            return {
                MY_AUTH_CD: [],
                selectValues: []
            };
        },
        mounted: function ( MY_AUTH_CD ) {
            this.MY_AUTH_CD = MY_AUTH_CD;
            /*
             * code 에서 정의한 KEY 를 data 에 자동으로 추가하는 방법은
             * 너무 은밀하게 동작해서 코드를 쫓아갈 수 없어요
             * 프레임워크와 업무화면이 결합도가 높으면 문제가 발생할때 대처가 안되니
             * 이 부분은 귀찮지만 이렇게 선언해주세요
             **/
            this.selectValues = MY_AUTH_CD.slice( 1, 3 );
        },
        methods: {}
    };
} );