import { LayoutPage } from '../../../app/layout-page';
import { AuthBox } from '../../../entities/auth-box';
import { SignInForm } from '../../../features/signIn-form';

export function SignInPage() {
    return (
        <LayoutPage isProtected>
            <AuthBox>
                <SignInForm />
            </AuthBox>
        </LayoutPage>
    );
}
