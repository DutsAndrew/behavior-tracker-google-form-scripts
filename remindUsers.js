// Anything that needs modification will have a // ******** // above where the edits need to happen

// controller for all functions - LEAVE AT TOP - APP SCRIPTS SETS THE MAIN FUNCTION THAT RUNS THE SCRIPT AS THE TOP ONE
function remindUsers() {
  const formId = FormApp.getActiveForm().getId();
  const form = FormApp.openById(`${formId}`);

  const responses = form.getResponses();
  const respondentEmails = getUserEmailsFromResponsesForToday(responses);
  
  const usersToRemind = identifyNonResponders(respondentEmails);

  const isSchoolDay = isTodayASchoolDay();
  const schoolYearStatus = hasSchoolYearStarted();
  
  if (isSchoolDay && schoolYearStatus) {
    return sendEmailReminder(usersToRemind);
  } else {
    return;
  };
};

const getNecessaryRespondents = () => {
  const userEmails = [
    // ********************* Add emails of users that should be sent a reminder if form isn't completed, email should be in the [], with "" around it, followed by a comma ********************* //
    "avdutson1@graniteschools.org",
    "dutsandrew@gmail.com",
  ];
  return userEmails;
};

const sendEmailReminder = (usersToMessage) => {
  usersToMessage.forEach((user) => {
    const recipient = user; // user is the email of each user
    // ***************** Edit the subject of the email that will be sent below, text should be in the ""; ***************** //
    const subject = "Reminder to complete _______'s Tracker - Automated Email";
    // ***************** Edit the body of the email that will be sent below, text should be in the ``; if you want a line break add <br> as needed to enter to a new line ***************** //
    // ***************** Make sure to include <a href="https://yourGoogleLink.com"> for the view mode of your form in the body, should say viewform at the end of the link **************** //
    const body = `
      The form can be found here: 
      <a href="https://docs.google.com/forms/d/e/1FAIpQLSfVkaKbuXStHMN1fYfmptPhK6ciiW3qZrCiiMvhYRUay44tHg/viewform">here</a>. <br><br>
      This is an automated email.
    `;

    MailApp.sendEmail({
      to: recipient,
      subject: subject,
      htmlBody: body,
    });
  });
};

const hasSchoolYearStarted = () => {
  // ************************ Need to add the school year start date and end date below, must be in the Date('') portion, format is "August 16, 2023" ************************ //
  const schoolStartDate = new Date('August 16, 2023');
  const schoolEndDate = new Date('May 24, 2024');

  const currentDate = new Date();

  return currentDate >= schoolStartDate && currentDate <= schoolEndDate;
};

const nonSchoolDays = () => {
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

const getUserEmailsFromResponsesForToday = (responses) => {
  const userEmails = [];

  responses.forEach((response) => {
    const emailOfUser = response.getRespondentEmail();
    const timestamp = response.getTimestamp();
    const isResponseValid = verifyIfDatesAreTheSame(timestamp); 
    if (isResponseValid) {
      userEmails.push(emailOfUser);
    };
  });
  return userEmails;
};

const verifyIfDatesAreTheSame = (responseTimestamp) => {
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

const identifyNonResponders = (usersWhoRespondedToday) => {
  const failedToRespond = [];

  const requiredUsers = getNecessaryRespondents();

  requiredUsers.forEach((user) => {
    if (!usersWhoRespondedToday.includes(user.toLowerCase())) {
      failedToRespond.push(user);
    };
  });

  return failedToRespond;
};

const isTodayASchoolDay = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const nonAttendedDays = nonSchoolDays();

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