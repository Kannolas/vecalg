import { MethodBox } from '../../../entities/method-box';
import style from '../style/methods-list.module.css';
import { STATUS } from '../../../shared/constants/status';

interface MethodsListProps {
    setMethod: (value: string) => void;
    setStatus: (value: STATUS) => void;
}

export const MethodsList = ({ setMethod, setStatus }: MethodsListProps) => {
    return (
        <div className={style.methods_list}>
            {['SBERRUB', 'RFBRUB', 'SBPRUB'].map((obj) => (
                <MethodBox key={obj} bank={obj} setMethod={setMethod} setStatus={setStatus} />
            ))}
        </div>
    );
};
