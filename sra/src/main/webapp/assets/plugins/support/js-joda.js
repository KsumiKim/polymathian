define( [
    '@js-joda/core'
], function ( JSJoda ) {
    var Joda = JSJoda.use( function () {} );
    var LocalDateTime = Joda.LocalDateTime;
    var LocalDate = Joda.LocalDate;
    var convert = Joda.convert;

    var convertNativeDate = function ( dateTime ) {
        if ( dateTime instanceof LocalDateTime || dateTime instanceof LocalDate ) {
            return convert( dateTime ).toDate();
        }
        return new Date( NaN );
    };
    Joda.LocalDateTime.prototype.toNative = function () {
        return convertNativeDate( this );
    };
    Joda.LocalDate.prototype.toNative = function () {
        return convertNativeDate( this );
    };

    var DateTimeFormatter = Joda.DateTimeFormatter;
    Joda.FORMAT_YYYY_MM_DD_HH_MM_SS = DateTimeFormatter.ofPattern( 'yyyy-MM-dd HH:mm:ss' );
    Joda.FORMAT_YYYY_MM_DD_HH_MM = DateTimeFormatter.ofPattern( 'yyyy-MM-dd HH:mm' );
    Joda.FORMAT_YYYY_MM_DD_HH = DateTimeFormatter.ofPattern( 'yyyy-MM-dd HH' );
    Joda.FORMAT_YYYY_MM_DD = DateTimeFormatter.ofPattern( 'yyyy-MM-dd' );
    Joda.FORMAT_YYYY_MM = DateTimeFormatter.ofPattern( 'yyyy-MM' );
    Joda.FORMAT_YYYYMMDD = DateTimeFormatter.ofPattern( 'yyyyMMdd' );
    Joda.FORMAT_YYYYMM = DateTimeFormatter.ofPattern( 'yyyyMM' );
    Joda.FORMAT_YYYY = DateTimeFormatter.ofPattern( 'yyyy' );
    return Joda;
} );