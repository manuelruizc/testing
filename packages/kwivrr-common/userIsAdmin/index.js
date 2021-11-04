import { UsersStatus } from "../data/types/status"

export function userIsAdmin(userType) {
    return userType.endsWith('Admin');
}

export function userIsAdminOrEventManager(userType) {
    return (userIsAdmin(userType) && userType === UsersStatus.EventManager);
}