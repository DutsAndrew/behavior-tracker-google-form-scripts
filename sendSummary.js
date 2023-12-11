// Anything that needs modification will have a // ******** // above where the edits need to happen

// controller for all functions - LEAVE AT TOP - APP SCRIPTS SETS THE MAIN FUNCTION THAT RUNS THE SCRIPT AS THE TOP ONE
const sendSummary = () => {
  const formId = FormApp.getActiveForm().getId();
  const form = FormApp.openById(`${formId}`);

  const isSchoolDay = isItASchoolDay();
  const schoolYearStatus = isSchoolOpen();

  if (!isSchoolDay || !schoolYearStatus) {
    return;
  };

  const responses = form.getResponses();
  const trackerSummaries = buildResponseSummary(responses);
  const filteredSummaries = filterSummaries(trackerSummaries);

  if (filteredSummaries.length === 0) return;

  const summaryReport = buildReport(filteredSummaries);
  
  return sendSummaryInEmail(summaryReport);
};

const getUsersToSendSummary = () => {
  const userEmails = [
    // ********************* Add emails of users that should be sent a reminder if form isn't completed, email should be in the [], with "" around it, followed by a comma ********************* //
    "avdutson1@graniteschools.org",
    "dutsandrew@gmail.com",
  ];
  return userEmails;
};

