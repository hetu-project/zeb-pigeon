import { ButtonHTMLAttributes, forwardRef } from 'react';

export type ButtonProps<A = ButtonHTMLAttributes<HTMLButtonElement>> = A;
const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ children, ...props }, ref): JSX.Element => {
  return (
    <button {...props} ref={ref}>
      {children}
    </button>
  );
});
Button.displayName = 'Button';
export default Button;
