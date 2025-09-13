export const ENQUEUE_CODE = `void enqueue(CircularQueue CQ, char elem)
{
    if ((CQ->front == (CQ->rear + 2) % MAX)) // Checks if full
    {
        printf("Queue is full!");
    }
    else
    {
        CQ->rear = (CQ->rear + 1) % MAX;
        CQ->data[CQ->rear] = elem;
    }
}`;

export const DEQUEUE_CODE = `void dequeue(CircularQueue CQ)
{
    if ((CQ->front == (CQ->rear + 1) % MAX)) // Checks if empty
    {
        printf("Queue is empty!");
    }
    else
    {
        CQ->front = (CQ->front + 1) % MAX;
    }
}`;


export const ENQUEUE_HIGHLIGHT_MAP = {
    checkFull: 3,
    isFull: 5,
    updateRear: 9,
    setData: 10,
};

export const DEQUEUE_HIGHLIGHT_MAP = {
    checkEmpty: 3,
    isEmpty: 5,
    updateFront: 9,
};