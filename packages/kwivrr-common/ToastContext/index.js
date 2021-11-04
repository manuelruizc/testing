import React, { useState } from 'react';
export const ToastContext = React.createContext();
var _createToast;

export function ToastProvider({ children }) {
    const [toasts, setToast] = useState([]); //  { text: '', icon: '' }
    // const value = useState({icon:'', message: '', active: false, close: true});
    const createToast = ({ text, icon, color, id }) => {
        setToast((prev) => [...prev, { text, icon, color, id }]);
    };
    const deleteToastWithId = (id) => {
        let newToasts = toasts;
        newToasts = newToasts.filter((item) => item.id === id);
        setToast([...newToasts]);
    };
    const unshiftToast = () => {
        setToast((prev) => {
            prev.shift();
            return [...prev];
        });
    };

    const value = {
        createToast,
        deleteToastWithId,
        unshiftToast,
        setToast,
        toasts,
    };

    return (
        <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
    );
}

export const createToast = _createToast;
