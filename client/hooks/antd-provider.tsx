import { ConfigProvider, theme } from 'antd'
import { AdminTheme } from '../style/theme.admin'
import { ThemeProvider } from 'styled-components'

export const AntdProvider = ({ children }: React.PropsWithChildren) => {
    const { token } = theme.useToken()
    return (
        <ConfigProvider theme={{ token: AdminTheme }}>
            <ThemeProvider theme={token}>
                {children}
            </ThemeProvider>
        </ConfigProvider>
    )
}
