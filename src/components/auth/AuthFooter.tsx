import { Link } from "react-router-dom";

type AuthFooterProps = {
  prompt: string;
  linkLabel: string;
  linkTo: string;
};

export default function AuthFooter({
  prompt,
  linkLabel,
  linkTo,
}: AuthFooterProps) {
  return (
    <p className="mt-6 text-center text-sm text-zinc-400">
      {prompt}{" "}
      <Link
        to={linkTo}
        className="font-medium text-blue-500 transition hover:text-blue-400"
      >
        {linkLabel}
      </Link>
    </p>
  );
}
