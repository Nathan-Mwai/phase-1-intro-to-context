// Your code here
// const information = [firstName,familyName,title,payPerHour]
let testEmployee = createEmployeeRecord(["Gray", "Worm", "Security", 1])

function createEmployeeRecord(information){
    const employeeInfo = {
        firstName: information[0],
        familyName: information[1],
        title: information[2],
        payPerHour: information[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
    return employeeInfo;
}

function createEmployeeRecords(arrayOfArrays){
    const employeeRecords = arrayOfArrays.map(info => createEmployeeRecord(info))
    return employeeRecords
}

function createTimeInEvent(employeeInfo, inTime) {
    const [date, hour] = inTime.split(` `);
    const timeInEvent = {
        type: `TimeIn`,
        date: date,
        hour: parseInt(hour)
    }
    employeeInfo.timeInEvents.push(timeInEvent);
    return employeeInfo
}

function createTimeOutEvent(employeeInfo, outTime) {
    const [date, hour] = outTime.split(` `);
    const timeOutEvent = {
        type: `TimeOut`,
        date: date,
        hour: parseInt(hour)
    }
    employeeInfo.timeOutEvents.push(timeOutEvent);
    return employeeInfo
}

const employeeRecord = {
    // Other fields (firstName, familyName, title, payPerHour)...
    timeInEvents: [
        { type: 'TimeIn', date: new Date('2024-07-11T09:00:00') }, // Example time-in event
        // Other time-in events...
    ],
    timeOutEvents: [
        { type: 'TimeOut', date: new Date('2024-07-11T11:00:00') }, // Example time-out event
        // Other time-out events...
    ],
};


function hoursWorkedOnDate(employeeInfo, date) {
    const timeIn = employeeInfo.timeInEvents.find(inTime => inTime.date === date);
    const timeOut = employeeInfo.timeOutEvents.find(outTime => outTime.date === date);

    return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(employeeInfo, date) {
    const hoursWorked = hoursWorkedOnDate(employeeInfo, date);
    const payOwed = hoursWorked * employeeInfo.payPerHour;
    return payOwed;
}

function allWagesFor(employeeInfo) {
    const datesWorked = employeeInfo.timeInEvents.map(event => event.date);
    const totalWages = datesWorked.reduce((total, date) => total + wagesEarnedOnDate(employeeInfo, date), 0);
    return totalWages;
}

function calculatePayroll(employeeInfos) {
    return employeeInfos.reduce((totalPayroll, employeeInfo) => totalPayroll + allWagesFor(employeeInfo), 0);
}


//hoursWorkedOnDate: Calculates the number of hours worked on a specific date by subtracting the time in from the time out and converting it to hours.

// wagesEarnedOnDate: Calculates the wages earned on a specific date using hoursWorkedOnDate and multiplying by the pay rate per hour.

// allWagesFor: Calculates the total wages earned by an employee by summing up the wages for all dates worked.

// calculatePayroll: Calculates the total payroll for all employees by summing up the total wages for all employees.