const {google} = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const calendar = google.calendar("v3");
const functions = require("firebase-functions");
const googleCredentials = require("./credentials.json");
const cors = require("cors")({origin: true});

const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();
const fetch = require("node-fetch");

const ERROR_RESPONSE = {
  status: "500",
  message: "There was an error adding an event to your Google calendar",
};
const TIME_ZONE = "EST";

// eslint-disable-next-line require-jsdoc
function sendMessage(targetCategorIds, messageBody, title) {
  if (!targetCategorIds || targetCategorIds.length == 0) return;
  return db.collection("user_categories")
      .where("category_id", "in", targetCategorIds).get()
      .then((ucatsSnapshot) => {
        const targetUidsSet=new Set(); // Impossible for Sets to have duplicates
        ucatsSnapshot.forEach((doc) => {
          const data = doc.data();
          targetUidsSet.add(data.uid);
        });
        const targetTokensSet = new Set();
        // getting entire collection and filtering using JavaScript, as agreed
        db.collection("user_pushId").get().then((uPushSnapshot) => {
          uPushSnapshot.forEach((doc) => {
            const data = doc.data();
            if (targetUidsSet.has(data.uid)) {
              targetTokensSet.add(data.pushToken);
            }
          });
          const targetTokens = Array.from(targetTokensSet);
          if (!targetTokens || targetTokens.length === 0) return;
          const message = {
            to: targetTokens,
            sound: "default",
            title,
            body: messageBody,
            data: {messageBody},
          };
          fetch("https://exp.host/--/api/v2/push/send", {
            method: "POST",
            headers: {
              "Accept": "application/json",
              "Accept-encoding": "gzip, deflate",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(message),
          }).then((response) => {
          // eslint-disable-next-line max-len
          // only add to notification history if message was sent out successfully
            if (response.status === 200) {
              db.collection("notifications").add({
                title,
                message: messageBody,
                category_ids: targetCategorIds,
                date: new Date(), // now
              });
            } else {
              response.json()
                  // eslint-disable-next-line max-len
                  .then((error) => console.error("Error in sending message:", error));
            }
          });
        });
      });
}

exports.sendMessage = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const targetCategorIds = request.body.targetCategorIds;
    const title = request.body.title;
    const messageBody = request.body.messageBody;

    sendMessage(targetCategorIds, messageBody, title).then((data) => {
      response.status(200).send(data);
      return;
    }).catch((err) => {
      console.error("Error sending notification: " + err.message);
      response.status(500).send(ERROR_RESPONSE);
      return;
    });
  });
});


/**
* Create calendar event
* @param {object} event with start and end dateTime
* @param {string} auth for the event by default use 'primary'.
* @return {any} Promise on the event.
*/
function addEvent(event, auth) {
  return new Promise(function(resolve, reject) {
    calendar.events.insert({
      auth: auth,
      calendarId: "primary",
      resource: {
        "summary": event.eventName,
        "description": event.description,
        "start": {
          "dateTime": event.startTime,
          "timeZone": TIME_ZONE,
        },
        "end": {
          "dateTime": event.endTime,
          "timeZone": TIME_ZONE,
        },
      },
    }, (err, res) => {
      if (err) {
        console.log("Rejecting because of error");
        reject(err);
      }
      console.log("Request successful");
      resolve(res.data);
    });
  });
}

exports.addEventToCalendar = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const eventData = {
      eventName: request.body.eventName,
      description: request.body.description,
      startTime: request.body.startTime,
      endTime: request.body.endTime,
    };
    const oAuth2Client = new OAuth2(
        googleCredentials.web.client_id,
        googleCredentials.web.client_secret,
        googleCredentials.web.redirect_uris[0]
    );

    oAuth2Client.setCredentials({
      refresh_token: googleCredentials.refresh_token,
    });

    addEvent(eventData, oAuth2Client).then((data) => {
      response.status(200).send(data);
      return;
    }).catch((err) => {
      console.error("Error adding event: " + err.message);
      response.status(500).send(ERROR_RESPONSE);
      return;
    });
  });
});

/**
* Retrieve all calendar events
* @param {string} auth for authentication.
* @return {any} Promise on the event.
*/
function getEvents(auth) {
  return new Promise(function(resolve, reject) {
    calendar.events.list({
      auth: auth,
      calendarId: "primary",
    }, (err, res) => {
      if (err) {
        console.log("Rejecting because of error");
        reject(err);
      }
      console.log("Request successful");
      resolve(res.data);
    });
  });
}

// eslint-disable-next-line max-len
exports.getEventsFromCalendar = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const oAuth2Client = new OAuth2(
        googleCredentials.web.client_id,
        googleCredentials.web.client_secret,
        googleCredentials.web.redirect_uris[0]
    );

    oAuth2Client.setCredentials({
      refresh_token: googleCredentials.refresh_token,
    });

    getEvents(oAuth2Client).then((data) => {
      response.status(200).send(data);
      return;
    }).catch((err) => {
      console.error("Error adding event: " + err.message);
      response.status(500).send(ERROR_RESPONSE);
      return;
    });
  });
});
