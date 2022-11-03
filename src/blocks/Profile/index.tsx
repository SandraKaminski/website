import React from 'react';

import Summary from './Summary';
import Detail from './Detail';

export const Profile = ({ content, detail }: any) =>
    <>
        {detail
            ? <Detail content={content} />
            : <Summary content={content} />
        }
    </>

export default Profile