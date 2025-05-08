import { signIn } from "@junobuild/core";

export const Login = () => {
  return (
    <button className="btn" onClick={signIn}>
      Connect Wallet
    </button>
  );
};
