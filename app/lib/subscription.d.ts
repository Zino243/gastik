export interface UserSubscription {
    id?: string
    userId: string
    serviceId?: string
    billingId?: string
    notificationId?: string
    categoryId?: string
    price: number
    startDate: string
    cancelDate?: string
}

export interface Service {
    id: string
    name: string
    logo: string
    userId: string
}

export interface BillingCycle {
    id: string
    name: string
    days: string
}

export interface Category {
    id: string
    userId: string
    name: string
}

export interface NotificationType {
    id: string
    name: string
}