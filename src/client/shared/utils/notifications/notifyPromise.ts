import { sendToast } from '../../ui/toast';

import {
    NotificationEvents,
    NotificationNamespaces,
    defaultNotifications,
    getNotificationKeyMap,
} from './notificationsMap';

export interface NotifyPromise {
    <T>(promise: Promise<T>, events: NotificationEvents): Promise<T>;
    <T>(promise: Promise<T>, namespace: NotificationNamespaces): Promise<T>;
}

export const notifyPromise: NotifyPromise = (promise, eventsOrNamespace) => {
    let events: NotificationEvents;

    if (typeof eventsOrNamespace === 'string') {
        const notifyMap = getNotificationKeyMap(eventsOrNamespace);

        events = {
            success: notifyMap.success ?? defaultNotifications.success,
            loading: notifyMap.loading ?? defaultNotifications.loading,
            error: notifyMap.error ?? defaultNotifications.error,
        };
    } else {
        events = eventsOrNamespace;
    }

    sendToast.promise(promise, events);

    return promise;
};
