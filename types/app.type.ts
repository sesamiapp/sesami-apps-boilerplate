import { AppTarget } from '@sesamiapp/app-message'

export type App = {
    id: string,
    name: string,
    title: string | null,
    icon: {
        id: string | null,
        path: string | null
    },
    description: string | null,
    extensions: {
        id: string,
        name: string,
        target: AppTarget,
        url: string
    }[]
}
