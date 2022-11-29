import { getAdditionalUserInfo, signInWithPopup, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import {
  auth,
  provider_google,
  provider_facebook,
  provider_twitter,
  db,
} from "./firebase_init";

const providerSignIn = async (provider_name, handleSigningInState) => {
  let auth_provider;

  switch (provider_name) {
    case "google":
      auth_provider = provider_google;
      break;
    case "facebook":
      auth_provider = provider_facebook;
      break;
    case "twitter":
      auth_provider = provider_twitter;
      break;

    default:
      auth_provider = null;
      return;
  }

  handleSigningInState(provider_name, true);

  let answer = {
    result: false,
    errorCode: false,
  };

  try {
    const result = await signInWithPopup(auth, auth_provider);

    const {
      user: {
        displayName,
        photoURL,
        uid,
        email,
        providerData: [first_provider],
      },
    } = result;

    const {
      displayName: provider_displayName,
      photoURL: provider_photoURL,
      email: provider_email,
    } = first_provider;

    const { isNewUser } = getAdditionalUserInfo(result);

    if (isNewUser) {
      try {
        // Add a new document in collection "users"
        await setDoc(doc(db, "users", uid), {
          displayName: displayName || provider_displayName,
          photoURL: photoURL || provider_photoURL,
          email: email || provider_email,
          uid,
        });

        answer.result = true;
      } catch (e) {
        answer.errorCode = e;
      }
    } else {
      answer.result = true;
    }

    return answer;
  } catch (error) {
    const errorCode = error.code;

    answer.errorCode = errorCode;

    return answer;
  } finally {
    handleSigningInState(provider_name, false);
  }
};

const userSignOut = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    return false;
  }
};

export { userSignOut, providerSignIn };
