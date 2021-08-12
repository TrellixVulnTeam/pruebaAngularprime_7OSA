import { __awaiter } from "tslib";
import { ComponentFactoryResolver, Inject, Injectable, NgZone, Optional, PLATFORM_ID } from '@angular/core';
import { of } from 'rxjs';
import { distinctUntilChanged, filter, groupBy, map, mergeMap, pairwise, startWith, switchMap } from 'rxjs/operators';
import { ActivationEnd, Router, ɵEmptyOutletComponent } from '@angular/router';
import { AngularFireAnalytics } from './analytics';
import { Title } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { UserTrackingService } from './user-tracking.service';
const FIREBASE_EVENT_ORIGIN_KEY = 'firebase_event_origin';
const FIREBASE_PREVIOUS_SCREEN_CLASS_KEY = 'firebase_previous_class';
const FIREBASE_PREVIOUS_SCREEN_INSTANCE_ID_KEY = 'firebase_previous_id';
const FIREBASE_PREVIOUS_SCREEN_NAME_KEY = 'firebase_previous_screen';
const FIREBASE_SCREEN_CLASS_KEY = 'firebase_screen_class';
const FIREBASE_SCREEN_INSTANCE_ID_KEY = 'firebase_screen_id';
const FIREBASE_SCREEN_NAME_KEY = 'firebase_screen';
const OUTLET_KEY = 'outlet';
const PAGE_PATH_KEY = 'page_path';
const PAGE_TITLE_KEY = 'page_title';
const SCREEN_CLASS_KEY = 'screen_class';
const SCREEN_NAME_KEY = 'screen_name';
const SCREEN_VIEW_EVENT = 'screen_view';
const EVENT_ORIGIN_AUTO = 'auto';
const SCREEN_INSTANCE_DELIMITER = '#';
// this is an INT64 in iOS/Android but use INT32 cause javascript
let nextScreenInstanceID = Math.floor(Math.random() * (Math.pow(2, 32) - 1)) - Math.pow(2, 31);
const knownScreenInstanceIDs = {};
const getScreenInstanceID = (params) => {
    // unique the screen class against the outlet name
    const screenInstanceKey = [
        params[SCREEN_CLASS_KEY],
        params[OUTLET_KEY]
    ].join(SCREEN_INSTANCE_DELIMITER);
    if (knownScreenInstanceIDs.hasOwnProperty(screenInstanceKey)) {
        return knownScreenInstanceIDs[screenInstanceKey];
    }
    else {
        const ret = nextScreenInstanceID++;
        knownScreenInstanceIDs[screenInstanceKey] = ret;
        return ret;
    }
};
const ɵ0 = getScreenInstanceID;
export class ScreenTrackingService {
    constructor(analytics, router, title, componentFactoryResolver, 
    // tslint:disable-next-line:ban-types
    platformId, zone, userTrackingService) {
        if (!router || !isPlatformBrowser(platformId)) {
            return this;
        }
        zone.runOutsideAngular(() => {
            const activationEndEvents = router.events.pipe(filter(e => e instanceof ActivationEnd));
            this.disposable = activationEndEvents.pipe(switchMap(activationEnd => {
                var _a;
                // router parseUrl is having trouble with outlets when they're empty
                // e.g, /asdf/1(bob://sally:asdf), so put another slash in when empty
                const urlTree = router.parseUrl(router.url.replace(/(?:\().+(?:\))/g, a => a.replace('://', ':///')));
                const pagePath = ((_a = urlTree.root.children[activationEnd.snapshot.outlet]) === null || _a === void 0 ? void 0 : _a.toString()) || '';
                const actualSnapshot = router.routerState.root.children.map(it => it).find(it => it.outlet === activationEnd.snapshot.outlet);
                if (!actualSnapshot) {
                    return of(null);
                }
                let actualDeep = actualSnapshot;
                while (actualDeep.firstChild) {
                    actualDeep = actualDeep.firstChild;
                }
                const screenName = actualDeep.pathFromRoot.map(s => { var _a; return (_a = s.routeConfig) === null || _a === void 0 ? void 0 : _a.path; }).filter(it => it).join('/') || '/';
                const params = {
                    [SCREEN_NAME_KEY]: screenName,
                    [PAGE_PATH_KEY]: `/${pagePath}`,
                    [FIREBASE_EVENT_ORIGIN_KEY]: EVENT_ORIGIN_AUTO,
                    [FIREBASE_SCREEN_NAME_KEY]: screenName,
                    [OUTLET_KEY]: activationEnd.snapshot.outlet
                };
                if (title) {
                    params[PAGE_TITLE_KEY] = title.getTitle();
                }
                let component = actualSnapshot.component;
                if (component) {
                    if (component === ɵEmptyOutletComponent) {
                        let deepSnapshot = activationEnd.snapshot;
                        // TODO when might there be mutple children, different outlets? explore
                        while (deepSnapshot.firstChild) {
                            deepSnapshot = deepSnapshot.firstChild;
                        }
                        component = deepSnapshot.component;
                    }
                }
                else {
                    component = activationEnd.snapshot.component;
                }
                if (typeof component === 'string') {
                    return of(Object.assign(Object.assign({}, params), { [SCREEN_CLASS_KEY]: component }));
                }
                else if (component) {
                    const componentFactory = componentFactoryResolver.resolveComponentFactory(component);
                    return of(Object.assign(Object.assign({}, params), { [SCREEN_CLASS_KEY]: componentFactory.selector }));
                }
                else {
                    // lazy loads cause extra activations, ignore
                    return of(null);
                }
            }), filter(it => it), map(params => (Object.assign({ [FIREBASE_SCREEN_CLASS_KEY]: params[SCREEN_CLASS_KEY], [FIREBASE_SCREEN_INSTANCE_ID_KEY]: getScreenInstanceID(params) }, params))), groupBy(it => it[OUTLET_KEY]), mergeMap(it => it.pipe(distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)), startWith(undefined), pairwise(), map(([prior, current]) => prior ? Object.assign({ [FIREBASE_PREVIOUS_SCREEN_CLASS_KEY]: prior[SCREEN_CLASS_KEY], [FIREBASE_PREVIOUS_SCREEN_NAME_KEY]: prior[SCREEN_NAME_KEY], [FIREBASE_PREVIOUS_SCREEN_INSTANCE_ID_KEY]: prior[FIREBASE_SCREEN_INSTANCE_ID_KEY] }, current) : current), switchMap((params) => __awaiter(this, void 0, void 0, function* () {
                if (userTrackingService) {
                    yield userTrackingService.initialized;
                }
                return yield analytics.logEvent(SCREEN_VIEW_EVENT, params);
            }))))).subscribe();
        });
    }
    ngOnDestroy() {
        if (this.disposable) {
            this.disposable.unsubscribe();
        }
    }
}
ScreenTrackingService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ScreenTrackingService.ctorParameters = () => [
    { type: AngularFireAnalytics },
    { type: Router, decorators: [{ type: Optional }] },
    { type: Title, decorators: [{ type: Optional }] },
    { type: ComponentFactoryResolver },
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: NgZone },
    { type: UserTrackingService, decorators: [{ type: Optional }] }
];
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyZWVuLXRyYWNraW5nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYW5hbHl0aWNzL3NjcmVlbi10cmFja2luZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsd0JBQXdCLEVBQ3hCLE1BQU0sRUFDTixVQUFVLEVBQ1YsTUFBTSxFQUVOLFFBQVEsRUFDUixXQUFXLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLEVBQUUsRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDeEMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3RILE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxFQUFFLHFCQUFxQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0UsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUU5RCxNQUFNLHlCQUF5QixHQUFHLHVCQUF1QixDQUFDO0FBQzFELE1BQU0sa0NBQWtDLEdBQUcseUJBQXlCLENBQUM7QUFDckUsTUFBTSx3Q0FBd0MsR0FBRyxzQkFBc0IsQ0FBQztBQUN4RSxNQUFNLGlDQUFpQyxHQUFHLDBCQUEwQixDQUFDO0FBQ3JFLE1BQU0seUJBQXlCLEdBQUcsdUJBQXVCLENBQUM7QUFDMUQsTUFBTSwrQkFBK0IsR0FBRyxvQkFBb0IsQ0FBQztBQUM3RCxNQUFNLHdCQUF3QixHQUFHLGlCQUFpQixDQUFDO0FBQ25ELE1B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QyxDQUFDLENBQUMsRUFDdkUsU0FBUyxDQUFDLFNBQVMsQ0FBQyxFQUNwQixRQUFRLEVBQUUsRUFDVixHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLENBQ3ZCLEtBQUssQ0FBQyxDQUFDLGlCQUNMLENBQUMsa0NBQWtDLENBQUMsRUFBRSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsRUFDN0QsQ0FBQyxpQ0FBaUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxlQUFlLENBQUMsRUFDM0QsQ0FBQyx3Q0FBd0MsQ0FBQyxFQUFFLEtBQUssQ0FBQywrQkFBK0IsQ0FBQyxJQUMvRSxPQUFPLEVBQ1YsQ0FBQyxDQUFDLE9BQU8sQ0FDWixFQUNELFNBQVMsQ0FBQyxDQUFNLE1BQU0sRUFBQyxFQUFFO2dCQUN2QixJQUFJLG1CQUFtQixFQUFFO29CQUN2QixNQUFNLG1CQUFtQixDQUFDLFdBQVcsQ0FBQztpQkFDdkM7Z0JBQ0QsT0FBTyxNQUFNLFNBQVMsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDN0QsQ0FBQyxDQUFBLENBQUMsQ0FDSCxDQUFDLENBQ0gsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNoQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDL0I7SUFDSCxDQUFDOzs7WUEzR0YsVUFBVTs7OztZQXpDRixvQkFBb0I7WUFETCxNQUFNLHVCQWlEekIsUUFBUTtZQS9DSixLQUFLLHVCQWdEVCxRQUFRO1lBNURYLHdCQUF3QjtZQStEVyxNQUFNLHVCQUF0QyxNQUFNLFNBQUMsV0FBVztZQTVEckIsTUFBTTtZQVdDLG1CQUFtQix1QkFtRHZCLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gIEluamVjdCxcbiAgSW5qZWN0YWJsZSxcbiAgTmdab25lLFxuICBPbkRlc3Ryb3ksXG4gIE9wdGlvbmFsLFxuICBQTEFURk9STV9JRFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IG9mLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBmaWx0ZXIsIGdyb3VwQnksIG1hcCwgbWVyZ2VNYXAsIHBhaXJ3aXNlLCBzdGFydFdpdGgsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEFjdGl2YXRpb25FbmQsIFJvdXRlciwgybVFbXB0eU91dGxldENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBBbmd1bGFyRmlyZUFuYWx5dGljcyB9IGZyb20gJy4vYW5hbHl0aWNzJztcbmltcG9ydCB7IFRpdGxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBVc2VyVHJhY2tpbmdTZXJ2aWNlIH0gZnJvbSAnLi91c2VyLXRyYWNraW5nLnNlcnZpY2UnO1xuXG5jb25zdCBGSVJFQkFTRV9FVkVOVF9PUklHSU5fS0VZID0gJ2ZpcmViYXNlX2V2ZW50X29yaWdpbic7XG5jb25zdCBGSVJFQkFTRV9QUkVWSU9VU19TQ1JFRU5fQ0xBU1NfS0VZID0gJ2ZpcmViYXNlX3ByZXZpb3VzX2NsYXNzJztcbmNvbnN0IEZJUkVCQVNFX1BSRVZJT1VTX1NDUkVFTl9JTlNUQU5DRV9JRF9LRVkgPSAnZmlyZWJhc2VfcHJldmlvdXNfaWQnO1xuY29uc3QgRklSRUJBU0VfUFJFVklPVVNfU0NSRUVOX05BTUVfS0VZID0gJ2ZpcmViYXNlX3ByZXZpb3VzX3NjcmVlbic7XG5jb25zdCBGSVJFQkFTRV9TQ1JFRU5fQ0xBU1NfS0VZID0gJ2ZpcmViYXNlX3NjcmVlbl9jbGFzcyc7XG5jb25zdCBGSVJFQkFTRV9TQ1JFRU5fSU5TVEFOQ0VfSURfS0VZID0gJ2ZpcmViYXNlX3NjcmVlbl9pZCc7XG5jb25zdCBGSVJFQkFTRV9TQ1JFRU5fTkFNRV9LRVkgPSAnZmlyZWJhc2Vfc2NyZWVuJztcbmNvbnN0IE9VVExFVF9LRVkgPSAnb3V0bGV0JztcbmNvbnN0IFBBR0VfUEFUSF9LRVkgPSAncGFnZV9wYXRoJztcbmNvbnN0IFBBR0VfVElUTEVfS0VZID0gJ3BhZ2VfdGl0bGUnO1xuY29uc3QgU0NSRUVOX0NMQVNTX0tFWSA9ICdzY3JlZW5fY2xhc3MnO1xuY29uc3QgU0NSRUVOX05BTUVfS0VZID0gJ3NjcmVlbl9uYW1lJztcbmNvbnN0IFNDUkVFTl9WSUVXX0VWRU5UID0gJ3NjcmVlbl92aWV3JztcbmNvbnN0IEVWRU5UX09SSUdJTl9BVVRPID0gJ2F1dG8nO1xuY29uc3QgU0NSRUVOX0lOU1RBTkNFX0RFTElNSVRFUiA9ICcjJztcblxuLy8gdGhpcyBpcyBhbiBJTlQ2NCBpbiBpT1MvQW5kcm9pZCBidXQgdXNlIElOVDMyIGNhdXNlIGphdmFzY3JpcHRcbmxldCBuZXh0U2NyZWVuSW5zdGFuY2VJRCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgyICoqIDMyIC0gMSkpIC0gMiAqKiAzMTtcblxuY29uc3Qga25vd25TY3JlZW5JbnN0YW5jZUlEczogeyBba2V5OiBzdHJpbmddOiBudW1iZXIgfSA9IHt9O1xuXG5jb25zdCBnZXRTY3JlZW5JbnN0YW5jZUlEID0gKHBhcmFtczogeyBba2V5OiBzdHJpbmddOiBhbnkgfSkgPT4ge1xuICAvLyB1bmlxdWUgdGhlIHNjcmVlbiBjbGFzcyBhZ2FpbnN0IHRoZSBvdXRsZXQgbmFtZVxuICBjb25zdCBzY3JlZW5JbnN0YW5jZUtleSA9IFtcbiAgICBwYXJhbXNbU0NSRUVOX0NMQVNTX0tFWV0sXG4gICAgcGFyYW1zW09VVExFVF9LRVldXG4gIF0uam9pbihTQ1JFRU5fSU5TVEFOQ0VfREVMSU1JVEVSKTtcbiAgaWYgKGtub3duU2NyZWVuSW5zdGFuY2VJRHMuaGFzT3duUHJvcGVydHkoc2NyZWVuSW5zdGFuY2VLZXkpKSB7XG4gICAgcmV0dXJuIGtub3duU2NyZWVuSW5zdGFuY2VJRHNbc2NyZWVuSW5zdGFuY2VLZXldO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IHJldCA9IG5leHRTY3JlZW5JbnN0YW5jZUlEKys7XG4gICAga25vd25TY3JlZW5JbnN0YW5jZUlEc1tzY3JlZW5JbnN0YW5jZUtleV0gPSByZXQ7XG4gICAgcmV0dXJuIHJldDtcbiAgfVxufTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNjcmVlblRyYWNraW5nU2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgcHJpdmF0ZSBkaXNwb3NhYmxlOiBTdWJzY3JpcHRpb24gfCB1bmRlZmluZWQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgYW5hbHl0aWNzOiBBbmd1bGFyRmlyZUFuYWx5dGljcyxcbiAgICBAT3B0aW9uYWwoKSByb3V0ZXI6IFJvdXRlcixcbiAgICBAT3B0aW9uYWwoKSB0aXRsZTogVGl0bGUsXG4gICAgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmJhbi10eXBlc1xuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHBsYXRmb3JtSWQ6IE9iamVjdCxcbiAgICB6b25lOiBOZ1pvbmUsXG4gICAgQE9wdGlvbmFsKCkgdXNlclRyYWNraW5nU2VydmljZTogVXNlclRyYWNraW5nU2VydmljZSxcbiAgKSB7XG4gICAgaWYgKCFyb3V0ZXIgfHwgIWlzUGxhdGZvcm1Ccm93c2VyKHBsYXRmb3JtSWQpKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBjb25zdCBhY3RpdmF0aW9uRW5kRXZlbnRzID0gcm91dGVyLmV2ZW50cy5waXBlKGZpbHRlcjxBY3RpdmF0aW9uRW5kPihlID0+IGUgaW5zdGFuY2VvZiBBY3RpdmF0aW9uRW5kKSk7XG4gICAgICB0aGlzLmRpc3Bvc2FibGUgPSBhY3RpdmF0aW9uRW5kRXZlbnRzLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcChhY3RpdmF0aW9uRW5kID0+IHtcbiAgICAgICAgICAvLyByb3V0ZXIgcGFyc2VVcmwgaXMgaGF2aW5nIHRyb3VibGUgd2l0aCBvdXRsZXRzIHdoZW4gdGhleSdyZSBlbXB0eVxuICAgICAgICAgIC8vIGUuZywgL2FzZGYvMShib2I6Ly9zYWxseTphc2RmKSwgc28gcHV0IGFub3RoZXIgc2xhc2ggaW4gd2hlbiBlbXB0eVxuICAgICAgICAgIGNvbnN0IHVybFRyZWUgPSByb3V0ZXIucGFyc2VVcmwocm91dGVyLnVybC5yZXBsYWNlKC8oPzpcXCgpLisoPzpcXCkpL2csIGEgPT4gYS5yZXBsYWNlKCc6Ly8nLCAnOi8vLycpKSk7XG4gICAgICAgICAgY29uc3QgcGFnZVBhdGggPSB1cmxUcmVlLnJvb3QuY2hpbGRyZW5bYWN0aXZhdGlvbkVuZC5zbmFwc2hvdC5vdXRsZXRdPy50b1N0cmluZygpIHx8ICcnO1xuICAgICAgICAgIGNvbnN0IGFjdHVhbFNuYXBzaG90ID0gcm91dGVyLnJvdXRlclN0YXRlLnJvb3QuY2hpbGRyZW4ubWFwKGl0ID0+IGl0KS5maW5kKGl0ID0+IGl0Lm91dGxldCA9PT0gYWN0aXZhdGlvbkVuZC5zbmFwc2hvdC5vdXRsZXQpO1xuXG4gICAgICAgICAgaWYgKCFhY3R1YWxTbmFwc2hvdCkge1xuICAgICAgICAgICAgcmV0dXJuIG9mKG51bGwpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGxldCBhY3R1YWxEZWVwID0gYWN0dWFsU25hcHNob3Q7XG4gICAgICAgICAgd2hpbGUgKGFjdHVhbERlZXAuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgYWN0dWFsRGVlcCA9IGFjdHVhbERlZXAuZmlyc3RDaGlsZDtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3Qgc2NyZWVuTmFtZSA9IGFjdHVhbERlZXAucGF0aEZyb21Sb290Lm1hcChzID0+IHMucm91dGVDb25maWc/LnBhdGgpLmZpbHRlcihpdCA9PiBpdCkuam9pbignLycpIHx8ICcvJztcblxuICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgICAgICAgIFtTQ1JFRU5fTkFNRV9LRVldOiBzY3JlZW5OYW1lLFxuICAgICAgICAgICAgW1BBR0VfUEFUSF9LRVldOiBgLyR7cGFnZVBhdGh9YCxcbiAgICAgICAgICAgIFtGSVJFQkFTRV9FVkVOVF9PUklHSU5fS0VZXTogRVZFTlRfT1JJR0lOX0FVVE8sXG4gICAgICAgICAgICBbRklSRUJBU0VfU0NSRUVOX05BTUVfS0VZXTogc2NyZWVuTmFtZSxcbiAgICAgICAgICAgIFtPVVRMRVRfS0VZXTogYWN0aXZhdGlvbkVuZC5zbmFwc2hvdC5vdXRsZXRcbiAgICAgICAgICB9O1xuICAgICAgICAgIGlmICh0aXRsZSkge1xuICAgICAgICAgICAgcGFyYW1zW1BBR0VfVElUTEVfS0VZXSA9IHRpdGxlLmdldFRpdGxlKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGV0IGNvbXBvbmVudCA9IGFjdHVhbFNuYXBzaG90LmNvbXBvbmVudDtcbiAgICAgICAgICBpZiAoY29tcG9uZW50KSB7XG4gICAgICAgICAgICBpZiAoY29tcG9uZW50ID09PSDJtUVtcHR5T3V0bGV0Q29tcG9uZW50KSB7XG4gICAgICAgICAgICAgIGxldCBkZWVwU25hcHNob3QgPSBhY3RpdmF0aW9uRW5kLnNuYXBzaG90O1xuICAgICAgICAgICAgICAvLyBUT0RPIHdoZW4gbWlnaHQgdGhlcmUgYmUgbXV0cGxlIGNoaWxkcmVuLCBkaWZmZXJlbnQgb3V0bGV0cz8gZXhwbG9yZVxuICAgICAgICAgICAgICB3aGlsZSAoZGVlcFNuYXBzaG90LmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgICAgICBkZWVwU25hcHNob3QgPSBkZWVwU25hcHNob3QuZmlyc3RDaGlsZDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjb21wb25lbnQgPSBkZWVwU25hcHNob3QuY29tcG9uZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb21wb25lbnQgPSBhY3RpdmF0aW9uRW5kLnNuYXBzaG90LmNvbXBvbmVudDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodHlwZW9mIGNvbXBvbmVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybiBvZih7IC4uLnBhcmFtcywgW1NDUkVFTl9DTEFTU19LRVldOiBjb21wb25lbnQgfSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChjb21wb25lbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbXBvbmVudEZhY3RvcnkgPSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoY29tcG9uZW50KTtcbiAgICAgICAgICAgIHJldHVybiBvZih7IC4uLnBhcmFtcywgW1NDUkVFTl9DTEFTU19LRVldOiBjb21wb25lbnRGYWN0b3J5LnNlbGVjdG9yIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBsYXp5IGxvYWRzIGNhdXNlIGV4dHJhIGFjdGl2YXRpb25zLCBpZ25vcmVcbiAgICAgICAgICAgIHJldHVybiBvZihudWxsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pLFxuICAgICAgICBmaWx0ZXIoaXQgPT4gaXQpLFxuICAgICAgICBtYXAocGFyYW1zID0+ICh7XG4gICAgICAgICAgW0ZJUkVCQVNFX1NDUkVFTl9DTEFTU19LRVldOiBwYXJhbXNbU0NSRUVOX0NMQVNTX0tFWV0sXG4gICAgICAgICAgW0ZJUkVCQVNFX1NDUkVFTl9JTlNUQU5DRV9JRF9LRVldOiBnZXRTY3JlZW5JbnN0YW5jZUlEKHBhcmFtcyksXG4gICAgICAgICAgLi4ucGFyYW1zXG4gICAgICAgIH0pKSxcbiAgICAgICAgZ3JvdXBCeShpdCA9PiBpdFtPVVRMRVRfS0VZXSksXG4gICAgICAgIG1lcmdlTWFwKGl0ID0+IGl0LnBpcGUoXG4gICAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKGEsIGIpID0+IEpTT04uc3RyaW5naWZ5KGEpID09PSBKU09OLnN0cmluZ2lmeShiKSksXG4gICAgICAgICAgc3RhcnRXaXRoKHVuZGVmaW5lZCksXG4gICAgICAgICAgcGFpcndpc2UoKSxcbiAgICAgICAgICBtYXAoKFtwcmlvciwgY3VycmVudF0pID0+XG4gICAgICAgICAgICBwcmlvciA/IHtcbiAgICAgICAgICAgICAgW0ZJUkVCQVNFX1BSRVZJT1VTX1NDUkVFTl9DTEFTU19LRVldOiBwcmlvcltTQ1JFRU5fQ0xBU1NfS0VZXSxcbiAgICAgICAgICAgICAgW0ZJUkVCQVNFX1BSRVZJT1VTX1NDUkVFTl9OQU1FX0tFWV06IHByaW9yW1NDUkVFTl9OQU1FX0tFWV0sXG4gICAgICAgICAgICAgIFtGSVJFQkFTRV9QUkVWSU9VU19TQ1JFRU5fSU5TVEFOQ0VfSURfS0VZXTogcHJpb3JbRklSRUJBU0VfU0NSRUVOX0lOU1RBTkNFX0lEX0tFWV0sXG4gICAgICAgICAgICAgIC4uLmN1cnJlbnRcbiAgICAgICAgICAgIH0gOiBjdXJyZW50XG4gICAgICAgICAgKSxcbiAgICAgICAgICBzd2l0Y2hNYXAoYXN5bmMgcGFyYW1zID0+IHtcbiAgICAgICAgICAgIGlmICh1c2VyVHJhY2tpbmdTZXJ2aWNlKSB7XG4gICAgICAgICAgICAgIGF3YWl0IHVzZXJUcmFja2luZ1NlcnZpY2UuaW5pdGlhbGl6ZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgYW5hbHl0aWNzLmxvZ0V2ZW50KFNDUkVFTl9WSUVXX0VWRU5ULCBwYXJhbXMpO1xuICAgICAgICAgIH0pXG4gICAgICAgICkpXG4gICAgICApLnN1YnNjcmliZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuZGlzcG9zYWJsZSkge1xuICAgICAgdGhpcy5kaXNwb3NhYmxlLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbn1cbiJdfQ==