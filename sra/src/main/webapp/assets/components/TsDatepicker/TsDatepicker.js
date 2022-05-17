define( [
    'mixins/sizeable-mixin',
    'vue2-datepicker-with-locale',
    'js-joda'
], function ( sizeableMixin, Datepicker, JSJoda ) {
    var LocalDateTime = JSJoda.LocalDateTime;
    var LocalDate = JSJoda.LocalDate;
    var nativeJs = JSJoda.nativeJs;

    var FORMAT_YYYY_MM_DD = JSJoda.FORMAT_YYYY_MM_DD;
    var FORMAT_YYYYMMDD = JSJoda.FORMAT_YYYYMMDD;

    var _value2date = Datepicker.methods.value2date;
    return {
        name: 'ts-datepicker',
        mixins: [ sizeableMixin, Datepicker ],
        props: {
            inputClass: {
                default: function () {
                    return {
                        'mx-input': true,
                        'mx-input-sm': this.sm,
                        'mx-input-lg': this.lg
                    };
                }
            },
            clearable: { default: false },
            value: {
                type: [ Array, LocalDateTime, LocalDate ],
                validator: function ( value ) {
                    return Array.isArray( value )
                        ? value.every( function ( val ) {
                            return val instanceof LocalDateTime || val instanceof LocalDate;
                        } )
                        : value instanceof LocalDateTime || value instanceof LocalDate;
                }
            },
            shortcuts: {
                default: function () {
                    var _this = this;
                    return [
                        {
                            text: '오늘',
                            onClick: function () {
                                var now = LocalDate.now();
                                return _this.range
                                    ? [ now.toNative(), now.toNative() ]
                                    : now.toNative();
                            }
                        },
                        {
                            text: '어제',
                            onClick: function () {
                                var now = LocalDate.now();
                                return _this.range
                                    ? [ now.minusDays( 1 ).toNative(), now.toNative() ]
                                    : now.toNative();
                            }
                        },
                        {
                            text: '일주일 전',
                            onClick: function () {
                                var now = LocalDate.now();
                                return _this.range
                                    ? [ now.minusDays( 7 ).toNative(), now.toNative() ]
                                    : now.toNative();

                            }
                        }
                    ];
                }
            },
            valueType: { default: 'format' },
            formatter: {
                default: function () {
                    return {
                        parse: function ( value ) {
                            value = value.replace( /-/g, '' );
                            var length = value.length;
                            if ( length === 8 ) {
                                return LocalDate.parse( value, FORMAT_YYYYMMDD ).toNative();
                            } else {
                                return new Date( NaN );
                            }
                        },
                        stringify: function ( date ) {
                            return convertLocalDate( date );
                        }
                    }
                }
            },
            renderInputText: {
                default: function () {
                    return function ( value ) {
                        if ( value instanceof Date && !isNaN( value ) ) {
                            return convertLocalDate( value ).format( FORMAT_YYYY_MM_DD );
                        } else if ( Array.isArray( value ) && value.length >= 2 ) {
                            return value.map( function ( val ) {
                                if ( val instanceof Date && !isNaN( val ) ) {
                                    return convertLocalDate( val ).format( FORMAT_YYYY_MM_DD );
                                }
                                return '';
                            } ).join( this.innerRangeSeparator );
                        }
                        return '';
                    }
                }
            }
        },
        methods: {
            /**
             * @override
             */
            value2date: function ( value ) {
                if ( this.valueType === 'format' ) {
                    if ( value instanceof LocalDateTime || value instanceof LocalDate ) {
                        return value.toNative();
                    } else if ( value instanceof Date ) {
                        return value;
                    }
                }
                return _value2date.call( this, value );
            }
        }
    };

    function convertLocalDate ( date ) {
        if ( date instanceof Date ) {
            return LocalDate.from( nativeJs( date ) );
        }
        return null;
    }
} );