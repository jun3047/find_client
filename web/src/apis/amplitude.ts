import * as Sentry from '@sentry/react';
import amplitude from 'amplitude-js';
import memoize from 'lodash/memoize';

const init = memoize(() => {
    const apiKey = 'f67fa676b2ec6786d2bb3a19e9e6df0e';

    amplitude.getInstance().init(apiKey, undefined, {
        includeReferrer: true,
        disableCookies: true,
    })
})


export const trackEvent = (eventName: string, data?: Record<string, any>) => {
    if(process.env.NODE_ENV !== 'production') return;

    init();

    amplitude.getInstance().logEvent(eventName, data);
}

// trackEvent(트랙 이벤트 )

export const setUserForTracking = (userId: string, name?: string) => {
    if (process.env.NODE_ENV !== 'production') return;

    Sentry.configureScope((scope:any) => {
        scope.setUser({ userId })
    })

    init();

    amplitude.getInstance().setUserId(userId);
    amplitude.getInstance().setUserProperties({ name });
}