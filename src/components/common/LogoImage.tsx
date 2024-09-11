import React from "react";
// React.FunctionComponent<React.SVGProps<SVGSVGElement>
interface LogoImageProps {
  logo:
    | string
    | React.FunctionComponent<React.SVGProps<SVGSVGElement>>
    | React.ReactElement;
  alt: string;
  size?: number;
  backgroundColor?: string;
}

const LogoImage: React.FC<LogoImageProps> = ({
  logo,
  alt,
  size = 80,
  backgroundColor,
}) => {
  const containerStyle: React.CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: backgroundColor || "transparent",
    borderRadius: "50%",
    overflow: "hidden",
  };

  const imageStyle: React.CSSProperties = {
    width: "80%",
    height: "80%",
    objectFit: "contain",
  };

  const renderLogo = () => {
    console.log("typeof logo: ", typeof logo);
    if (typeof logo === "string") {
      return <img src={logo} alt={alt} style={imageStyle} />;
    } else if (React.isValidElement(logo)) {
      return React.cloneElement(logo as React.ReactElement<any>, {
        width: size,
        height: size,
      });
    } else if (typeof logo === "function" || "render" in logo) {
      const SvgComponent = logo as React.ComponentType<
        React.SVGProps<SVGSVGElement>
      >;
      return <SvgComponent width={size} height={size} />;
    } else {
      console.warn("Invalid logo prop provided to LogoImage");
      return null;
    }
  };

  return <div style={containerStyle}>{renderLogo()}</div>;
};

export default LogoImage;
