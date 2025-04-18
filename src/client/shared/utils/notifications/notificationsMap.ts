export interface NotificationEvents {
    loading: string;
    success: string;
    error: string;
}

export type NotificationNamespaces = 'default' | 'signIn';

export type NotificationMap = Record<NotificationNamespaces, Partial<NotificationEvents>>;

export const defaultNotifications: NotificationEvents = {
    success: 'Успешно',
    loading: 'Загрузка...',
    error: 'При выполнении запроса произошла ошибка',
};

export const getNotificationKeyMap = (key: keyof NotificationMap) => {
    const notification: NotificationMap = {
        default: defaultNotifications,
        signIn: {
            success: 'Успешная авторизация',
            loading: 'Загрузка...',
            error: 'Ошибка авторизации',
        },
    };

    return notification[key];
};
