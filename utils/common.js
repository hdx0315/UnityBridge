export const getRoomId = (userId1, userId2) => {
    const sortIds = [userId1, userId2].sort()
    const roomId = sortIds.join('-')
    return roomId
}

export const formatDate = (date) => {
    const now = new Date();

    const isToday = date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();

    if (isToday) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
        const day = date.getDate();
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = monthNames[date.getMonth()];
        return `${day} ${month}`;
    }
}