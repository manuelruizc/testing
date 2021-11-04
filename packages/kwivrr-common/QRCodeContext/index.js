import React, { useContext, useEffect, useRef, useState } from 'react';
import QRCodeBottomSheet from './QRCodeBottomSheet';

export const QRCodeContext = React.createContext();

export function QRCodeProvider({ children }) {
    const ref = useRef(null);
    const [qrCode, setQRCode] = useState(
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAABlBMVEUAAAD///+l2Z/dAAACg0lEQVR4nO3WS3JiQQwEQHP/S89qFg4IUaV+gB1OLfvpU8mKr6+zuv2v4dNQydRhwtMiJAymXo8Yi5AwmHo9YizCnyRMAt1fTV6q9MmtKiHhs/nkhZCQcE5I+Gw+eSF8u/DBt6s9FfUwISEhISEhIeF7hK8bJyQkJCQkJPw5wvtKThASEhISEhK+VJjUbmrYk2Q93bybr6aiHIT7zbv5airKQbjfvJuvpqIchPvNu/lqKspBeL65qyHH5S+fKcIrXz5ThFe+fKYIr3z5TBFe+XIa8bB2v8Kw57Jgly0ivBHmPV2wyxYR3gjzni7YZYsIbx8XVsmG5qGnaq6uT0VI2ISumgnjIiRsQlfNhHFVx4banTjcE+UhJCQkJCQkLG8MV6vmgZq8dJkJCQkJCQkJs7GhJ7mRNCdHd5kJCYfQhISrPIT9xiE04duFQ8RdjmpPVZPn8Bgh4epoFeP0GCHh6mgV4/QY4W8T3qcfPEnoZLzqST4REhISEhISPjz/upedcOkhJCQkJCQkLGHD1K52P0fS/GBzcpWwLsJ6fNqcXCWsi7AenzYnVwnreqswWV0FSn6p4dOukvCEhISEhIR/WTh8q2r3S91/qvZEP9malKdPegjTZsKDInzSQ5g2Ex7UzxUe1pC+8uw2J59Oi/DbC2G9Ofl0WoTfXgjrzcmn0yL89vJh4X2Ooaqp6miymZCQkJCQkPBcWPUkVy+LGASb9hA+7iEkbK4nwQgJCZ9c/d3C4Ua1ufpdOiohISEhISHhC/7TVJUIh+vRz0FISEhISEh4fKO6mgRKbnXNhISEhISEhNtKsu6aqz2XeZJjVzVXewgPinDfXO0hPCjCfXO1508L/wFl9l/gl2v+4QAAAABJRU5ErkJggg=='
    );
    const expand = (
        qrCodeImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAABlBMVEUAAAD///+l2Z/dAAACg0lEQVR4nO3WS3JiQQwEQHP/S89qFg4IUaV+gB1OLfvpU8mKr6+zuv2v4dNQydRhwtMiJAymXo8Yi5AwmHo9YizCnyRMAt1fTV6q9MmtKiHhs/nkhZCQcE5I+Gw+eSF8u/DBt6s9FfUwISEhISEhIeF7hK8bJyQkJCQkJPw5wvtKThASEhISEhK+VJjUbmrYk2Q93bybr6aiHIT7zbv5airKQbjfvJuvpqIchPvNu/lqKspBeL65qyHH5S+fKcIrXz5ThFe+fKYIr3z5TBFe+XIa8bB2v8Kw57Jgly0ivBHmPV2wyxYR3gjzni7YZYsIbx8XVsmG5qGnaq6uT0VI2ISumgnjIiRsQlfNhHFVx4banTjcE+UhJCQkJCQkLG8MV6vmgZq8dJkJCQkJCQkJs7GhJ7mRNCdHd5kJCYfQhISrPIT9xiE04duFQ8RdjmpPVZPn8Bgh4epoFeP0GCHh6mgV4/QY4W8T3qcfPEnoZLzqST4REhISEhISPjz/upedcOkhJCQkJCQkLGHD1K52P0fS/GBzcpWwLsJ6fNqcXCWsi7AenzYnVwnreqswWV0FSn6p4dOukvCEhISEhIR/WTh8q2r3S91/qvZEP9malKdPegjTZsKDInzSQ5g2Ex7UzxUe1pC+8uw2J59Oi/DbC2G9Ofl0WoTfXgjrzcmn0yL89vJh4X2Ooaqp6miymZCQkJCQkPBcWPUkVy+LGASb9hA+7iEkbK4nwQgJCZ9c/d3C4Ua1ufpdOiohISEhISHhC/7TVJUIh+vRz0FISEhISEh4fKO6mgRKbnXNhISEhISEhNtKsu6aqz2XeZJjVzVXewgPinDfXO0hPCjCfXO1508L/wFl9l/gl2v+4QAAAABJRU5ErkJggg=='
    ) => {
        setQRCode(qrCodeImg);
        ref.current?.expand();
    };
    const close = () => {
        ref.current?.close();
    };
    const value = useState(false);
    return (
        <QRCodeContext.Provider
            value={{
                state: value,
                expand,
                close,
            }}
        >
            {children}
            <QRCodeBottomSheet ref={ref} qrCode={qrCode} />
        </QRCodeContext.Provider>
    );
}
