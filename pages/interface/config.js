// import { dateTime } from 'jweboy-utils'
// const { format } = dateTime
import dayjs from 'dayjs'

export const columns = [
    {
        title: '请求方法',
        key: 'method',
        dataIndex: 'method',
    },
    {
        title: '状态码',
        key: 'code',
        dataIndex: 'code',
    },
    {
        title: '请求路径',
        key: 'url',
        dataIndex: 'url',
    },
    {
        title: '创建时间',
        key: 'createAt',
        dataIndex: 'createAt',
        render(value) {
            return (
                <span>{dayjs(value).format('YYYY-MM-DD  HH:mm:ss')}</span>
            )
        },
    }
]
