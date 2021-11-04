import { getUserLoginInfo } from '../data/fetch/user';
import { delayResolveData } from 'kwivrr-common/delayResolve';

const onLogin = (email, password) => {
    const emails = [
        'meganhendricks@gmail.com',
        'thompson14@gmail.com',
        'evelyn.johnson@icentris.com',
        'easton.rutkoski@icentris.com',
    ];
    if (
        emails.includes(email.toLowerCase()) &&
        password.toLowerCase() === 'password1'
    ) {
        const { jwt, userInfo } = getUserLoginInfo(email.toLowerCase());
        return delayResolveData({
            response: {
                status: 200,
            },
            data: userInfo,
        });
    } else {
        return delayResolveData({
            response: {
                status: 500,
            },
            data: {},
        });
    }
};

const props = {
    onLogin,
};

export default props;
