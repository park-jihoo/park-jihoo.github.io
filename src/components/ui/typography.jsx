import PropTypes from "prop-types";

export const TypographyH1 = ({ children, className = "" }) => (
  <h1
    className={`scroll-m-20 text-4xl font-extrabold tracking-tight text-balance ${className}`}
  >
    {children}
  </h1>
);

TypographyH1.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export const TypographyH2 = ({ children, className = "" }) => (
  <h2
    className={`scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 ${className}`}
  >
    {children}
  </h2>
);

TypographyH2.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export const TypographyH3 = ({ children, className = "" }) => (
  <h3
    className={`scroll-m-20 text-2xl font-semibold tracking-tight ${className}`}
  >
    {children}
  </h3>
);

TypographyH3.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export const TypographyP = ({ children, className = "" }) => (
  <p className={`leading-7 [&:not(:first-child)]:mt-6 ${className}`}>
    {children}
  </p>
);

TypographyP.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export const TypographyBlockquote = ({ children, className = "" }) => (
  <blockquote className={`mt-6 border-l-2 pl-6 italic ${className}`}>
    {children}
  </blockquote>
);

TypographyBlockquote.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export const TypographyList = ({ children, className = "" }) => (
  <ul className={`my-6 ml-6 list-disc [&>li]:mt-2 ${className}`}>{children}</ul>
);

TypographyList.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export const TypographyOrderedList = ({ children, className = "" }) => (
  <ol className={`my-6 ml-6 list-decimal [&>li]:mt-2 ${className}`}>
    {children}
  </ol>
);

TypographyOrderedList.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export const TypographyInlineCode = ({ children, className = "" }) => (
  <code
    className={`bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold ${className}`}
  >
    {children}
  </code>
);

TypographyInlineCode.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
