_data = [
    {
        messageId: 0,
        title: "A mock poll",
        categories:
            [
                {
                    name: "test1",
                    value: 0
                },
                {
                    name: "test2",
                    value: 1
                },
                {
                    name: "test3",
                    value: 3
                },
            ],
    },
];


function add(item)
{
    _data.push(item);

    console.log(JSON.stringify(_data));
}

function remove(item)
{
    _data.remove(item);
}

function get(messageId)
{
    return _data.find(element => element.messageId === messageId);
}

exports.add = add;
exports.remove = remove;
exports.get = get;

