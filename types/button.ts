export interface ButtonInterface {
    path?: string,
    type?: "button" | "submit" | "reset" | undefined,
    children?: React.ReactNode,
    className?: string,
    onClick?: any;
}