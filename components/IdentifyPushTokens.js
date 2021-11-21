import React from 'react';
import { db, auth } from "../firebaseconfig";

const IdentifyPushTokens = ({targetCategories}) => {
    const targetUids=[];
    const targetTokens=[];
    const netTargetTokens=[];
    
    console.log(targetCategories);

        db
          .collection("user_categories")
          .where("category_id", "in", targetCategories) // [3])
          .onSnapshot((ucatsSnapshot) => {
            ucatsSnapshot.forEach((doc) => {
              const data = doc.data();
              targetUids.push(data.uid);
              console.log(data.uid);
            });
            const netTargetUids = [];
            console.log("targetUids:");
            console.log(targetUids);
            targetUids.forEach((value) => {
              var findItem = netTargetUids.indexOf(value);
              if (findItem == -1) {
                netTargetUids.push(value);
              }
            });
            console.log(netTargetUids);
            netTargetUids.forEach((targetUid) => {
              db.collection("user_pushId")
                .where("uid", "==", targetUid)
                .onSnapshot((nTUSnapshot) => {
                  console.log(targetUid)
                  nTUSnapshot.forEach((returnedDoc) => {
                    const data = returnedDoc.data();
                    targetTokens.push(data.pushToken);
                    netTargetTokens.push(data.pushToken)
                    console.log(data.pushToken)
                    var findItem = netTargetTokens.indexOf(data.pushToken);
                    if (findItem == -1) {
                      netTargetTokens.push(data.pushToken);
                      console.log(data.pushToken);
                    }
                  });
                });
            });
          });
      

      return netTargetTokens;
}

export default IdentifyPushTokens;