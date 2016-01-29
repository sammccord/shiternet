var _ = require("lodash");
var Stall = require('../api/stall/stall.model');
var Slack = require("node-slackr");
var slack = new Slack('https://hooks.slack.com/services/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',{
  channel: "#bathroom-monitor",
  username: "lrbr-bot",
  icon_emoji: ":poop:"
});

function SlackWebhook () {

  this._formatMessage = function(stalls) {
    var color = 'danger';
    var availableCount = 0;
    var fields = _.reduce(stalls, function(prev, stall){
      var field = {
        title: (stall.handicapped ? "Handicapped" : "") + stall.stallId,
        value: !stall.active ? "Get on in this!" : "Not right now, man.",
        short: true
      };
      if(!stall.active) {
        availableCount++;
      }
      fields.push(field);
      prev.push(field);
      return prev;
    }, []);
    if(availableCount === stalls.length) color = 'good';
    else if (availableCount > 0 && availableCount < stalls.total) color = 'warning';
    var messages = {
      text: "BATHROOM UPDATE!",
      channel: "#bathroom-monitor",
      attachments: [
        {
          fallback: "Stalls no good",
          color: color,
          fields: fields
        }
      ]
    };
  };

  this.sendWebhook = function(){
    var self = this;
    Stall.find(function(err, stalls){
      if(err) return false;
      var messages = self._formatMessage(stalls);
      slack.notify(messages);
    });
  }
}

module.exports = new SlackWebhook();
