import React from 'react';
import ResultQuery from 'kwivrr-ui/ResultQuery';
import AccountSettings from './AccountSettings';
import useQuery from 'kwivrr-hooks/useQuery';

export default function () {
    const query = useQuery('getUserInfo', { id: 'me' });
    return (
        <ResultQuery
            Success={AccountSettings}
            query={query}
            normalizeProps={(p) => {
                const _userInfo = p.data.data.attributes;
                const newUserInfo = {
                    ..._userInfo,
                    email: _userInfo.email,
                    fullName: `${_userInfo.firstname} ${_userInfo.lastname}`,
                    firstName: _userInfo.firstname,
                    lastName: _userInfo.lastname,
                    tagline: _userInfo.tagline,
                    coverUrl: _userInfo.banner_url,
                    phone: _userInfo.phone,
                    shopLink: _userInfo.shop_link,
                    avatar: _userInfo.avatar_url,
                };
                return {
                    ...p,
                    userInfo: newUserInfo,
                };
            }}
        />
    );
}
