import { format } from 'jweboy-utils/lib/date-time'

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
                <span>{format(value, 'time').fmtData}</span>
            )
        },
    }
]

export const a = x => x

export const testData = [
    {
        method: 'POST',
        url: '/school',
        createTime: new Date().toLocaleString(),
        id: 0,
    },
    {
        method: 'GET',
        url: '/newMessage',
        createTime: new Date().toLocaleString(),
        id: 1,
    }
]
