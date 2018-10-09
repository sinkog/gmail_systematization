gamil_systematization

systematize your gmail mails. The mail is now available:
	read it
	archived
	important
	delete

    { 
      "filter":"from:XXX@gmail.com subject:....", 
      "read":time,
      "delete":time,
      "archive":time,
      "important":time
    },
filter: gmail filter
read/delete/important/archive: tasks
time: older_than filter parameter. Search for messages older or newer than a time period using d (day), m (month), and y (year)

use: copy the file to https: //script.google.com as a new project file, modify the "labels" JSON variable and then run the script on a schedule. I suggest running daily since google limits the number of issues for free use.
