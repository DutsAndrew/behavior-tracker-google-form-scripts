# Behavior Tracker Scripts

#### These scripts are written to be embedded in Google Form's so that school staff can remind users that haven't completed a student's online tracker

### Who are these scripts for:
* Any one who works in education that has students who use behavior trackers that you want to digitize or have digitized
* Teachers/staff in schools that use the form data in Google Sheets but want a cleaner way to send and organize the data for viewing
* Teachers/staff that want to automate the annoying part of sending out forms daily, and managing mulitple forms throughout the day to simplify the process

## How-To Setup:

1. Open the editor for your Google Form. This should not be the view mode. You'll know because the end should be: ```/edit```
2. Click the 3 dots button and open the Script Editor option towards the bottom. It can be found here:

   <div align="center">
     <img 
        width="269" 
        alt="Screen Shot 2023-12-11 at 12 05 30" 
        src="https://github.com/DutsAndrew/behavior-tracker-google-form-scripts/assets/94728848/4d2f9d39-b4f2-4ea8-9f2e-84d268710760">
   </div>

3. Once open, it'll automatically put you in the Script Editor, you'll want to add a project title for this script. In this case I've titled this ```Behavior Tracker Scripts```. On the left side, the editor will list any scripts you have and the ability to add scripts. As you can see in the image this form already has the ```remindUsers.gs``` and the ```sendSummary.gs``` scripts already there. You'll need to cick the + icon and add the same file names; you do not need to add ".gs" at the end, this will be automatic.

  <div align="center">
    <img 
      width="1440" 
      alt="Screen Shot 2023-12-11 at 10 13 55" 
      src="https://github.com/DutsAndrew/behavior-tracker-google-form-scripts/assets/94728848/08210451-f49e-4be2-9898-0e4edfd2a07c">
  </div>

4. Now that you've added the ```remindUsers.gs``` and the ```sendSummary.gs``` scripts you'll need to coppy and paste the actual script into each of those files to run. You'll want to navigate to the [remind users sript page](https://github.com/DutsAndrew/behavior-tracker-google-form-scripts/blob/main/remindUsers.js) and the [send summary script page](https://github.com/DutsAndrew/behavior-tracker-google-form-scripts/blob/main/sendSummary.js). From both of these script pages. You'll need to click the ```copy raw file``` button, which I've included an image of below:

   <div>
     <img 
       width="1440" 
       alt="Screen Shot 2023-12-11 at 10 26 24" 
       src="https://github.com/DutsAndrew/behavior-tracker-google-form-scripts/assets/94728848/932a5632-242b-40b2-b8f2-43dadbf95691">
   </div>

5. Once you've copied a script you're going to navigate back to the Script Editor of your Google Form and you'll find the corresponding file we created and paste ```CTRL + V``` the script into each file. so, the ```remindUsers.js``` file on github should be pasted into the ```remindUsers.gs``` file in the Script Editor and the same thing for the ```sendSummary``` file.

6. With the Scripts copied over the hardest part is done. Now it's just configuring each script for your needs. The configuration for both scripts is the same for the most part, we'll be adding necessary emails, non-school days, and school start/end dates over to both scripts, but the emails they send will be different.

**Just a note, but you may notice that similar parts of the scripts do the same things, but have different names; please don't change these, as the naming conventions requires this, even though they do the same thing.**

7. In Both the ```remindUsers.gs``` and the ```sendSummary.gs``` find the ```nonAttendedDays``` list (see reference image below). This is the list of non-school days during the school year, so all holidays, or all non-student attended days. You should include every date for your school year here. The format is as you see below each date should be on a new line, with ```"YYYY-MM-DD",``` format and should remain inside the ```[]``` brackets. You will need to do this in each script that is ran daily, so that the script doesnt execute on days it's not needed. See the reference image for guidance:

   <div align="center">
     <img 
     width="1440" 
     alt="Screen Shot 2023-12-11 at 10 32 56" 
     src="https://github.com/DutsAndrew/behavior-tracker-google-form-scripts/assets/94728848/785f9eb0-200c-48d2-ad42-06f28605231e">
   </div>

8. Next find the ```hasSchoolYearStarted``` and the ```isSchoolOpen``` functions in each script. You'll need to set the start and end dates for the school year. You are modifying the school start and end date variables. All you need to do is adjust the ```'August 16, 2023'``` part, keep it in the same ```MM Date, YYYY``` format. Refer to the image below for this. Keep in mind the naming conventions of each function are different, so you're looking for the boxed red portion in each script.

<div align="center">
   <img 
      width="1440" 
      alt="Screen Shot 2023-12-11 at 12 03 04" 
      src="https://github.com/DutsAndrew/behavior-tracker-google-form-scripts/assets/94728848/715006f0-5d91-4dad-813a-fccbeda1060b">
</div>

9. If you've made it this far the similar parts of both scripts are done and they won't need to be changed until the next school year, easy setup each time. Now we'll walk through setting up the automated email that both scripts will send. Let's start with the ```remindUsers.gs``` and setup all the necessary parts to send email reminders to those that haven't filled out the form for that school day. First, you're going to find the ```userEmails``` list in the script, it's the red box in the reference image below and it's similar to the non-school day list we created. You'll be adding emails on their own like this ```"avdutson1@graniteschools.org",```. each email should have ```""``` around it, with a ```,``` at the end. Each email should always remain in the ```[]``` brackets.

