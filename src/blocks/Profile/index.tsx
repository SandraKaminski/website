import Summary from './Summary';
import Detail from './Detail';
import { BlockProps } from '../../shared'; 

export const Profile = (props: BlockProps) => {
    const { content, detail } = props;

    return (
        <>
            {detail === true
                ? <Detail content={content} />
                : <Summary content={content} />
            }
        </>
    )
}

export default Profile