const sendSummaryInEmail = (summaryReport) => {
  const today = new Date();
  const options = { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric'};
  const formattedDate = today.toLocaleString(undefined, options);

  const usersToEmail = getUsersToSendSummary();
  
  usersToEmail.forEach((recipient) => {
    // ************************ Customize email subject line as needed, make sure text remains inside the ``; ************************ //
    const subject = `_______'s Tracker Summary for ${formattedDate} - Automated Email`;

    MailApp.sendEmail({
      to: recipient,
      subject: subject,
      htmlBody: summaryReport,
    });
  });
};

const noSchoolDays = () => {
  const nonAttendedDays = [
    // ************************ All non-school days M-F during the year need to be added, format is "YYYY-MM-DD" ************************ //
    // ************************ Each entry must "" around it, be on a new line, and have a comma at the end of it ************************ //
    "2023-12-22",
    "2023-12-25",
    "2023-12-26",
    "2023-12-27",
    "2023-12-28",
    "2023-12-29",
    "2024-01-01",
    "2024-01-02",
    "2024-01-15",
    "2024-02-09",
    "2024-02-16",
    "2024-02-19",
    "2024-03-15",
    "2024-04-01",
    "2024-04-02",
    "2024-04-03",
    "2024-04-04",
    "2024-04-05",
    "2024-04-29",
    "2024-05-27",
  ];

  const nonSchoolDayDates = [];

  nonAttendedDays.forEach((day) => {
    const parts = day.split('-');
    const convertedDay = new Date(parts[0], parts[1] - 1, parts[2]); // month is 0-based
    nonSchoolDayDates.push(convertedDay);
  });

  return nonSchoolDayDates;
};

function isSchoolOpen() {
  // ************************ Need to add the school year start date and end date below, must be in the Date('') portion, format is "August 16, 2023" ************************ //
  const schoolStartDate = new Date('August 16, 2023');
  const schoolEndDate = new Date('May 24, 2024');

  const currentDate = new Date();

  return currentDate >= schoolStartDate && currentDate <= schoolEndDate;
};

const buildReport = (trackerSummaries) => {
  const periodOrder = ['BHA Check In', 'Den', '1st', '2nd', '3rd', '4th', '5th', 'BHA Check Out'];
  trackerSummaries.sort((a, b) => periodOrder.indexOf(a.Period) - periodOrder.indexOf(b.Period));

  let tableHTML = '<table border="1" style="width: 100%; text-align: center; border-collapse: collapse; background-color: #f2f2f2; color: #333;"><tr>';
  tableHTML += '<th style="padding: 10px; font-weight: bold; font-size: 18px;">Period</th>';
  tableHTML += '<th style="padding: 10px; font-weight: bold; font-size: 18px;">SAFE<p style="font-weight: normal; margin: 0; padding: 0; font-size: 14px;">Keep Hands and Feet to Self.<br>Be Where You\'re Supposed to Be</p></th>';
  tableHTML += '<th style="padding: 10px; font-weight: bold; font-size: 18px;">RESPECTFUL<p style="font-weight: normal; margin: 0; padding: 0; font-size: 14px;">Kind Words and Actions<br>Follow Teacher DirectionsClassroom Expectations</p></th>';
  tableHTML += '<th style="padding: 10px; font-weight: bold; font-size: 18px;">RESPONSIBLE<p style="font-weight: normal; margin: 0; padding: 0; font-size: 14px;">Arrive on Time<br>Complete Work<br>Stay On Task</p></th>';
  tableHTML += '<th style="padding: 10px; font-weight: bold; font-size: 18px;">Total Points</th>';
  tableHTML += '<th style="padding: 10px; font-weight: bold; font-size: 18px;">Staff Comments</th>';
  tableHTML += '</tr>';

  let totalSafe = 0;
  let totalRespectful = 0;
  let totalResponsible = 0;

  let backgroundColorSwitch = false;

  periodOrder.forEach((period) => {
    const summary = trackerSummaries.find((s) => s.Period === period);

    if (summary) {
      const backgroundColor = backgroundColorSwitch ? '#ffffff' : '#f2f2f2';
      tableHTML += `<tr style="background-color: ${backgroundColor};">`;
      tableHTML += `<td style="padding: 10px; font-weight: bold; font-size: 16px;">${summary.Period}</td>`;
      tableHTML += `<td style="padding: 10px; font-size: 18px; font-weight: bold;">${summary.SAFE || ''}</td>`;
      tableHTML += `<td style="padding: 10px; font-size: 18px; font-weight: bold;">${summary.RESPECTFUL || ''}</td>`;
      tableHTML += `<td style="padding: 10px; font-size: 18px; font-weight: bold;">${summary.RESPONSIBLE || ''}</td>`;


      // store total points for entire tracker
      const safe = parseInt(summary.SAFE) || 0;
      const respectful = parseInt(summary.RESPECTFUL) || 0;
      const responsible = parseInt(summary.RESPONSIBLE) || 0;
      totalSafe += safe;
      totalRespectful += respectful;
      totalResponsible += responsible;

      // Calculate total points for just this response
      const totalPointsFromUser = safe + respectful + responsible;
      tableHTML += `<td style="padding: 10px; font-size: 18px; font-weight: bold;">${totalPointsFromUser > 0 ? totalPointsFromUser : ''}</td>`;

      // If it's a BHA Check In or Check Out, use bhaCheckIn or bhaCheckOut
      const teacherComments = summary.Period.includes('BHA') ? summary.bhaCheckIn || summary.bhaCheckOut || '' : summary.teacherComments || '';
      tableHTML += `<td style="padding: 10px;">${teacherComments}</td>`;

      tableHTML += '</tr>';

      backgroundColorSwitch = !backgroundColorSwitch;
    }
  });

  // Add a row for the totals of all responses
  tableHTML += '<tr style="background-color: #d9d9d9;">';
  tableHTML += '<td style="padding: 10px; font-size: 18px; font-weight: bold;">Totals</td>';
  tableHTML += `<td style="padding: 10px; font-size: 18px; font-weight: bold;">${totalSafe}</td>`;
  tableHTML += `<td style="padding: 10px; font-size: 18px; font-weight: bold;">${totalRespectful}</td>`;
  tableHTML += `<td style="padding: 10px; font-size: 18px; font-weight: bold;">${totalResponsible}</td>`;
  const totalAllScores = totalSafe + totalRespectful + totalResponsible;
  tableHTML += `<td style="padding: 10px; font-size: 18px; font-weight: bold;">${totalAllScores}</td>`;
  tableHTML += '<td style="padding: 10px;"></td>'; // Empty cell for Teacher Comments in the Totals row
  tableHTML += '</tr>';

  tableHTML += '</table>';

  tableHTML += '<br><p>This is an automated message.</p>'

  // tableHTML will now have all the necessary rows added to it
  return tableHTML;
};

class UserResponseSummary {
  constructor(options = {}) {
    this.Period = options.Period || '';
    this.SAFE = options.SAFE || '';
    this.RESPECTFUL = options.RESPECTFUL || '';
    this.RESPONSIBLE = options.RESPONSIBLE || '';
    this.teacherComments = options.teacherComments || '';
    this.bhaCheckIn = options.bhaCheckIn || '';
    this.bhaCheckOut = options.bhaCheckOut || '';
    this.timestamp = options.timestamp || '';
  };
};

const buildResponseSummary = (responses) => {
  const allUserResponseSummaries = [];

  responses.forEach((response) => {
    const isResponseForToday = verifyDates(response.getTimestamp());

    if (isResponseForToday) {
      const itemResponses = response.getItemResponses();
      const responseTimestamp = response.getTimestamp();

      let bhaCheckInFlag = false;
      let bhaCheckOutFlag = false;

      const userResponseSummary = new UserResponseSummary();
      userResponseSummary.timestamp = responseTimestamp;

      itemResponses.forEach((itemResponse) => {
        const question = itemResponse.getItem().getTitle();
        const answer = itemResponse.getResponse();

        switch(question) {
          // *************** If you change anything in the form, the summary sent will have errors or missing data, please reach out to dutsandrew@gmail.com for help with this ***************** //
          case 'Period/Time of Day':
            if (answer === 'CHECK-IN (BHA Only)') {
              bhaCheckInFlag = true;
              userResponseSummary.Period = 'BHA Check In';
            } else if (answer === 'CHECK-OUT (BHA Only)') {
              bhaCheckOutFlag = true;
              userResponseSummary.Period = 'BHA Check Out'
            } else {
              userResponseSummary.Period = answer;
            };
            break;
          case 'SAFE':
            userResponseSummary.SAFE = answer;
            break;
          case 'RESPECTFUL':
            userResponseSummary.RESPECTFUL = answer;
            break;
          case 'RESPONSIBLE':
            userResponseSummary.RESPONSIBLE = answer;
            break;
          case '*BHA ONLY* CI/CO Notes':
            if (bhaCheckInFlag) {
              bhaCheckInFlag = false;
              userResponseSummary.bhaCheckIn = answer;
            };
            if (bhaCheckOutFlag) {
              bhaCheckOutFlag = false;
              userResponseSummary.bhaCheckOut = answer;
            };
            break;
          case 'Comments:':
            userResponseSummary.teacherComments = answer;
            break;
        };
      });
      allUserResponseSummaries.push(userResponseSummary);
    };
  });
  return allUserResponseSummaries;
};

const filterSummaries = (trackerSummaries) => {
  const periodOrder = ['BHA Check In', 'Den', '1st', '2nd', '3rd', '4th', '5th', 'BHA Check Out'];

  const latestTimestamps = {};

  const filteredData = trackerSummaries
    .filter(entry => periodOrder.includes(entry.Period))
    .reduce((result, entry) => {
      const currentTimestamp = entry.timestamp.getTime();
      const existingTimestamp = latestTimestamps[entry.Period];

      if (!existingTimestamp || currentTimestamp > existingTimestamp) {
        // Update the latest timestamp for the current period
        latestTimestamps[entry.Period] = currentTimestamp;

        // Add or update the entry in the result array
        result = result.filter(item => item.Period !== entry.Period);
        result.push(entry);
      }

      return result;
    }, []);

  return filteredData;
};

const verifyDates = (responseTimestamp) => {
  const today = new Date();
  if (
    responseTimestamp.getFullYear() === today.getFullYear()
    && responseTimestamp.getMonth() === today.getMonth()
    && responseTimestamp.getDate() === today.getDate()
  ) {
    return true;
  } else {
    return false;
  };
};

const isItASchoolDay = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const nonAttendedDays = noSchoolDays();

  nonAttendedDays.forEach((nonSchoolDay) => {
    if (
      nonSchoolDay.getFullYear() === today.getFullYear()
      && nonSchoolDay.getMonth() === today.getMonth()
      && nonSchoolDay.getDate() === today.getDate()
    ) {
      return false;
    };
  });

  if (dayOfWeek >= 1 && dayOfWeek <= 5) {
    // day falls under M-F
    return true;
  } else {
    // day is a Sat or Sun
    return false;
  };
};