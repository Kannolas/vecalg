/* eslint-disable prefer-template */
import { Avatar, Button } from '@plex-inc/bricks/components';
import { useState } from 'react';
import Cookies from 'js-cookie';

import LogoutIcon from '@/shared/assets/logout.svg';
import { Modal } from '@/shared/ui/modal';
import { SignInForm } from '@/features/signIn-form';
import { SignUpForm } from '@/features/signUp-form/ui/signUp-form';

import styles from '../styles/user.module.css';

export const User = () => {
    const email = Cookies.get('email');
    const isAuth = email;
    const [openSignIn, setOpenSignIn] = useState(false);
    const [openSignUp, setOpenSignUp] = useState(false);
    const hanleSwitch = () => {
        setOpenSignIn((prev) => !prev);
        setOpenSignUp((prev) => !prev);
    };
    return isAuth ? (
        <div className={styles.user}>
            <Avatar name={email} size="s" />
            {email.length > 7 ? email.slice(0, 7) + '...' : email}
            <Button variant="transparent" iconRight={<LogoutIcon />} />
        </div>
    ) : (
        <>
            <Button variant="primary" view="brand" text="Войти" onClick={() => setOpenSignIn(true)} />
            <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
                <SignInForm onSignup={hanleSwitch} />
            </Modal>
            <Modal open={openSignUp} onClose={() => setOpenSignUp(false)}>
                <SignUpForm onSignIn={hanleSwitch} />
            </Modal>
        </>
    );
};
