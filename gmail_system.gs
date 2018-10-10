function mail_arrange() {
  var labels = [
    { 
      "filter":"((from:"
      +([
      "messages-noreply@linkedin.com",
      "news@linkedin.com",
      "no-reply@duolingo.com",
      "noreply@youtube.com",
      "notifications-noreply@linkedin.com",
      "pinbot@inspire.pinterest.com",
      ].join("|"))
      +")) AND !label:script/filter/r1d,d7d",
      "read":"1d",
      "del":"7d"
    },
    { 
      "filter":"from:XXX@gmail.com subject:....",
      "read":"7d",
      "archive":"1m"
    },
    { 
      "filter":"from:oberon@lists.inf.ethz.ch",
      "read":"2d",
      "archive":"7d"
    },
    {
    "filter":"from:jobs-listings@linkedin.com",
    "read":"2d",
    "delete":"14d"
    }
  ];
  for (var i in labels) {
    params = labels[i];
//    Logger.log(labels);
    action(params);
  }
}

function action(label) {
  if ("read" in label) {
    var query = (label.filter +" label:unread older_than:" + label.read);
    Logger.log("read: "+query);
    var threads = GmailApp.search(query);
    Logger.log("found " + threads.length + " threads:");
    for(var i = 0; i < Math.floor(threads.length/100); i++) {
      var this_batch = threads.splice(0, Math.min(threads.length, 100));
      GmailApp.markThreadsRead(this_batch);
    }
  };
  if ("del" in label) {
    var query = (label.filter +" label:read older_than:" + label.del + " !in:trash");
    Logger.log("delete: "+query);
    var threads = GmailApp.search(query);
    Logger.log("found " + threads.length + " threads:");
    for(var i = 0; i <= Math.ceil(threads.length/100); i++) {
      var this_batch_size = Math.min(threads.length, 100);
      var this_batch = threads.splice(0,this_batch_size);
      GmailApp.moveThreadsToTrash(this_batch);
    }
  };
  if ("archive" in label) {
    var query = (label.filter +" label:read older_than:"+ label.archive +" in:inbox");
    Logger.log("archive: "+query);
    var threads = GmailApp.search(query);
    Logger.log("found " + threads.length + " threads:");
    for(var i = 0; i <= Math.ceil(threads.length/100); i++) {
      var this_batch_size = Math.min(threads.length, 100);
      var this_batch = threads.splice(0, this_batch_size);
      GmailApp.moveThreadsToArchive(this_batch);
    }
  }
  if ("important" in label) {
    var query = (label.filter +" label:read older_than:"+ label.archive +" in:inbox");
    Logger.log("archive: "+query);
    var threads = GmailApp.search(query);
    Logger.log("found " + threads.length + " threads:");
    for(var i = 0; i <= Math.ceil(threads.length/100); i++) {
      var this_batch_size = Math.min(threads.length, 100);
      var this_batch = threads.splice(0, this_batch_size);
      GmailApp.moveThreadsToImportant(this_batch);
    }
  }
}
  
