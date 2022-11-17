import { Children, cloneElement } from "react";
import { useRouter } from "next/router";
import Link, { LinkProps } from "next/link";

type NavLinkProps = React.PropsWithChildren<LinkProps> & {
  end?: boolean;
  activeClassName?: string;
};

export default function NavLink({
  children,
  end = false,
  activeClassName = "active",
  ...props
}: NavLinkProps) {
  const { pathname } = useRouter();

  const linkAsPath = props.as ? props.as : props.href;
  const isActive = end
    ? pathname === linkAsPath
    : pathname.startsWith(linkAsPath.toString());

  const child = Children.only(children) as React.ReactElement;
  const childClassNames = [];
  if (child.props.className) {
    childClassNames.push(child.props.className);
  }
  if (isActive) {
    childClassNames.push(activeClassName);
  }

  return (
    <Link {...props}>
      {cloneElement(child, {
        className: childClassNames.length
          ? childClassNames.join(" ")
          : undefined,
      })}
    </Link>
  );
}
