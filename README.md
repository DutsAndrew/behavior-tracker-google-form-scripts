# Behavior Tracker Scripts

#### These scripts are written to be embedded in Google Form's so that school staff can remind users that haven't completed a student's online tracker

## How-To Setup:

1. Open the editor for your Google Form. This should not be the view mode. You'll know because the end should be: ```/edit```
2. Click the 3 dots button and open the Script Editor option towards the bottom. It can be found here:

   <div align="center">
     <img 
       width="270" 
       alt="Screen Shot 2023-12-11 at 10 09 51" 
       src="https://github.com/DutsAndrew/behavior-tracker-google-form-scripts/assets/94728848/3ed9d560-e623-4db5-8d9c-28ed83b57942">
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

7. In BOTH scripts you'll want to find this function:

   <div align="center">
     <img 
     width="1440" 
     alt="Screen Shot 2023-12-11 at 10 32 56" 
     src="https://github.com/DutsAndrew/behavior-tracker-google-form-scripts/assets/94728848/785f9eb0-200c-48d2-ad42-06f28605231e">
   </div>
