/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// Attention:
// This file duplicates types and values from @angular/core
// so that we are able to make @angular/compiler independent of @angular/core.
// This is important to prevent a build cycle, as @angular/core needs to
// be compiled with the compiler.
import { CssSelector } from './selector';
export const createInject = makeMetadataFactory('Inject', (token) => ({ token }));
export const createInjectionToken = makeMetadataFactory('InjectionToken', (desc) => ({ _desc: desc, ɵprov: undefined }));
export const createAttribute = makeMetadataFactory('Attribute', (attributeName) => ({ attributeName }));
// Stores the default value of `emitDistinctChangesOnly` when the `emitDistinctChangesOnly` is not
// explicitly set.
export const emitDistinctChangesOnlyDefaultValue = true;
export const createContentChildren = makeMetadataFactory('ContentChildren', (selector, data = {}) => (Object.assign({ selector, first: false, isViewQuery: false, descendants: false, emitDistinctChangesOnly: emitDistinctChangesOnlyDefaultValue }, data)));
export const createContentChild = makeMetadataFactory('ContentChild', (selector, data = {}) => (Object.assign({ selector, first: true, isViewQuery: false, descendants: true }, data)));
export const createViewChildren = makeMetadataFactory('ViewChildren', (selector, data = {}) => (Object.assign({ selector, first: false, isViewQuery: true, descendants: true, emitDistinctChangesOnly: emitDistinctChangesOnlyDefaultValue }, data)));
export const createViewChild = makeMetadataFactory('ViewChild', (selector, data) => (Object.assign({ selector, first: true, isViewQuery: true, descendants: true }, data)));
export const createDirective = makeMetadataFactory('Directive', (dir = {}) => dir);
export var ViewEncapsulation;
(function (ViewEncapsulation) {
    ViewEncapsulation[ViewEncapsulation["Emulated"] = 0] = "Emulated";
    // Historically the 1 value was for `Native` encapsulation which has been removed as of v11.
    ViewEncapsulation[ViewEncapsulation["None"] = 2] = "None";
    ViewEncapsulation[ViewEncapsulation["ShadowDom"] = 3] = "ShadowDom";
})(ViewEncapsulation || (ViewEncapsulation = {}));
export var ChangeDetectionStrategy;
(function (ChangeDetectionStrategy) {
    ChangeDetectionStrategy[ChangeDetectionStrategy["OnPush"] = 0] = "OnPush";
    ChangeDetectionStrategy[ChangeDetectionStrategy["Default"] = 1] = "Default";
})(ChangeDetectionStrategy || (ChangeDetectionStrategy = {}));
export const createComponent = makeMetadataFactory('Component', (c = {}) => (Object.assign({ changeDetection: ChangeDetectionStrategy.Default }, c)));
export const createPipe = makeMetadataFactory('Pipe', (p) => (Object.assign({ pure: true }, p)));
export const createInput = makeMetadataFactory('Input', (bindingPropertyName) => ({ bindingPropertyName }));
export const createOutput = makeMetadataFactory('Output', (bindingPropertyName) => ({ bindingPropertyName }));
export const createHostBinding = makeMetadataFactory('HostBinding', (hostPropertyName) => ({ hostPropertyName }));
export const createHostListener = makeMetadataFactory('HostListener', (eventName, args) => ({ eventName, args }));
export const createNgModule = makeMetadataFactory('NgModule', (ngModule) => ngModule);
export const createInjectable = makeMetadataFactory('Injectable', (injectable = {}) => injectable);
export const CUSTOM_ELEMENTS_SCHEMA = {
    name: 'custom-elements'
};
export const NO_ERRORS_SCHEMA = {
    name: 'no-errors-schema'
};
export const createOptional = makeMetadataFactory('Optional');
export const createSelf = makeMetadataFactory('Self');
export const createSkipSelf = makeMetadataFactory('SkipSelf');
export const createHost = makeMetadataFactory('Host');
export const Type = Function;
export var SecurityContext;
(function (SecurityContext) {
    SecurityContext[SecurityContext["NONE"] = 0] = "NONE";
    SecurityContext[SecurityContext["HTML"] = 1] = "HTML";
    SecurityContext[SecurityContext["STYLE"] = 2] = "STYLE";
    SecurityContext[SecurityContext["SCRIPT"] = 3] = "SCRIPT";
    SecurityContext[SecurityContext["URL"] = 4] = "URL";
    SecurityContext[SecurityContext["RESOURCE_URL"] = 5] = "RESOURCE_URL";
})(SecurityContext || (SecurityContext = {}));
export var MissingTranslationStrategy;
(function (MissingTranslationStrategy) {
    MissingTranslationStrategy[MissingTranslationStrategy["Error"] = 0] = "Error";
    MissingTranslationStrategy[MissingTranslationStrategy["Warning"] = 1] = "Warning";
    MissingTranslationStrategy[MissingTranslationStrategy["Ignore"] = 2] = "Ignore";
})(MissingTranslationStrategy || (MissingTranslationStrategy = {}));
function makeMetadataFactory(name, props) {
    // This must be declared as a function, not a fat arrow, so that ES2015 devmode produces code
    // that works with the static_reflector.ts in the ViewEngine compiler.
    // In particular, `_registerDecoratorOrConstructor` assumes that the value returned here can be
    // new'ed.
    function factory(...args) {
        const values = props ? props(...args) : {};
        return Object.assign({ ngMetadataName: name }, values);
    }
    factory.isTypeOf = (obj) => obj && obj.ngMetadataName === name;
    factory.ngMetadataName = name;
    return factory;
}
function parserSelectorToSimpleSelector(selector) {
    const classes = selector.classNames && selector.classNames.length ?
        [8 /* CLASS */, ...selector.classNames] :
        [];
    const elementName = selector.element && selector.element !== '*' ? selector.element : '';
    return [elementName, ...selector.attrs, ...classes];
}
function parserSelectorToNegativeSelector(selector) {
    const classes = selector.classNames && selector.classNames.length ?
        [8 /* CLASS */, ...selector.classNames] :
        [];
    if (selector.element) {
        return [
            1 /* NOT */ | 4 /* ELEMENT */, selector.element, ...selector.attrs, ...classes
        ];
    }
    else if (selector.attrs.length) {
        return [1 /* NOT */ | 2 /* ATTRIBUTE */, ...selector.attrs, ...classes];
    }
    else {
        return selector.classNames && selector.classNames.length ?
            [1 /* NOT */ | 8 /* CLASS */, ...selector.classNames] :
            [];
    }
}
function parserSelectorToR3Selector(selector) {
    const positive = parserSelectorToSimpleSelector(selector);
    const negative = selector.notSelectors && selector.notSelectors.length ?
        selector.notSelectors.map(notSelector => parserSelectorToNegativeSelector(notSelector)) :
        [];
    return positive.concat(...negative);
}
export function parseSelectorToR3Selector(selector) {
    return selector ? CssSelector.parse(selector).map(parserSelectorToR3Selector) : [];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyL3NyYy9jb3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILGFBQWE7QUFDYiwyREFBMkQ7QUFDM0QsOEVBQThFO0FBQzlFLHdFQUF3RTtBQUN4RSxpQ0FBaUM7QUFFakMsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLFlBQVksQ0FBQztBQUt2QyxNQUFNLENBQUMsTUFBTSxZQUFZLEdBQUcsbUJBQW1CLENBQVMsUUFBUSxFQUFFLENBQUMsS0FBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzdGLE1BQU0sQ0FBQyxNQUFNLG9CQUFvQixHQUFHLG1CQUFtQixDQUNuRCxnQkFBZ0IsRUFBRSxDQUFDLElBQVksRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBQyxDQUFDLENBQUMsQ0FBQztBQUszRSxNQUFNLENBQUMsTUFBTSxlQUFlLEdBQ3hCLG1CQUFtQixDQUFZLFdBQVcsRUFBRSxDQUFDLGFBQXFCLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBQyxhQUFhLEVBQUMsQ0FBQyxDQUFDLENBQUM7QUFFOUYsa0dBQWtHO0FBQ2xHLGtCQUFrQjtBQUNsQixNQUFNLENBQUMsTUFBTSxtQ0FBbUMsR0FBRyxJQUFJLENBQUM7QUFheEQsTUFBTSxDQUFDLE1BQU0scUJBQXFCLEdBQUcsbUJBQW1CLENBQ3BELGlCQUFpQixFQUFFLENBQUMsUUFBYyxFQUFFLE9BQVksRUFBRSxFQUFFLEVBQUUsQ0FBQyxpQkFDbEMsUUFBUSxFQUNSLEtBQUssRUFBRSxLQUFLLEVBQ1osV0FBVyxFQUFFLEtBQUssRUFDbEIsV0FBVyxFQUFFLEtBQUssRUFDbEIsdUJBQXVCLEVBQUUsbUNBQW1DLElBQ3pELElBQUks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b3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuLy8gQXR0ZW50aW9uOlxuLy8gVGhpcyBmaWxlIGR1cGxpY2F0ZXMgdHlwZXMgYW5kIHZhbHVlcyBmcm9tIEBhbmd1bGFyL2NvcmVcbi8vIHNvIHRoYXQgd2UgYXJlIGFibGUgdG8gbWFrZSBAYW5ndWxhci9jb21waWxlciBpbmRlcGVuZGVudCBvZiBAYW5ndWxhci9jb3JlLlxuLy8gVGhpcyBpcyBpbXBvcnRhbnQgdG8gcHJldmVudCBhIGJ1aWxkIGN5Y2xlLCBhcyBAYW5ndWxhci9jb3JlIG5lZWRzIHRvXG4vLyBiZSBjb21waWxlZCB3aXRoIHRoZSBjb21waWxlci5cblxuaW1wb3J0IHtDc3NTZWxlY3Rvcn0gZnJvbSAnLi9zZWxlY3Rvcic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSW5qZWN0IHtcbiAgdG9rZW46IGFueTtcbn1cbmV4cG9ydCBjb25zdCBjcmVhdGVJbmplY3QgPSBtYWtlTWV0YWRhdGFGYWN0b3J5PEluamVjdD4oJ0luamVjdCcsICh0b2tlbjogYW55KSA9PiAoe3Rva2VufSkpO1xuZXhwb3J0IGNvbnN0IGNyZWF0ZUluamVjdGlvblRva2VuID0gbWFrZU1ldGFkYXRhRmFjdG9yeTxvYmplY3Q+KFxuICAgICdJbmplY3Rpb25Ub2tlbicsIChkZXNjOiBzdHJpbmcpID0+ICh7X2Rlc2M6IGRlc2MsIMm1cHJvdjogdW5kZWZpbmVkfSkpO1xuXG5leHBvcnQgaW50ZXJmYWNlIEF0dHJpYnV0ZSB7XG4gIGF0dHJpYnV0ZU5hbWU6IHN0cmluZztcbn1cbmV4cG9ydCBjb25zdCBjcmVhdGVBdHRyaWJ1dGUgPVxuICAgIG1ha2VNZXRhZGF0YUZhY3Rvcnk8QXR0cmlidXRlPignQXR0cmlidXRlJywgKGF0dHJpYnV0ZU5hbWU6IHN0cmluZykgPT4gKHthdHRyaWJ1dGVOYW1lfSkpO1xuXG4vLyBTdG9yZXMgdGhlIGRlZmF1bHQgdmFsdWUgb2YgYGVtaXREaXN0aW5jdENoYW5nZXNPbmx5YCB3aGVuIHRoZSBgZW1pdERpc3RpbmN0Q2hhbmdlc09ubHlgIGlzIG5vdFxuLy8gZXhwbGljaXRseSBzZXQuXG5leHBvcnQgY29uc3QgZW1pdERpc3RpbmN0Q2hhbmdlc09ubHlEZWZhdWx0VmFsdWUgPSB0cnVlO1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgUXVlcnkge1xuICBkZXNjZW5kYW50czogYm9vbGVhbjtcbiAgZmlyc3Q6IGJvb2xlYW47XG4gIHJlYWQ6IGFueTtcbiAgaXNWaWV3UXVlcnk6IGJvb2xlYW47XG4gIHNlbGVjdG9yOiBhbnk7XG4gIHN0YXRpYz86IGJvb2xlYW47XG4gIGVtaXREaXN0aW5jdENoYW5nZXNPbmx5OiBib29sZWFuO1xufVxuXG5leHBvcnQgY29uc3QgY3JlYXRlQ29udGVudENoaWxkcmVuID0gbWFrZU1ldGFkYXRhRmFjdG9yeTxRdWVyeT4oXG4gICAgJ0NvbnRlbnRDaGlsZHJlbicsIChzZWxlY3Rvcj86IGFueSwgZGF0YTogYW55ID0ge30pID0+ICh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3IsXG4gICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3Q6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgIGlzVmlld1F1ZXJ5OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjZW5kYW50czogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgZW1pdERpc3RpbmN0Q2hhbmdlc09ubHk6IGVtaXREaXN0aW5jdENoYW5nZXNPbmx5RGVmYXVsdFZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgIC4uLmRhdGFcbiAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuZXhwb3J0IGNvbnN0IGNyZWF0ZUNvbnRlbnRDaGlsZCA9IG1ha2VNZXRhZGF0YUZhY3Rvcnk8UXVlcnk+KFxuICAgICdDb250ZW50Q2hpbGQnLFxuICAgIChzZWxlY3Rvcj86IGFueSwgZGF0YTogYW55ID0ge30pID0+XG4gICAgICAgICh7c2VsZWN0b3IsIGZpcnN0OiB0cnVlLCBpc1ZpZXdRdWVyeTogZmFsc2UsIGRlc2NlbmRhbnRzOiB0cnVlLCAuLi5kYXRhfSkpO1xuZXhwb3J0IGNvbnN0IGNyZWF0ZVZpZXdDaGlsZHJlbiA9IG1ha2VNZXRhZGF0YUZhY3Rvcnk8UXVlcnk+KFxuICAgICdWaWV3Q2hpbGRyZW4nLCAoc2VsZWN0b3I/OiBhbnksIGRhdGE6IGFueSA9IHt9KSA9PiAoe1xuICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yLFxuICAgICAgICAgICAgICAgICAgICAgIGZpcnN0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICBpc1ZpZXdRdWVyeTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICBkZXNjZW5kYW50czogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICBlbWl0RGlzdGluY3RDaGFuZ2VzT25seTogZW1pdERpc3RpbmN0Q2hhbmdlc09ubHlEZWZhdWx0VmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgLi4uZGF0YVxuICAgICAgICAgICAgICAgICAgICB9KSk7XG5leHBvcnQgY29uc3QgY3JlYXRlVmlld0NoaWxkID0gbWFrZU1ldGFkYXRhRmFjdG9yeTxRdWVyeT4oXG4gICAgJ1ZpZXdDaGlsZCcsXG4gICAgKHNlbGVjdG9yOiBhbnksIGRhdGE6IGFueSkgPT5cbiAgICAgICAgKHtzZWxlY3RvciwgZmlyc3Q6IHRydWUsIGlzVmlld1F1ZXJ5OiB0cnVlLCBkZXNjZW5kYW50czogdHJ1ZSwgLi4uZGF0YX0pKTtcblxuZXhwb3J0IGludGVyZmFjZSBEaXJlY3RpdmUge1xuICBzZWxlY3Rvcj86IHN0cmluZztcbiAgaW5wdXRzPzogc3RyaW5nW107XG4gIG91dHB1dHM/OiBzdHJpbmdbXTtcbiAgaG9zdD86IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9O1xuICBwcm92aWRlcnM/OiBQcm92aWRlcltdO1xuICBleHBvcnRBcz86IHN0cmluZztcbiAgcXVlcmllcz86IHtba2V5OiBzdHJpbmddOiBhbnl9O1xuICBndWFyZHM/OiB7W2tleTogc3RyaW5nXTogYW55fTtcbn1cbmV4cG9ydCBjb25zdCBjcmVhdGVEaXJlY3RpdmUgPVxuICAgIG1ha2VNZXRhZGF0YUZhY3Rvcnk8RGlyZWN0aXZlPignRGlyZWN0aXZlJywgKGRpcjogRGlyZWN0aXZlID0ge30pID0+IGRpcik7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29tcG9uZW50IGV4dGVuZHMgRGlyZWN0aXZlIHtcbiAgY2hhbmdlRGV0ZWN0aW9uPzogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3k7XG4gIHZpZXdQcm92aWRlcnM/OiBQcm92aWRlcltdO1xuICBtb2R1bGVJZD86IHN0cmluZztcbiAgdGVtcGxhdGVVcmw/OiBzdHJpbmc7XG4gIHRlbXBsYXRlPzogc3RyaW5nO1xuICBzdHlsZVVybHM/OiBzdHJpbmdbXTtcbiAgc3R5bGVzPzogc3RyaW5nW107XG4gIGFuaW1hdGlvbnM/OiBhbnlbXTtcbiAgZW5jYXBzdWxhdGlvbj86IFZpZXdFbmNhcHN1bGF0aW9uO1xuICBpbnRlcnBvbGF0aW9uPzogW3N0cmluZywgc3RyaW5nXTtcbiAgZW50cnlDb21wb25lbnRzPzogQXJyYXk8VHlwZXxhbnlbXT47XG4gIHByZXNlcnZlV2hpdGVzcGFjZXM/OiBib29sZWFuO1xufVxuZXhwb3J0IGVudW0gVmlld0VuY2Fwc3VsYXRpb24ge1xuICBFbXVsYXRlZCA9IDAsXG4gIC8vIEhpc3RvcmljYWxseSB0aGUgMSB2YWx1ZSB3YXMgZm9yIGBOYXRpdmVgIGVuY2Fwc3VsYXRpb24gd2hpY2ggaGFzIGJlZW4gcmVtb3ZlZCBhcyBvZiB2MTEuXG4gIE5vbmUgPSAyLFxuICBTaGFkb3dEb20gPSAzXG59XG5cbmV4cG9ydCBlbnVtIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IHtcbiAgT25QdXNoID0gMCxcbiAgRGVmYXVsdCA9IDFcbn1cblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUNvbXBvbmVudCA9IG1ha2VNZXRhZGF0YUZhY3Rvcnk8Q29tcG9uZW50PihcbiAgICAnQ29tcG9uZW50JywgKGM6IENvbXBvbmVudCA9IHt9KSA9PiAoe2NoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdCwgLi4uY30pKTtcblxuZXhwb3J0IGludGVyZmFjZSBQaXBlIHtcbiAgbmFtZTogc3RyaW5nO1xuICBwdXJlPzogYm9vbGVhbjtcbn1cbmV4cG9ydCBjb25zdCBjcmVhdGVQaXBlID0gbWFrZU1ldGFkYXRhRmFjdG9yeTxQaXBlPignUGlwZScsIChwOiBQaXBlKSA9PiAoe3B1cmU6IHRydWUsIC4uLnB9KSk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSW5wdXQge1xuICBiaW5kaW5nUHJvcGVydHlOYW1lPzogc3RyaW5nO1xufVxuZXhwb3J0IGNvbnN0IGNyZWF0ZUlucHV0ID1cbiAgICBtYWtlTWV0YWRhdGFGYWN0b3J5PElucHV0PignSW5wdXQnLCAoYmluZGluZ1Byb3BlcnR5TmFtZT86IHN0cmluZykgPT4gKHtiaW5kaW5nUHJvcGVydHlOYW1lfSkpO1xuXG5leHBvcnQgaW50ZXJmYWNlIE91dHB1dCB7XG4gIGJpbmRpbmdQcm9wZXJ0eU5hbWU/OiBzdHJpbmc7XG59XG5leHBvcnQgY29uc3QgY3JlYXRlT3V0cHV0ID0gbWFrZU1ldGFkYXRhRmFjdG9yeTxPdXRwdXQ+KFxuICAgICdPdXRwdXQnLCAoYmluZGluZ1Byb3BlcnR5TmFtZT86IHN0cmluZykgPT4gKHtiaW5kaW5nUHJvcGVydHlOYW1lfSkpO1xuXG5leHBvcnQgaW50ZXJmYWNlIEhvc3RCaW5kaW5nIHtcbiAgaG9zdFByb3BlcnR5TmFtZT86IHN0cmluZztcbn1cbmV4cG9ydCBjb25zdCBjcmVhdGVIb3N0QmluZGluZyA9IG1ha2VNZXRhZGF0YUZhY3Rvcnk8SG9zdEJpbmRpbmc+KFxuICAgICdIb3N0QmluZGluZycsIChob3N0UHJvcGVydHlOYW1lPzogc3RyaW5nKSA9PiAoe2hvc3RQcm9wZXJ0eU5hbWV9KSk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSG9zdExpc3RlbmVyIHtcbiAgZXZlbnROYW1lPzogc3RyaW5nO1xuICBhcmdzPzogc3RyaW5nW107XG59XG5leHBvcnQgY29uc3QgY3JlYXRlSG9zdExpc3RlbmVyID0gbWFrZU1ldGFkYXRhRmFjdG9yeTxIb3N0TGlzdGVuZXI+KFxuICAgICdIb3N0TGlzdGVuZXInLCAoZXZlbnROYW1lPzogc3RyaW5nLCBhcmdzPzogc3RyaW5nW10pID0+ICh7ZXZlbnROYW1lLCBhcmdzfSkpO1xuXG5leHBvcnQgaW50ZXJmYWNlIE5nTW9kdWxlIHtcbiAgcHJvdmlkZXJzPzogUHJvdmlkZXJbXTtcbiAgZGVjbGFyYXRpb25zPzogQXJyYXk8VHlwZXxhbnlbXT47XG4gIGltcG9ydHM/OiBBcnJheTxUeXBlfE1vZHVsZVdpdGhQcm92aWRlcnN8YW55W10+O1xuICBleHBvcnRzPzogQXJyYXk8VHlwZXxhbnlbXT47XG4gIGVudHJ5Q29tcG9uZW50cz86IEFycmF5PFR5cGV8YW55W10+O1xuICBib290c3RyYXA/OiBBcnJheTxUeXBlfGFueVtdPjtcbiAgc2NoZW1hcz86IEFycmF5PFNjaGVtYU1ldGFkYXRhfGFueVtdPjtcbiAgaWQ/OiBzdHJpbmc7XG59XG5leHBvcnQgY29uc3QgY3JlYXRlTmdNb2R1bGUgPVxuICAgIG1ha2VNZXRhZGF0YUZhY3Rvcnk8TmdNb2R1bGU+KCdOZ01vZHVsZScsIChuZ01vZHVsZTogTmdNb2R1bGUpID0+IG5nTW9kdWxlKTtcblxuZXhwb3J0IGludGVyZmFjZSBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgbmdNb2R1bGU6IFR5cGU7XG4gIHByb3ZpZGVycz86IFByb3ZpZGVyW107XG59XG5leHBvcnQgaW50ZXJmYWNlIEluamVjdGFibGUge1xuICBwcm92aWRlZEluPzogVHlwZXwncm9vdCd8YW55O1xuICB1c2VDbGFzcz86IFR5cGV8YW55O1xuICB1c2VFeGlzdGluZz86IFR5cGV8YW55O1xuICB1c2VWYWx1ZT86IGFueTtcbiAgdXNlRmFjdG9yeT86IFR5cGV8YW55O1xuICBkZXBzPzogQXJyYXk8VHlwZXxhbnlbXT47XG59XG5leHBvcnQgY29uc3QgY3JlYXRlSW5qZWN0YWJsZSA9XG4gICAgbWFrZU1ldGFkYXRhRmFjdG9yeSgnSW5qZWN0YWJsZScsIChpbmplY3RhYmxlOiBJbmplY3RhYmxlID0ge30pID0+IGluamVjdGFibGUpO1xuZXhwb3J0IGludGVyZmFjZSBTY2hlbWFNZXRhZGF0YSB7XG4gIG5hbWU6IHN0cmluZztcbn1cblxuZXhwb3J0IGNvbnN0IENVU1RPTV9FTEVNRU5UU19TQ0hFTUE6IFNjaGVtYU1ldGFkYXRhID0ge1xuICBuYW1lOiAnY3VzdG9tLWVsZW1lbnRzJ1xufTtcblxuZXhwb3J0IGNvbnN0IE5PX0VSUk9SU19TQ0hFTUE6IFNjaGVtYU1ldGFkYXRhID0ge1xuICBuYW1lOiAnbm8tZXJyb3JzLXNjaGVtYSdcbn07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVPcHRpb25hbCA9IG1ha2VNZXRhZGF0YUZhY3RvcnkoJ09wdGlvbmFsJyk7XG5leHBvcnQgY29uc3QgY3JlYXRlU2VsZiA9IG1ha2VNZXRhZGF0YUZhY3RvcnkoJ1NlbGYnKTtcbmV4cG9ydCBjb25zdCBjcmVhdGVTa2lwU2VsZiA9IG1ha2VNZXRhZGF0YUZhY3RvcnkoJ1NraXBTZWxmJyk7XG5leHBvcnQgY29uc3QgY3JlYXRlSG9zdCA9IG1ha2VNZXRhZGF0YUZhY3RvcnkoJ0hvc3QnKTtcblxuZXhwb3J0IGludGVyZmFjZSBUeXBlIGV4dGVuZHMgRnVuY3Rpb24ge1xuICBuZXcoLi4uYXJnczogYW55W10pOiBhbnk7XG59XG5leHBvcnQgY29uc3QgVHlwZSA9IEZ1bmN0aW9uO1xuXG5leHBvcnQgZW51bSBTZWN1cml0eUNvbnRleHQge1xuICBOT05FID0gMCxcbiAgSFRNTCA9IDEsXG4gIFNUWUxFID0gMixcbiAgU0NSSVBUID0gMyxcbiAgVVJMID0gNCxcbiAgUkVTT1VSQ0VfVVJMID0gNSxcbn1cblxuZXhwb3J0IHR5cGUgUHJvdmlkZXIgPSBhbnk7XG5cbmV4cG9ydCBjb25zdCBlbnVtIE5vZGVGbGFncyB7XG4gIE5vbmUgPSAwLFxuICBUeXBlRWxlbWVudCA9IDEgPDwgMCxcbiAgVHlwZVRleHQgPSAxIDw8IDEsXG4gIFByb2plY3RlZFRlbXBsYXRlID0gMSA8PCAyLFxuICBDYXRSZW5kZXJOb2RlID0gVHlwZUVsZW1lbnQgfCBUeXBlVGV4dCxcbiAgVHlwZU5nQ29udGVudCA9IDEgPDwgMyxcbiAgVHlwZVBpcGUgPSAxIDw8IDQsXG4gIFR5cGVQdXJlQXJyYXkgPSAxIDw8IDUsXG4gIFR5cGVQdXJlT2JqZWN0ID0gMSA8PCA2LFxuICBUeXBlUHVyZVBpcGUgPSAxIDw8IDcsXG4gIENhdFB1cmVFeHByZXNzaW9uID0gVHlwZVB1cmVBcnJheSB8IFR5cGVQdXJlT2JqZWN0IHwgVHlwZVB1cmVQaXBlLFxuICBUeXBlVmFsdWVQcm92aWRlciA9IDEgPDwgOCxcbiAgVHlwZUNsYXNzUHJvdmlkZXIgPSAxIDw8IDksXG4gIFR5cGVGYWN0b3J5UHJvdmlkZXIgPSAxIDw8IDEwLFxuICBUeXBlVXNlRXhpc3RpbmdQcm92aWRlciA9IDEgPDwgMTEsXG4gIExhenlQcm92aWRlciA9IDEgPDwgMTIsXG4gIFByaXZhdGVQcm92aWRlciA9IDEgPDwgMTMsXG4gIFR5cGVEaXJlY3RpdmUgPSAxIDw8IDE0LFxuICBDb21wb25lbnQgPSAxIDw8IDE1LFxuICBDYXRQcm92aWRlck5vRGlyZWN0aXZlID1cbiAgICAgIFR5cGVWYWx1ZVByb3ZpZGVyIHwgVHlwZUNsYXNzUHJvdmlkZXIgfCBUeXBlRmFjdG9yeVByb3ZpZGVyIHwgVHlwZVVzZUV4aXN0aW5nUHJvdmlkZXIsXG4gIENhdFByb3ZpZGVyID0gQ2F0UHJvdmlkZXJOb0RpcmVjdGl2ZSB8IFR5cGVEaXJlY3RpdmUsXG4gIE9uSW5pdCA9IDEgPDwgMTYsXG4gIE9uRGVzdHJveSA9IDEgPDwgMTcsXG4gIERvQ2hlY2sgPSAxIDw8IDE4LFxuICBPbkNoYW5nZXMgPSAxIDw8IDE5LFxuICBBZnRlckNvbnRlbnRJbml0ID0gMSA8PCAyMCxcbiAgQWZ0ZXJDb250ZW50Q2hlY2tlZCA9IDEgPDwgMjEsXG4gIEFmdGVyVmlld0luaXQgPSAxIDw8IDIyLFxuICBBZnRlclZpZXdDaGVja2VkID0gMSA8PCAyMyxcbiAgRW1iZWRkZWRWaWV3cyA9IDEgPDwgMjQsXG4gIENvbXBvbmVudFZpZXcgPSAxIDw8IDI1LFxuICBUeXBlQ29udGVudFF1ZXJ5ID0gMSA8PCAyNixcbiAgVHlwZVZpZXdRdWVyeSA9IDEgPDwgMjcsXG4gIFN0YXRpY1F1ZXJ5ID0gMSA8PCAyOCxcbiAgRHluYW1pY1F1ZXJ5ID0gMSA8PCAyOSxcbiAgVHlwZU1vZHVsZVByb3ZpZGVyID0gMSA8PCAzMCxcbiAgRW1pdERpc3RpbmN0Q2hhbmdlc09ubHkgPSAxIDw8IDMxLFxuICBDYXRRdWVyeSA9IFR5cGVDb250ZW50UXVlcnkgfCBUeXBlVmlld1F1ZXJ5LFxuXG4gIC8vIG11dHVhbGx5IGV4Y2x1c2l2ZSB2YWx1ZXMuLi5cbiAgVHlwZXMgPSBDYXRSZW5kZXJOb2RlIHwgVHlwZU5nQ29udGVudCB8IFR5cGVQaXBlIHwgQ2F0UHVyZUV4cHJlc3Npb24gfCBDYXRQcm92aWRlciB8IENhdFF1ZXJ5XG59XG5cbmV4cG9ydCBjb25zdCBlbnVtIERlcEZsYWdzIHtcbiAgTm9uZSA9IDAsXG4gIFNraXBTZWxmID0gMSA8PCAwLFxuICBPcHRpb25hbCA9IDEgPDwgMSxcbiAgU2VsZiA9IDEgPDwgMixcbiAgVmFsdWUgPSAxIDw8IDMsXG59XG5cbi8qKlxuICogSW5qZWN0aW9uIGZsYWdzIGZvciBESS5cbiAqL1xuZXhwb3J0IGNvbnN0IGVudW0gSW5qZWN0RmxhZ3Mge1xuICBEZWZhdWx0ID0gMCxcblxuICAvKipcbiAgICogU3BlY2lmaWVzIHRoYXQgYW4gaW5qZWN0b3Igc2hvdWxkIHJldHJpZXZlIGEgZGVwZW5kZW5jeSBmcm9tIGFueSBpbmplY3RvciB1bnRpbCByZWFjaGluZyB0aGVcbiAgICogaG9zdCBlbGVtZW50IG9mIHRoZSBjdXJyZW50IGNvbXBvbmVudC4gKE9ubHkgdXNlZCB3aXRoIEVsZW1lbnQgSW5qZWN0b3IpXG4gICAqL1xuICBIb3N0ID0gMSA8PCAwLFxuICAvKiogRG9uJ3QgZGVzY2VuZCBpbnRvIGFuY2VzdG9ycyBvZiB0aGUgbm9kZSByZXF1ZXN0aW5nIGluamVjdGlvbi4gKi9cbiAgU2VsZiA9IDEgPDwgMSxcbiAgLyoqIFNraXAgdGhlIG5vZGUgdGhhdCBpcyByZXF1ZXN0aW5nIGluamVjdGlvbi4gKi9cbiAgU2tpcFNlbGYgPSAxIDw8IDIsXG4gIC8qKiBJbmplY3QgYGRlZmF1bHRWYWx1ZWAgaW5zdGVhZCBpZiB0b2tlbiBub3QgZm91bmQuICovXG4gIE9wdGlvbmFsID0gMSA8PCAzLFxuICAvKipcbiAgICogVGhpcyB0b2tlbiBpcyBiZWluZyBpbmplY3RlZCBpbnRvIGEgcGlwZS5cbiAgICogQGludGVybmFsXG4gICAqL1xuICBGb3JQaXBlID0gMSA8PCA0LFxufVxuXG5leHBvcnQgY29uc3QgZW51bSBBcmd1bWVudFR5cGUge1xuICBJbmxpbmUgPSAwLFxuICBEeW5hbWljID0gMVxufVxuXG5leHBvcnQgY29uc3QgZW51bSBCaW5kaW5nRmxhZ3Mge1xuICBUeXBlRWxlbWVudEF0dHJpYnV0ZSA9IDEgPDwgMCxcbiAgVHlwZUVsZW1lbnRDbGFzcyA9IDEgPDwgMSxcbiAgVHlwZUVsZW1lbnRTdHlsZSA9IDEgPDwgMixcbiAgVHlwZVByb3BlcnR5ID0gMSA8PCAzLFxuICBTeW50aGV0aWNQcm9wZXJ0eSA9IDEgPDwgNCxcbiAgU3ludGhldGljSG9zdFByb3BlcnR5ID0gMSA8PCA1LFxuICBDYXRTeW50aGV0aWNQcm9wZXJ0eSA9IFN5bnRoZXRpY1Byb3BlcnR5IHwgU3ludGhldGljSG9zdFByb3BlcnR5LFxuXG4gIC8vIG11dHVhbGx5IGV4Y2x1c2l2ZSB2YWx1ZXMuLi5cbiAgVHlwZXMgPSBUeXBlRWxlbWVudEF0dHJpYnV0ZSB8IFR5cGVFbGVtZW50Q2xhc3MgfCBUeXBlRWxlbWVudFN0eWxlIHwgVHlwZVByb3BlcnR5XG59XG5cbmV4cG9ydCBjb25zdCBlbnVtIFF1ZXJ5QmluZGluZ1R5cGUge1xuICBGaXJzdCA9IDAsXG4gIEFsbCA9IDFcbn1cblxuZXhwb3J0IGNvbnN0IGVudW0gUXVlcnlWYWx1ZVR5cGUge1xuICBFbGVtZW50UmVmID0gMCxcbiAgUmVuZGVyRWxlbWVudCA9IDEsXG4gIFRlbXBsYXRlUmVmID0gMixcbiAgVmlld0NvbnRhaW5lclJlZiA9IDMsXG4gIFByb3ZpZGVyID0gNFxufVxuXG5leHBvcnQgY29uc3QgZW51bSBWaWV3RmxhZ3Mge1xuICBOb25lID0gMCxcbiAgT25QdXNoID0gMSA8PCAxLFxufVxuXG5leHBvcnQgZW51bSBNaXNzaW5nVHJhbnNsYXRpb25TdHJhdGVneSB7XG4gIEVycm9yID0gMCxcbiAgV2FybmluZyA9IDEsXG4gIElnbm9yZSA9IDIsXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWV0YWRhdGFGYWN0b3J5PFQ+IHtcbiAgKC4uLmFyZ3M6IGFueVtdKTogVDtcbiAgaXNUeXBlT2Yob2JqOiBhbnkpOiBvYmogaXMgVDtcbiAgbmdNZXRhZGF0YU5hbWU6IHN0cmluZztcbn1cblxuZnVuY3Rpb24gbWFrZU1ldGFkYXRhRmFjdG9yeTxUPihuYW1lOiBzdHJpbmcsIHByb3BzPzogKC4uLmFyZ3M6IGFueVtdKSA9PiBUKTogTWV0YWRhdGFGYWN0b3J5PFQ+IHtcbiAgLy8gVGhpcyBtdXN0IGJlIGRlY2xhcmVkIGFzIGEgZnVuY3Rpb24sIG5vdCBhIGZhdCBhcnJvdywgc28gdGhhdCBFUzIwMTUgZGV2bW9kZSBwcm9kdWNlcyBjb2RlXG4gIC8vIHRoYXQgd29ya3Mgd2l0aCB0aGUgc3RhdGljX3JlZmxlY3Rvci50cyBpbiB0aGUgVmlld0VuZ2luZSBjb21waWxlci5cbiAgLy8gSW4gcGFydGljdWxhciwgYF9yZWdpc3RlckRlY29yYXRvck9yQ29uc3RydWN0b3JgIGFzc3VtZXMgdGhhdCB0aGUgdmFsdWUgcmV0dXJuZWQgaGVyZSBjYW4gYmVcbiAgLy8gbmV3J2VkLlxuICBmdW5jdGlvbiBmYWN0b3J5KC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgY29uc3QgdmFsdWVzID0gcHJvcHMgPyBwcm9wcyguLi5hcmdzKSA6IHt9O1xuICAgIHJldHVybiB7XG4gICAgICBuZ01ldGFkYXRhTmFtZTogbmFtZSxcbiAgICAgIC4uLnZhbHVlcyxcbiAgICB9O1xuICB9XG4gIChmYWN0b3J5IGFzIGFueSkuaXNUeXBlT2YgPSAob2JqOiBhbnkpID0+IG9iaiAmJiBvYmoubmdNZXRhZGF0YU5hbWUgPT09IG5hbWU7XG4gIChmYWN0b3J5IGFzIGFueSkubmdNZXRhZGF0YU5hbWUgPSBuYW1lO1xuICByZXR1cm4gZmFjdG9yeSBhcyBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUm91dGUge1xuICBjaGlsZHJlbj86IFJvdXRlW107XG4gIGxvYWRDaGlsZHJlbj86IHN0cmluZ3xUeXBlfGFueTtcbn1cblxuLyoqXG4gKiBGbGFncyB1c2VkIHRvIGdlbmVyYXRlIFIzLXN0eWxlIENTUyBTZWxlY3RvcnMuIFRoZXkgYXJlIHBhc3RlZCBmcm9tXG4gKiBjb3JlL3NyYy9yZW5kZXIzL3Byb2plY3Rpb24udHMgYmVjYXVzZSB0aGV5IGNhbm5vdCBiZSByZWZlcmVuY2VkIGRpcmVjdGx5LlxuICovXG5leHBvcnQgY29uc3QgZW51bSBTZWxlY3RvckZsYWdzIHtcbiAgLyoqIEluZGljYXRlcyB0aGlzIGlzIHRoZSBiZWdpbm5pbmcgb2YgYSBuZXcgbmVnYXRpdmUgc2VsZWN0b3IgKi9cbiAgTk9UID0gMGIwMDAxLFxuXG4gIC8qKiBNb2RlIGZvciBtYXRjaGluZyBhdHRyaWJ1dGVzICovXG4gIEFUVFJJQlVURSA9IDBiMDAxMCxcblxuICAvKiogTW9kZSBmb3IgbWF0Y2hpbmcgdGFnIG5hbWVzICovXG4gIEVMRU1FTlQgPSAwYjAxMDAsXG5cbiAgLyoqIE1vZGUgZm9yIG1hdGNoaW5nIGNsYXNzIG5hbWVzICovXG4gIENMQVNTID0gMGIxMDAwLFxufVxuXG4vLyBUaGVzZSBhcmUgYSBjb3B5IHRoZSBDU1MgdHlwZXMgZnJvbSBjb3JlL3NyYy9yZW5kZXIzL2ludGVyZmFjZXMvcHJvamVjdGlvbi50c1xuLy8gVGhleSBhcmUgZHVwbGljYXRlZCBoZXJlIGFzIHRoZXkgY2Fubm90IGJlIGRpcmVjdGx5IHJlZmVyZW5jZWQgZnJvbSBjb3JlLlxuZXhwb3J0IHR5cGUgUjNDc3NTZWxlY3RvciA9IChzdHJpbmd8U2VsZWN0b3JGbGFncylbXTtcbmV4cG9ydCB0eXBlIFIzQ3NzU2VsZWN0b3JMaXN0ID0gUjNDc3NTZWxlY3RvcltdO1xuXG5mdW5jdGlvbiBwYXJzZXJTZWxlY3RvclRvU2ltcGxlU2VsZWN0b3Ioc2VsZWN0b3I6IENzc1NlbGVjdG9yKTogUjNDc3NTZWxlY3RvciB7XG4gIGNvbnN0IGNsYXNzZXMgPSBzZWxlY3Rvci5jbGFzc05hbWVzICYmIHNlbGVjdG9yLmNsYXNzTmFtZXMubGVuZ3RoID9cbiAgICAgIFtTZWxlY3RvckZsYWdzLkNMQVNTLCAuLi5zZWxlY3Rvci5jbGFzc05hbWVzXSA6XG4gICAgICBbXTtcbiAgY29uc3QgZWxlbWVudE5hbWUgPSBzZWxlY3Rvci5lbGVtZW50ICYmIHNlbGVjdG9yLmVsZW1lbnQgIT09ICcqJyA/IHNlbGVjdG9yLmVsZW1lbnQgOiAnJztcbiAgcmV0dXJuIFtlbGVtZW50TmFtZSwgLi4uc2VsZWN0b3IuYXR0cnMsIC4uLmNsYXNzZXNdO1xufVxuXG5mdW5jdGlvbiBwYXJzZXJTZWxlY3RvclRvTmVnYXRpdmVTZWxlY3RvcihzZWxlY3RvcjogQ3NzU2VsZWN0b3IpOiBSM0Nzc1NlbGVjdG9yIHtcbiAgY29uc3QgY2xhc3NlcyA9IHNlbGVjdG9yLmNsYXNzTmFtZXMgJiYgc2VsZWN0b3IuY2xhc3NOYW1lcy5sZW5ndGggP1xuICAgICAgW1NlbGVjdG9yRmxhZ3MuQ0xBU1MsIC4uLnNlbGVjdG9yLmNsYXNzTmFtZXNdIDpcbiAgICAgIFtdO1xuXG4gIGlmIChzZWxlY3Rvci5lbGVtZW50KSB7XG4gICAgcmV0dXJuIFtcbiAgICAgIFNlbGVjdG9yRmxhZ3MuTk9UIHwgU2VsZWN0b3JGbGFncy5FTEVNRU5ULCBzZWxlY3Rvci5lbGVtZW50LCAuLi5zZWxlY3Rvci5hdHRycywgLi4uY2xhc3Nlc1xuICAgIF07XG4gIH0gZWxzZSBpZiAoc2VsZWN0b3IuYXR0cnMubGVuZ3RoKSB7XG4gICAgcmV0dXJuIFtTZWxlY3RvckZsYWdzLk5PVCB8IFNlbGVjdG9yRmxhZ3MuQVRUUklCVVRFLCAuLi5zZWxlY3Rvci5hdHRycywgLi4uY2xhc3Nlc107XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHNlbGVjdG9yLmNsYXNzTmFtZXMgJiYgc2VsZWN0b3IuY2xhc3NOYW1lcy5sZW5ndGggP1xuICAgICAgICBbU2VsZWN0b3JGbGFncy5OT1QgfCBTZWxlY3RvckZsYWdzLkNMQVNTLCAuLi5zZWxlY3Rvci5jbGFzc05hbWVzXSA6XG4gICAgICAgIFtdO1xuICB9XG59XG5cbmZ1bmN0aW9uIHBhcnNlclNlbGVjdG9yVG9SM1NlbGVjdG9yKHNlbGVjdG9yOiBDc3NTZWxlY3Rvcik6IFIzQ3NzU2VsZWN0b3Ige1xuICBjb25zdCBwb3NpdGl2ZSA9IHBhcnNlclNlbGVjdG9yVG9TaW1wbGVTZWxlY3RvcihzZWxlY3Rvcik7XG5cbiAgY29uc3QgbmVnYXRpdmU6IFIzQ3NzU2VsZWN0b3JMaXN0ID0gc2VsZWN0b3Iubm90U2VsZWN0b3JzICYmIHNlbGVjdG9yLm5vdFNlbGVjdG9ycy5sZW5ndGggP1xuICAgICAgc2VsZWN0b3Iubm90U2VsZWN0b3JzLm1hcChub3RTZWxlY3RvciA9PiBwYXJzZXJTZWxlY3RvclRvTmVnYXRpdmVTZWxlY3Rvcihub3RTZWxlY3RvcikpIDpcbiAgICAgIFtdO1xuXG4gIHJldHVybiBwb3NpdGl2ZS5jb25jYXQoLi4ubmVnYXRpdmUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VTZWxlY3RvclRvUjNTZWxlY3RvcihzZWxlY3Rvcjogc3RyaW5nfG51bGwpOiBSM0Nzc1NlbGVjdG9yTGlzdCB7XG4gIHJldHVybiBzZWxlY3RvciA/IENzc1NlbGVjdG9yLnBhcnNlKHNlbGVjdG9yKS5tYXAocGFyc2VyU2VsZWN0b3JUb1IzU2VsZWN0b3IpIDogW107XG59XG5cbi8vIFBhc3RlZCBmcm9tIHJlbmRlcjMvaW50ZXJmYWNlcy9kZWZpbml0aW9uIHNpbmNlIGl0IGNhbm5vdCBiZSByZWZlcmVuY2VkIGRpcmVjdGx5XG4vKipcbiAqIEZsYWdzIHBhc3NlZCBpbnRvIHRlbXBsYXRlIGZ1bmN0aW9ucyB0byBkZXRlcm1pbmUgd2hpY2ggYmxvY2tzIChpLmUuIGNyZWF0aW9uLCB1cGRhdGUpXG4gKiBzaG91bGQgYmUgZXhlY3V0ZWQuXG4gKlxuICogVHlwaWNhbGx5LCBhIHRlbXBsYXRlIHJ1bnMgYm90aCB0aGUgY3JlYXRpb24gYmxvY2sgYW5kIHRoZSB1cGRhdGUgYmxvY2sgb24gaW5pdGlhbGl6YXRpb24gYW5kXG4gKiBzdWJzZXF1ZW50IHJ1bnMgb25seSBleGVjdXRlIHRoZSB1cGRhdGUgYmxvY2suIEhvd2V2ZXIsIGR5bmFtaWNhbGx5IGNyZWF0ZWQgdmlld3MgcmVxdWlyZSB0aGF0XG4gKiB0aGUgY3JlYXRpb24gYmxvY2sgYmUgZXhlY3V0ZWQgc2VwYXJhdGVseSBmcm9tIHRoZSB1cGRhdGUgYmxvY2sgKGZvciBiYWNrd2FyZHMgY29tcGF0KS5cbiAqL1xuZXhwb3J0IGNvbnN0IGVudW0gUmVuZGVyRmxhZ3Mge1xuICAvKiBXaGV0aGVyIHRvIHJ1biB0aGUgY3JlYXRpb24gYmxvY2sgKGUuZy4gY3JlYXRlIGVsZW1lbnRzIGFuZCBkaXJlY3RpdmVzKSAqL1xuICBDcmVhdGUgPSAwYjAxLFxuXG4gIC8qIFdoZXRoZXIgdG8gcnVuIHRoZSB1cGRhdGUgYmxvY2sgKGUuZy4gcmVmcmVzaCBiaW5kaW5ncykgKi9cbiAgVXBkYXRlID0gMGIxMFxufVxuXG4vLyBQYXN0ZWQgZnJvbSByZW5kZXIzL2ludGVyZmFjZXMvbm9kZS50c1xuLyoqXG4gKiBBIHNldCBvZiBtYXJrZXIgdmFsdWVzIHRvIGJlIHVzZWQgaW4gdGhlIGF0dHJpYnV0ZXMgYXJyYXlzLiBUaGVzZSBtYXJrZXJzIGluZGljYXRlIHRoYXQgc29tZVxuICogaXRlbXMgYXJlIG5vdCByZWd1bGFyIGF0dHJpYnV0ZXMgYW5kIHRoZSBwcm9jZXNzaW5nIHNob3VsZCBiZSBhZGFwdGVkIGFjY29yZGluZ2x5LlxuICovXG5leHBvcnQgY29uc3QgZW51bSBBdHRyaWJ1dGVNYXJrZXIge1xuICAvKipcbiAgICogTWFya2VyIGluZGljYXRlcyB0aGF0IHRoZSBmb2xsb3dpbmcgMyB2YWx1ZXMgaW4gdGhlIGF0dHJpYnV0ZXMgYXJyYXkgYXJlOlxuICAgKiBuYW1lc3BhY2VVcmksIGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZVZhbHVlXG4gICAqIGluIHRoYXQgb3JkZXIuXG4gICAqL1xuICBOYW1lc3BhY2VVUkkgPSAwLFxuXG4gIC8qKlxuICAgKiBTaWduYWxzIGNsYXNzIGRlY2xhcmF0aW9uLlxuICAgKlxuICAgKiBFYWNoIHZhbHVlIGZvbGxvd2luZyBgQ2xhc3Nlc2AgZGVzaWduYXRlcyBhIGNsYXNzIG5hbWUgdG8gaW5jbHVkZSBvbiB0aGUgZWxlbWVudC5cbiAgICogIyMgRXhhbXBsZTpcbiAgICpcbiAgICogR2l2ZW46XG4gICAqIGBgYFxuICAgKiA8ZGl2IGNsYXNzPVwiZm9vIGJhciBiYXpcIj4uLi48ZC92aT5cbiAgICogYGBgXG4gICAqXG4gICAqIHRoZSBnZW5lcmF0ZWQgY29kZSBpczpcbiAgICogYGBgXG4gICAqIHZhciBfYzEgPSBbQXR0cmlidXRlTWFya2VyLkNsYXNzZXMsICdmb28nLCAnYmFyJywgJ2JheiddO1xuICAgKiBgYGBcbiAgICovXG4gIENsYXNzZXMgPSAxLFxuXG4gIC8qKlxuICAgKiBTaWduYWxzIHN0eWxlIGRlY2xhcmF0aW9uLlxuICAgKlxuICAgKiBFYWNoIHBhaXIgb2YgdmFsdWVzIGZvbGxvd2luZyBgU3R5bGVzYCBkZXNpZ25hdGVzIGEgc3R5bGUgbmFtZSBhbmQgdmFsdWUgdG8gaW5jbHVkZSBvbiB0aGVcbiAgICogZWxlbWVudC5cbiAgICogIyMgRXhhbXBsZTpcbiAgICpcbiAgICogR2l2ZW46XG4gICAqIGBgYFxuICAgKiA8ZGl2IHN0eWxlPVwid2lkdGg6MTAwcHg7IGhlaWdodDoyMDBweDsgY29sb3I6cmVkXCI+Li4uPC9kaXY+XG4gICAqIGBgYFxuICAgKlxuICAgKiB0aGUgZ2VuZXJhdGVkIGNvZGUgaXM6XG4gICAqIGBgYFxuICAgKiB2YXIgX2MxID0gW0F0dHJpYnV0ZU1hcmtlci5TdHlsZXMsICd3aWR0aCcsICcxMDBweCcsICdoZWlnaHQnLiAnMjAwcHgnLCAnY29sb3InLCAncmVkJ107XG4gICAqIGBgYFxuICAgKi9cbiAgU3R5bGVzID0gMixcblxuICAvKipcbiAgICogU2lnbmFscyB0aGF0IHRoZSBmb2xsb3dpbmcgYXR0cmlidXRlIG5hbWVzIHdlcmUgZXh0cmFjdGVkIGZyb20gaW5wdXQgb3Igb3V0cHV0IGJpbmRpbmdzLlxuICAgKlxuICAgKiBGb3IgZXhhbXBsZSwgZ2l2ZW4gdGhlIGZvbGxvd2luZyBIVE1MOlxuICAgKlxuICAgKiBgYGBcbiAgICogPGRpdiBtb289XCJjYXJcIiBbZm9vXT1cImV4cFwiIChiYXIpPVwiZG9TdGgoKVwiPlxuICAgKiBgYGBcbiAgICpcbiAgICogdGhlIGdlbmVyYXRlZCBjb2RlIGlzOlxuICAgKlxuICAgKiBgYGBcbiAgICogdmFyIF9jMSA9IFsnbW9vJywgJ2NhcicsIEF0dHJpYnV0ZU1hcmtlci5CaW5kaW5ncywgJ2ZvbycsICdiYXInXTtcbiAgICogYGBgXG4gICAqL1xuICBCaW5kaW5ncyA9IDMsXG5cbiAgLyoqXG4gICAqIFNpZ25hbHMgdGhhdCB0aGUgZm9sbG93aW5nIGF0dHJpYnV0ZSBuYW1lcyB3ZXJlIGhvaXN0ZWQgZnJvbSBhbiBpbmxpbmUtdGVtcGxhdGUgZGVjbGFyYXRpb24uXG4gICAqXG4gICAqIEZvciBleGFtcGxlLCBnaXZlbiB0aGUgZm9sbG93aW5nIEhUTUw6XG4gICAqXG4gICAqIGBgYFxuICAgKiA8ZGl2ICpuZ0Zvcj1cImxldCB2YWx1ZSBvZiB2YWx1ZXM7IHRyYWNrQnk6dHJhY2tCeVwiIGRpckEgW2RpckJdPVwidmFsdWVcIj5cbiAgICogYGBgXG4gICAqXG4gICAqIHRoZSBnZW5lcmF0ZWQgY29kZSBmb3IgdGhlIGB0ZW1wbGF0ZSgpYCBpbnN0cnVjdGlvbiB3b3VsZCBpbmNsdWRlOlxuICAgKlxuICAgKiBgYGBcbiAgICogWydkaXJBJywgJycsIEF0dHJpYnV0ZU1hcmtlci5CaW5kaW5ncywgJ2RpckInLCBBdHRyaWJ1dGVNYXJrZXIuVGVtcGxhdGUsICduZ0ZvcicsICduZ0Zvck9mJyxcbiAgICogJ25nRm9yVHJhY2tCeScsICdsZXQtdmFsdWUnXVxuICAgKiBgYGBcbiAgICpcbiAgICogd2hpbGUgdGhlIGdlbmVyYXRlZCBjb2RlIGZvciB0aGUgYGVsZW1lbnQoKWAgaW5zdHJ1Y3Rpb24gaW5zaWRlIHRoZSB0ZW1wbGF0ZSBmdW5jdGlvbiB3b3VsZFxuICAgKiBpbmNsdWRlOlxuICAgKlxuICAgKiBgYGBcbiAgICogWydkaXJBJywgJycsIEF0dHJpYnV0ZU1hcmtlci5CaW5kaW5ncywgJ2RpckInXVxuICAgKiBgYGBcbiAgICovXG4gIFRlbXBsYXRlID0gNCxcblxuICAvKipcbiAgICogU2lnbmFscyB0aGF0IHRoZSBmb2xsb3dpbmcgYXR0cmlidXRlIGlzIGBuZ1Byb2plY3RBc2AgYW5kIGl0cyB2YWx1ZSBpcyBhIHBhcnNlZCBgQ3NzU2VsZWN0b3JgLlxuICAgKlxuICAgKiBGb3IgZXhhbXBsZSwgZ2l2ZW4gdGhlIGZvbGxvd2luZyBIVE1MOlxuICAgKlxuICAgKiBgYGBcbiAgICogPGgxIGF0dHI9XCJ2YWx1ZVwiIG5nUHJvamVjdEFzPVwiW3RpdGxlXVwiPlxuICAgKiBgYGBcbiAgICpcbiAgICogdGhlIGdlbmVyYXRlZCBjb2RlIGZvciB0aGUgYGVsZW1lbnQoKWAgaW5zdHJ1Y3Rpb24gd291bGQgaW5jbHVkZTpcbiAgICpcbiAgICogYGBgXG4gICAqIFsnYXR0cicsICd2YWx1ZScsIEF0dHJpYnV0ZU1hcmtlci5Qcm9qZWN0QXMsIFsnJywgJ3RpdGxlJywgJyddXVxuICAgKiBgYGBcbiAgICovXG4gIFByb2plY3RBcyA9IDUsXG5cbiAgLyoqXG4gICAqIFNpZ25hbHMgdGhhdCB0aGUgZm9sbG93aW5nIGF0dHJpYnV0ZSB3aWxsIGJlIHRyYW5zbGF0ZWQgYnkgcnVudGltZSBpMThuXG4gICAqXG4gICAqIEZvciBleGFtcGxlLCBnaXZlbiB0aGUgZm9sbG93aW5nIEhUTUw6XG4gICAqXG4gICAqIGBgYFxuICAgKiA8ZGl2IG1vbz1cImNhclwiIGZvbz1cInZhbHVlXCIgaTE4bi1mb28gW2Jhcl09XCJiaW5kaW5nXCIgaTE4bi1iYXI+XG4gICAqIGBgYFxuICAgKlxuICAgKiB0aGUgZ2VuZXJhdGVkIGNvZGUgaXM6XG4gICAqXG4gICAqIGBgYFxuICAgKiB2YXIgX2MxID0gWydtb28nLCAnY2FyJywgQXR0cmlidXRlTWFya2VyLkkxOG4sICdmb28nLCAnYmFyJ107XG4gICAqL1xuICBJMThuID0gNixcbn1cbiJdfQ==