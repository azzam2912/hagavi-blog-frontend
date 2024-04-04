export function convertDate(time: string): string {
    // Parse the date string in UTC
    const date = new Date(time);
    // Convert to milliseconds since epoch
    const gmt7Millis = date.getTime();
    //   // Calculate the time difference in milliseconds for GMT+7
    //   const gmt7Offset = 7 * 60 * 60 * 1000;  // 7 hours in milliseconds
    //   // Add the offset to get the time in GMT+7
    //   const gmt7Millis = utcMillis + gmt7Offset;
    // Create a new Date object for GMT+7 , it is actually has been provided from the backend
    const gmt7Date = new Date(gmt7Millis);

    // Format the date in the desired format
    const hours = gmt7Date.getHours().toString().padStart(2, '0');
    const minutes = gmt7Date.getMinutes().toString().padStart(2, '0');
    const day = gmt7Date.getDate().toString().padStart(2, '0');
    const monthNum: string = (gmt7Date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
    const monthNumToEnum: any = {'01': 'Jan',
                                '02': 'Feb',
                                '03': 'Mar',
                                '04': 'Apr',
                                '05': 'May',
                                '06': 'Jun',
                                '07': 'Jul',
                                '08': 'Aug',
                                '09': 'Sep',
                                '10': 'Oct',
                                '11': 'Nov',
                                '12': 'Dec'}

    return `${hours}:${minutes} - ${day} ${monthNumToEnum[monthNum]} ${gmt7Date.getFullYear()}`;
}