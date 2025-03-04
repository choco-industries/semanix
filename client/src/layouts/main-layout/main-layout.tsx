import Sidebar from '@/components/sidebar/sidebar'
import classes from './main-layout.module.scss'


export default function MainLayout({ children, ...props }: React.PropsWithChildren) {
    return <main className={classes.main} {...props} >
        <Sidebar />
    </main>
}
