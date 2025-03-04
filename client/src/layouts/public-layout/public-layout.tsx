import classes from "./public-layout.module.scss"

export default function PublicLayout({ children, ...props }: React.PropsWithChildren) {
    return <main className={classes.main} {...props} >{children}</main>
}