/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(null, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/common/locales/gl", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // THIS CODE IS GENERATED - DO NOT MODIFY
    // See angular/tools/gulp-tasks/cldr/extract.js
    var u = undefined;
    function plural(n) {
        var i = Math.floor(Math.abs(n)), v = n.toString().replace(/^[^.]*\.?/, '').length;
        if (i === 1 && v === 0)
            return 1;
        return 5;
    }
    exports.default = [
        'gl',
        [['a.m.', 'p.m.'], u, u],
        u,
        [
            ['d.', 'l.', 'm.', 'm.', 'x.', 'v.', 's.'],
            ['dom.', 'luns', 'mar.', 'mér.', 'xov.', 'ven.', 'sáb.'],
            ['domingo', 'luns', 'martes', 'mércores', 'xoves', 'venres', 'sábado'],
            ['do.', 'lu.', 'ma.', 'mé.', 'xo.', 've.', 'sá.']
        ],
        [
            ['D', 'L', 'M', 'M', 'X', 'V', 'S'], ['Dom.', 'Luns', 'Mar.', 'Mér.', 'Xov.', 'Ven.', 'Sáb.'],
            ['Domingo', 'Luns', 'Martes', 'Mércores', 'Xoves', 'Venres', 'Sábado'],
            ['Do', 'Lu', 'Ma', 'Mé', 'Xo', 'Ve', 'Sá']
        ],
        [
            ['x.', 'f.', 'm.', 'a.', 'm.', 'x.', 'x.', 'a.', 's.', 'o.', 'n.', 'd.'],
            [
                'xan.', 'feb.', 'mar.', 'abr.', 'maio', 'xuño', 'xul.', 'ago.', 'set.', 'out.', 'nov.', 'dec.'
            ],
            [
                'xaneiro', 'febreiro', 'marzo', 'abril', 'maio', 'xuño', 'xullo', 'agosto', 'setembro',
                'outubro', 'novembro', 'decembro'
            ]
        ],
        [
            ['X', 'F', 'M', 'A', 'M', 'X', 'X', 'A', 'S', 'O', 'N', 'D'],
            [
                'Xan.', 'Feb.', 'Mar.', 'Abr.', 'Maio', 'Xuño', 'Xul.', 'Ago.', 'Set.', 'Out.', 'Nov.', 'Dec.'
            ],
            [
                'Xaneiro', 'Febreiro', 'Marzo', 'Abril', 'Maio', 'Xuño', 'Xullo', 'Agosto', 'Setembro',
                'Outubro', 'Novembro', 'Decembro'
            ]
        ],
        [['a.C.', 'd.C.'], u, ['antes de Cristo', 'despois de Cristo']],
        1,
        [6, 0],
        ['dd/MM/yy', 'd \'de\' MMM \'de\' y', 'd \'de\' MMMM \'de\' y', 'EEEE, d \'de\' MMMM \'de\' y'],
        ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'],
        ['{0}, {1}', u, '{0} \'do\' {1}', u],
        [',', '.', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
        ['#,##0.###', '#,##0 %', '#,##0.00 ¤', '#E0'],
        'EUR',
        '€',
        'euro',
        {
            'BYN': [u, 'Br'],
            'ESP': ['₧'],
            'JPY': ['JP¥', '¥'],
            'KMF': [u, 'FC'],
            'MXN': ['$MX', '$'],
            'RUB': [u, 'руб'],
            'THB': ['฿'],
            'TWD': ['NT$'],
            'XCD': [u, '$']
        },
        'ltr',
        plural
    ];
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2wuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21tb24vbG9jYWxlcy9nbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7OztJQUVILHlDQUF5QztJQUN6QywrQ0FBK0M7SUFFL0MsSUFBTSxDQUFDLEdBQUcsU0FBUyxDQUFDO0lBRXBCLFNBQVMsTUFBTSxDQUFDLENBQVM7UUFDdkIsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUNsRixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7WUFBRSxPQUFPLENBQUMsQ0FBQztRQUNqQyxPQUFPLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRCxrQkFBZTtRQUNiLElBQUk7UUFDSixDQUFDLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDeEIsQ0FBQztRQUNEO1lBQ0UsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7WUFDMUMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUM7WUFDeEQsQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUM7WUFDdEUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUss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QUMsQ0FBQyxFQUFFLElBQUksQ0FBQztZQUNoQixLQUFLLEVBQUUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ25CLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUM7WUFDakIsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDO1lBQ1osS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQ2QsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQztTQUNoQjtRQUNELEtBQUs7UUFDTCxNQUFNO0tBQ1AsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG4vLyBUSElTIENPREUgSVMgR0VORVJBVEVEIC0gRE8gTk9UIE1PRElGWVxuLy8gU2VlIGFuZ3VsYXIvdG9vbHMvZ3VscC10YXNrcy9jbGRyL2V4dHJhY3QuanNcblxuY29uc3QgdSA9IHVuZGVmaW5lZDtcblxuZnVuY3Rpb24gcGx1cmFsKG46IG51bWJlcik6IG51bWJlciB7XG4gIGxldCBpID0gTWF0aC5mbG9vcihNYXRoLmFicyhuKSksIHYgPSBuLnRvU3RyaW5nKCkucmVwbGFjZSgvXlteLl0qXFwuPy8sICcnKS5sZW5ndGg7XG4gIGlmIChpID09PSAxICYmIHYgPT09IDApIHJldHVybiAxO1xuICByZXR1cm4gNTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgW1xuICAnZ2wnLFxuICBbWydhLm0uJywgJ3AubS4nXSwgdSwgdV0sXG4gIHUsXG4gIFtcbiAgICBbJ2QuJywgJ2wuJywgJ20uJywgJ20uJywgJ3guJywgJ3YuJywgJ3MuJ10sXG4gICAgWydkb20uJywgJ2x1bnMnLCAnbWFyLicsICdtw6lyLicsICd4b3YuJywgJ3Zlbi4nLCAnc8OhYi4nXSxcbiAgICBbJ2RvbWluZ28nLCAnbHVucycsICdtYXJ0ZXMnLCAnbcOpcmNvcmVzJywgJ3hvdmVzJywgJ3ZlbnJlcycsICdzw6FiYWRvJ10sXG4gICAgWydkby4nLCAnbHUuJywgJ21hLicsICdtw6kuJywgJ3hvLicsICd2ZS4nLCAnc8OhLiddXG4gIF0sXG4gIFtcbiAgICBbJ0QnLCAnTCcsICdNJywgJ00nLCAnWCcsICdWJywgJ1MnXSwgWydEb20uJywgJ0x1bnMnLCAnTWFyLicsICdNw6lyLicsICdYb3YuJywgJ1Zlbi4nLCAnU8OhYi4nXSxcbiAgICBbJ0RvbWluZ28nLCAnTHVucycsICdNYXJ0ZXMnLCAnTcOpcmNvcmVzJywgJ1hvdmVzJywgJ1ZlbnJlcycsICdTw6FiYWRvJ10sXG4gICAgWydEbycsICdMdScsICdNYScsICdNw6knLCAnWG8nLCAnVmUnLCAnU8OhJ11cbiAgXSxcbiAgW1xuICAgIFsneC4nLCAnZi4nLCAnbS4nLCAnYS4nLCAnbS4nLCAneC4nLCAneC4nLCAnYS4nLCAncy4nLCAnby4nLCAnbi4nLCAnZC4nXSxcbiAgICBbXG4gICAgICAneGFuLicsICdmZWIuJywgJ21hci4nLCAnYWJyLicsICdtYWlvJywgJ3h1w7FvJywgJ3h1bC4nLCAnYWdvLicsICdzZXQuJywgJ291dC4nLCAnbm92LicsICdkZWMuJ1xuICAgIF0sXG4gICAgW1xuICAgICAgJ3hhbmVpcm8nLCAnZmVicmVpcm8nLCAnbWFyem8nLCAnYWJyaWwnLCAnbWFpbycsICd4dcOxbycsICd4dWxsbycsICdhZ29zdG8nLCAnc2V0ZW1icm8nLFxuICAgICAgJ291dHVicm8nLCAnbm92ZW1icm8nLCAnZGVjZW1icm8nXG4gICAgXVxuICBdLFxuICBbXG4gICAgWydYJywgJ0YnLCAnTScsICdBJywgJ00nLCAnWCcsICdYJywgJ0EnLCAnUycsICdPJywgJ04nLCAnRCddLFxuICAgIFtcbiAgICAgICdYYW4uJywgJ0ZlYi4nLCAnTWFyLicsICdBYnIuJywgJ01haW8nLCAnWHXDsW8nLCAnWHVsLicsICdBZ28uJywgJ1NldC4nLCAnT3V0LicsICdOb3YuJywgJ0RlYy4nXG4gICAgXSxcbiAgICBbXG4gICAgICAnWGFuZWlybycsICdGZWJyZWlybycsICdNYXJ6bycsICdBYnJpbCcsICdNYWlvJywgJ1h1w7FvJywgJ1h1bGxvJywgJ0Fnb3N0bycsICdTZXRlbWJybycsXG4gICAgICAnT3V0dWJybycsICdOb3ZlbWJybycsICdEZWNlbWJybydcbiAgICBdXG4gIF0sXG4gIFtbJ2EuQy4nLCAnZC5DLiddLCB1LCBbJ2FudGVzIGRlIENyaXN0bycsICdkZXNwb2lzIGRlIENyaXN0byddXSxcbiAgMSxcbiAgWzYsIDBdLFxuICBbJ2RkL01NL3l5JywgJ2QgXFwnZGVcXCcgTU1NIFxcJ2RlXFwnIHknLCAnZCBcXCdkZVxcJyBNTU1NIFxcJ2RlXFwnIHknLCAnRUVFRSwgZCBcXCdkZVxcJyBNTU1NIFxcJ2RlXFwnIHknXSxcbiAgWydISDptbScsICdISDptbTpzcycsICdISDptbTpzcyB6JywgJ0hIOm1tOnNzIHp6enonXSxcbiAgWyd7MH0sIHsxfScsIHUsICd7MH0gXFwnZG9cXCcgezF9JywgdV0sXG4gIFsnLCcsICcuJywgJzsnLCAnJScsICcrJywgJy0nLCAnRScsICfDlycsICfigLAnLCAn4oieJywgJ05hTicsICc6J10sXG4gIFsnIywjIzAuIyMjJywgJyMsIyMwwqAlJywgJyMsIyMwLjAwwqDCpCcsICcjRTAnXSxcbiAgJ0VVUicsXG4gICfigqwnLFxuICAnZXVybycsXG4gIHtcbiAgICAnQllOJzogW3UsICdCciddLFxuICAgICdFU1AnOiBbJ+KCpyddLFxuICAgICdKUFknOiBbJ0pQwqUnLCAnwqUnXSxcbiAgICAnS01GJzogW3UsICdGQyddLFxuICAgICdNWE4nOiBbJyRNWCcsICckJ10sXG4gICAgJ1JVQic6IFt1LCAn0YDRg9CxJ10sXG4gICAgJ1RIQic6IFsn4Li/J10sXG4gICAgJ1RXRCc6IFsnTlQkJ10sXG4gICAgJ1hDRCc6IFt1LCAnJCddXG4gIH0sXG4gICdsdHInLFxuICBwbHVyYWxcbl07XG4iXX0=