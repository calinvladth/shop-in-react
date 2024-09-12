function formatDate(date: Date) {
    // TODO: Can add timezone
    return new Date(date).toISOString().replace(/T/, ' ').replace(/\..+/, '')
}

export default formatDate