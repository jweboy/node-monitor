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
                <span>{dayjs(value).format('YYYY-MM-DD HH:mm:ss')}</span>
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