<div align="center">
   <img 
      width="1439" 
      alt="Screen Shot 2023-12-11 at 12 20 34" 
      src="https://github.com/DutsAndrew/behavior-tracker-google-form-scripts/assets/94728848/8c82fe00-1c2e-4e01-9226-08a06e0740ed">
</div>

10. Next we'll be setting up the subject line and body of the email being sent. You'll find this part of the script in the ```sendEmailReminder``` function. We'll be editing both portions in this step. For the subject line you're going to edit the text inside the ```"";``` portion after the variable ```subject```. Next we're going to edit the text also inside the ``` ``; ``` for the ```body``` variable. You'll notice the email body covers multiple lines for easier readability. Inside the ```<a href="https://docs.google.com/forms/d/e/1234asdfb/viewform">here</a>``` tag you're going to want to copy and paste the view mode of your Google Form that users receive inside the ```""``` portion of the tag. This creates a link for the user, after that you can customize the link text which is found in this part ```">here</a>``` which will display "here" for the user. You'll also notice ```<br>``` tags in the text, this creates a new line, so if you need to start a new paragraph or add whitespace that'll do it for you. Once that's done your script is ready to setup with a trigger, which we'll cover at the end. Now onto the ```sendSummary.gs``` script. **Note: Please remember that automated emails ethically need to be labeled as such, please do not remove the automated email lines.**

<div align="center">
   <img 
      width="1440" 
      alt="Screen Shot 2023-12-11 at 13 04 24" 
      src="https://github.com/DutsAndrew/behavior-tracker-google-form-scripts/assets/94728848/8fd6a07f-fa0c-4692-b96d-a712961d3a5d">
</div>

11. Navigate over to your ```sendSummary.gs``` script in the Script Editor of your Google Form. From here find the ```sendSummaryInEmail``` function, we are going to edit the ```recipients``` list the same way we have before, see the reference image below. You're going to add any emails that you want the tracker summary to be sent to. same policy as last time, each email on it's own line and found within ```""```, followed by a ```,```. In the screenshot the quotation marks are single ticks ```'``` those are fine to use and make no difference here. Next you're going to modify the ```subject``` variable inside the quotation marks, edit the subject of this summary email to what you want users to receive. Quotation marks are once again different, they are backticks, don't worry about this change. But do not change the ```${formattedDate}``` part of the subject line as it is embedding the date into the subject line. If you don't want to date displayed feel free to delete this part.

<div align="center">
   <img 
      width="1440" 
      alt="Screen Shot 2023-12-11 at 13 20 12" 
      src="https://github.com/DutsAndrew/behavior-tracker-google-form-scripts/assets/94728848/d07ba835-d826-4c35-b3cc-7ded662c8d21">
</div>

12. Final step for the script setup! So the script currently is setup for a [default form that looks like this](https://docs.google.com/forms/d/e/1FAIpQLSfVkaKbuXStHMN1fYfmptPhK6ciiW3qZrCiiMvhYRUay44tHg/viewform). If you use a form that has the exact same questioning then you don't need to change anything and you're done, you can head to the last step which is setting up the script triggers. If you want to run these scripts on a form that's even a little different you're gonna need to change things. I'd recommend reaching out to dutsandrew@gmail.com and I can take care of that for you as it requires too many changes that require an understanding of how the script runs.

13. Now for the triggers, that will run the scripts. Head to the Trigger section of App Scripts, see the reference image below. We'll be setting up the trigger events by clicking the ```+ Add Trigger``` button at the bottom.

<div align="center">
   <img 
      width="1440" 
      alt="Screen Shot 2023-12-11 at 14 54 19" 
      src="https://github.com/DutsAndrew/behavior-tracker-google-form-scripts/assets/94728848/ea753142-f31c-4aca-9a62-6753e27dd792">
</div>

14. In the trigger menu you're going to click on the ```Choose which function to run``` drop down menu and you're going to see a bunch of functions in each script. We're gonna setup the ```remindUsers.gs``` trigger, so this one should be reminding users daily to fill out the form if they didn't throughout the day. So the function that you select should be the one at the top off the ```remindUsers.gs``` which is: ```remindUsers```. I put the **controller** function that runs the entire script at the top for each file. After you've selected ```remindUsers``` as your entry function go to the ```Select event source``` drop down menu and select ```time-driven```. This should then open the ```Select type of time based trigger``` drop down, from here I'd recommend selecting ```day timer```. This will finally open a last drop down menu titled ```Select time of day``` which will be the one hour window the script will run in. Select the time frame that best meets your use case. Finally click ```save```. Congrats your trigger is done for the ```remindUser.gs``` script; it will run every day at your selected window. However we've configured that script to only run on M-F attended-school days that are inside the school year window, so the script won't send an email on those outlier days. From here you're going to do the exact same process for any other scripts, If you've forgotten the process re-read this step but do so using the other script file you need to setup a trigger for.

<div>
   <img 
      width="1440" 
      alt="Screen Shot 2023-12-11 at 14 57 44" 
      src="https://github.com/DutsAndrew/behavior-tracker-google-form-scripts/assets/94728848/1fa49b1e-2d11-4399-b357-781fd799be34">
</div>

#### That's it! Hope the script simplifies your process and makes everything a little easier :)

**If you get stuck at any point in this process, feel free to reach out to me at dutsandrew@gmail.com. I'm happy to help.**
