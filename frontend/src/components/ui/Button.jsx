import Button from "react-bootstrap/Button";

function Buttons({ type, variant, size, width, height, text, color, bgColor, border, children, padding, disabled, onClick}) {
  return (
    <div className="d-grid gap-2">
      <Button
        type={type}
        variant={variant}
        size={size}
        style={{ color: color, border: border ,width: width,height: height, backgroundColor: bgColor, padding: padding }}
        disabled={disabled}
        onClick={onClick}
      >
        {text}
        {children} 
      </Button>
    </div>
  );
}

export default Buttons;