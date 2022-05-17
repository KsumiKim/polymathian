// define( [
//     '../TsFieldSet/TsFieldSet',
//     '../TsLayout/TsLayout',
//     '../TsText/TsText',
//     '../TsSelect/TsSelect',
// ], function( TsFieldSet, TsLayout, TsText, TsSelect ) {
//     return {
//         name: 'ts-number',
//         props: {
//             year: String,
//             seq: String,
//             cd: String,
//             label: String,
//             items: { type: Array, default: function () { return []; } }
//         },
//         methods: {
//             genYearText: function() {
//                 var _this = this;
//                 return this.$createElement( TsText, {
//                     props: {
//                         sm: true,
//                         value: this.year
//                     },
//                     on: {
//                         input: function( val ) {
//                             _this.$emit( 'onYearChanged', val );
//                         }
//                     }
//                 }, [] );
//             },
//             genSeqText: function() {
//                 var _this = this;
//                 return this.$createElement( TsText, {
//                     props: {
//                         sm: true,
//                         value: this.seq
//                     },
//                     on: {
//                         input: function( val ) {
//                             _this.$emit( 'onSeqChanged', val );
//                         }
//                     }
//                 }, [] );
//             },
//             genCd: function() {
//                 var _this = this;
//                 var hasItems = this.items.length !== 0;
//                 var component = hasItems ? TsSelect : 'span';
//                 var content = hasItems ? '' : this.cd;

//                 var element = this.$createElement( component, {
//                     props: {
//                         sm: true,
//                         block: true,
//                         items: this.items,
//                         value: this.cd
//                     },
//                     class: {
//                         'align-middle': !hasItems
//                     },
//                     on: {
//                         change: function( val ) {
//                             _this.$emit( 'onCodeSelected', val );
//                         }
//                     }
//                 }, [ content ] );

//                 return hasItems ? element : this.$createElement( 'div', {}, [ element ] );
//             }
//         },
//         render: function ( h ) {
//             var content = h( TsLayout, {
//                 props: { ma: true },
//             }, [ this.genYearText(), this.genCd(), this.genSeqText() ]);

//             return h( TsFieldSet, {
//                 props: { label: this.label }
//             }, [ content ] );
//         }
//     }
// } );