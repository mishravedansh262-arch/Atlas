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
    <p className="mt-6 text-center text-sm text-text-secondary">
      {prompt}{" "}
      <Link
        to={linkTo}
        className="font-medium text-brand-400 transition-colors hover:text-brand-300"
      >
        {linkLabel}
      </Link>
    </p>
  );
}
