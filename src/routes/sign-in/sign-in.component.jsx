import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../component/sign-up-form/sign-up-form.component";

export default function SignIn() {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      Sign In Page
      <button onClick={logGoogleUser}> Sign in</button>
      <SignUpForm/>
    </div>
  );
}
