# Behavior Tracker Scripts

#### These scripts are written to be embedded in a Google Form's Script Editor to help automate and simplify data collection and representation for educators and parents

### Who are these scripts for:
* Anyone who works in education that has students who use behavior trackers that you want to digitize or have digitized
* Teachers/staff in schools that use the form data in Google Sheets but want a cleaner way to send and organize the data for viewing
* Teachers/staff that want to automate the annoying part of sending out forms daily, and managing mulitple forms throughout the day to simplify the process
* Teachers/staff that have students who can't self-manage or be responsible when carrying their own tracker

## Pre-requisites:
1. We highly recommend using [this form](https://docs.google.com/forms/d/e/1FAIpQLSdCgGYRGtHn3VGZ-IpXRbEOW80aPO3tKqwEiLBt1cG1nDrW8g/viewform). The included form will work perfectly with this script, if yours has identical questioning, even additional questions these scripts will still work fine.
2. If you want to script a form that isn't identical to the one above, please reach out to dutsandrew@gmail.com and we can help you configure a script to match your needs.

<br>

## How-To Setup:

1. Open the editor for your Google Form. This should not be the view mode. You'll know because the end of the URL should be: ```/edit```

   <br>
   <div align="center">
      <img 
         width="1440" 
         alt="Screen Shot 2023-12-11 at 17 11 38" 
         src="https://github.com/DutsAndrew/behavior-tracker-google-form-scripts/assets/94728848/eda4238b-9e47-4ffd-917d-3ff1580aff30">
   </div>
   <br>

2. Click the 3 dot button and open the Script Editor option towards the bottom. Refer to the reference photo below for location.

   <br>
   <div align="center">
     <img 
        width="269" 
        alt="Screen Shot 2023-12-11 at 12 05 30" 
        src="https://github.com/DutsAndrew/behavior-tracker-google-form-scripts/assets/94728848/4d2f9d39-b4f2-4ea8-9f2e-84d268710760">
   </div>
   <br>

3. Once open, you'll bee in the correct menu. You'll want to add a project title for this script. In this case we've titled this ```Behavior Tracker Scripts```. On the left side, the editor will list any scripts you have and the ability to add scripts. As you can see in the image this form already has the ```remindUsers.gs``` and the ```sendSummary.gs``` scripts already there. You'll need to cick the + icon and add the same file names; you do not need to add ```.gs``` at the end, this will be automatic.

   <br>
  <div align="center">
    <img 
      width="1440" 
      alt="Screen Shot 2023-12-11 at 10 13 55" 
      src="https://github.com/DutsAndrew/behavior-tracker-google-form-scripts/assets/94728848/08210451-f49e-4be2-9898-0e4edfd2a07c">
  </div>
  <br>

  <br>
  <div align="center">
    <img 
       width="1440" 
       alt="Screen Shot 2023-12-11 at 17 17 04" 
       src="https://github.com/DutsAndrew/behavior-tracker-google-form-scripts/assets/94728848/a1bcb658-89a6-435a-a48f-058a06ad3ef5">
  </div>
  <br>

4. Now that you've added the ```remindUsers.gs``` and the ```sendSummary.gs``` files. You'll need to copy and paste the actual scripts into each of those files to run. You'll want to navigate to the [remind users sript page](https://github.com/DutsAndrew/behavior-tracker-google-form-scripts/blob/main/remindUsers.js) and the [send summary script page](https://github.com/DutsAndrew/behavior-tracker-google-form-scripts/blob/main/sendSummary.js). From both of these script pages. You'll need to click the ```copy raw file``` button, which can be seen in the reference photo below.

   <br>
   <div>
     <img 
       width="1440" 
       alt="Screen Shot 2023-12-11 at 10 26 24" 
       src="https://github.com/DutsAndrew/behavior-tracker-google-form-scripts/assets/94728848/932a5632-242b-40b2-b8f2-43dadbf95691">
   </div>
   <br>

5. Once you've copied a script you're going to navigate back to the Script Editor of your Google Form and you'll find the corresponding file we created and paste ```CTRL + V``` the script into each file. so, the ```remindUsers.js``` file on github should be pasted into the ```remindUsers.gs``` file in the Script Editor and the ```sendSummary.js``` file from github should be pasted into the ```sendSummary.gs``` file.

6. With the Scripts copied over the hardest part is done. Now it's just configuring each script for your needs. The configuration for both scripts is the same for the most part, we'll be adding necessary emails, non-school days, and school start/end dates over to both scripts, but the emails they send will be different.

<br>

**Just a note, but you may notice that similar parts of the scripts do the same things, but have different names; please don't change these, as the naming conventions requires this, even though they do the same thing.**

<br>

7. In Both the ```remindUsers.gs``` and the ```sendSummary.gs``` files, find the ```nonAttendedDays``` list (see reference image below). This is the list of non-school days during the school year, so all holidays, or all non-student attended days. You should include every date for your school year here. The format is as you see below each date should be on a new line, with ```"YYYY-MM-DD",``` format and should remain inside the ```[]``` brackets. Make sure the formatting doesn't change and nothing is accidentally deleted. See the reference image for guidance.

   <br>
   <div align="center">
     <img 
     width="1440" 
     alt="Screen Shot 2023-12-11 at 10 32 56" 
     src="https://github.com/DutsAndrew/behavior-tracker-google-form-scripts/assets/94728848/785f9eb0-200c-48d2-ad42-06f28605231e">
   </div>
   <br>

8. Next find the ```hasSchoolYearStarted``` and the ```isSchoolOpen``` functions in each script. You'll need to set the start and end dates for the school year. All you need to do is adjust the ```'August 16, 2023'``` and the ```May 24, 2024``` to set the start and end dates. Make sure to keep it in the same ```MM Date, YYYY``` format. Refer to the image below for this. Keep in mind the naming conventions of each function are different, so you're looking for the boxed red portion in the image below for each script.

<br>
<div align="center">
   <img 
      width="1440" 
      alt="Screen Shot 2023-12-11 at 12 03 04" 
      src="https://github.com/DutsAndrew/behavior-tracker-google-form-scripts/assets/94728848/715006f0-5d91-4dad-813a-fccbeda1060b">
</div>
<br>

9. Now we'll walk through setting up the automated email that both scripts will send. Let's start with the ```remindUsers.gs```. First, you're going to find the ```userEmails``` list in the script, it's the red box in the reference image below and it's similar to the non-school day list we created. You'll be adding emails on their own like this ```"dutsandrew@gmail.com",```. each email should have ```""``` around it, with a ```,``` at the end. Each email should always remain in the ```[]``` brackets.

<br>
<div align="center">
   <img 
      width="1439" 
      alt="Screen Shot 2023-12-11 at 12 20 34" 
      src="https://github.com/DutsAndrew/behavior-tracker-google-form-scripts/assets/94728848/8c82fe00-1c2e-4e01-9226-08a06e0740ed">
</div>
<br>

10. Next we'll be setting up the subject line and body of the email being sent. You'll find this part of the script in the ```sendEmailReminder``` function. We'll be editing both portions in this step. For the subject line you're going to edit the text inside the ```"";``` portion after the variable ```subject```. Refer to the first red box in the reference image below.

11. Next we're going to edit the text also inside the ``` ``; ``` for the ```body```. You'll notice the email body covers multiple lines for easier readability. Inside the ```<a href="https://docs.google.com/forms/d/e/1234asdfb/viewform">here</a>``` tag you're going to want to copy and paste the view mode of your Google Form that users receive inside the ```""``` portion of the tag. So, make sure that the Google Form link says ```viewform``` at the end of the URL, refer to the image below. After that you can customize the link text which is found in this part ```">here</a>``` which currently displays ```here``` for the user. Refer to the second red box in the reference image below step 12.

<br>
<div align="center">
  <img 
     width="1440" 
     alt="Screen Shot 2023-12-11 at 17 36 19" 
     src="https://github.com/DutsAndrew/behavior-tracker-google-form-scripts/assets/94728848/8ab382c3-f766-4b43-9e5d-855890bdfa99">
</div>
<br>

12. You'll also notice ```<br>``` tags in the text, this creates a new line, so if you need to start a new paragraph or add whitespace that'll do it for you. Once that's done your script is ready to setup with a trigger, which we'll cover at the end. Now onto the ```sendSummary.gs``` script. **Note: Please remember that automated emails ethically need to be labeled as such, please do not remove the automated email lines.**

<br>
<div align="center">
   <img 
      width="1440" 
      alt="Screen Shot 2023-12-11 at 13 04 24" 
      src="https://github.com/DutsAndrew/behavior-tracker-google-form-scripts/assets/94728848/8fd6a07f-fa0c-4692-b96d-a712961d3a5d">
</div>
<br>

13. Navigate over to your ```sendSummary.gs``` script in the Script Editor of your Google Form. From here find the ```sendSummaryInEmail``` function, we are going to edit the ```recipients``` list the same way we have before, see the reference image below and refer back to ```steps 9-12``` if you forgot what we're changing. Quotation marks are seen as single ticks and back ticks here, don't worry about this change but keep them the same. Make sure not to change the ```${formattedDate}``` part of the subject line as it is embedding the date into the subject line. If you don't want to date displayed feel free to delete this part.

<br>
<div align="center">
   <img 
      width="1440" 
      alt="Screen Shot 2023-12-11 at 13 20 12" 
      src="https://github.com/DutsAndrew/behavior-tracker-google-form-scripts/assets/94728848/d07ba835-d826-4c35-b3cc-7ded662c8d21">
</div>
<br>

14. Now for the triggers, that will run the scripts. Head to the Trigger section of App Scripts, see the reference image below. We'll be setting up the trigger events by clicking the ```+ Add Trigger``` button at the bottom.

<br>
<div align="center">
   <img 
      width="1440" 
      alt="Screen Shot 2023-12-11 at 14 54 19" 
      src="https://github.com/DutsAndrew/behavior-tracker-google-form-scripts/assets/94728848/ea753142-f31c-4aca-9a62-6753e27dd792">
</div>
<br>

15. In the trigger menu you're going to click on the ```Choose which function to run``` drop down menu and you're going to see a bunch of functions in each script. We're gonna setup the ```remindUsers.gs``` trigger, so this one should be reminding users daily to fill out the form if they didn't throughout the day. So the function that you select should be the one at the top off the ```remindUsers.gs``` which is: ```remindUsers```. After you've selected ```remindUsers``` as your entry function go to the ```Select event source``` drop down menu and select ```time-driven```. This should then open the ```Select type of time based trigger``` drop down, from here we'd recommend selecting ```day timer```. This will finally open a last drop down menu titled ```Select time of day``` which will be the one hour window the script will run in. Select the time frame that best meets your use case. Finally click ```save```.

   <br>
   <div>
      <img 
         width="1440" 
         alt="Screen Shot 2023-12-11 at 14 57 44" 
         src="https://github.com/DutsAndrew/behavior-tracker-google-form-scripts/assets/94728848/1fa49b1e-2d11-4399-b357-781fd799be34">
   </div>
   <br>

17. Congrats your trigger is done for the ```remindUser.gs``` script! It will run every day at your selected window. However we've configured that script to only run on M-F attended-school days that are inside the school year window, so the script won't send an email on those outlier days. From here you're going to do the exact same process for any other scripts, If you've forgotten the process re-read this step but do so using the other script file you need to setup a trigger for.

18. (Optional step, but heavily recommended) These scripts have been throughouly tested and work well. However, with the amount of configuring we highly recommend temporarilly removing the email addresses that you want to be notified and adding yours to those lists so that you can check that everything is working and no mistakes were made. The email lists for both scripts can be found in the ```getNecessaryRespondents``` and the ```getUsersToSendSummary``` functions. Make sure just your email is in each list for testing. From here click ```save``` at the top of the script and then ```run``` the script should've sent an email to you with an ```execution completed``` message at the bottom of the screen; Or, sent a nasty error message.

19 (Optional step, but also heavily recommended). If you got an error message please check that the formatting wasn't mistyped, you can always refer back to the scripts and how they should look in ```step 4```. At the very least the error message at the bottom should give an index number for which line the error is one, compare that line to what the script should look like in my github files for step 4. Refer to the image below for running the script manually. If you got an ```execution completed``` when manually testing each one, they are working perfectly!

   <br>
   <div>
      <img 
         width="1439" 
         alt="Screen Shot 2023-12-11 at 16 29 37" 
         src="https://github.com/DutsAndrew/behavior-tracker-google-form-scripts/assets/94728848/e566be43-702a-4278-82cb-bc6b42600640">
   </div>
   <br>

#### That's it! Hope the script simplifies your process and makes everything a little easier :)

**If you get stuck at any point in this process, feel free to reach out to us at dutsandrew@gmail.com. We're happy to help.**
