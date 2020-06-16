const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

const Vaccine_Assistant = new AssistantV2({
    authenticator: new IamAuthenticator({ apikey: "RH04NgjVHynoo4nvihQY68GBSgBXOKXMZ1cO0AghtHxm" }),
    version: '2020-04-01'
});

const assistantId = '896caf8f-efc9-4aee-96b3-7bf75563d7ec';
let sessionId;
var temp;

function getUserInput() {
    temp = document.getElementById('userInput').value;
};

Vaccine_Assistant.createSession({
    assistantId,
})
    .then(res => {
        sessionId = res.result.session_id;
        result();
    })
    .catch(err => {
        console.log(err);
    });

function result() {
    Vaccine_Assistant.message({
        input: {
            message_type: 'text',
            text: ''
        },
        sessionId,
        assistantId,
    })
        .then(response => {
            console.log(JSON.stringify(response.result, null, 2));
            var response_result = JSON.stringify(response.result.output.generic[0].text, null, 2);
            document.getElementById("chatbot").innerHTML = response_result;

        })
        .catch(err => {
            console.log(err);
        });

};
