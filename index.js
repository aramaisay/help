const base64 = require('base-64');
const utf8 = require('utf8');
const axios = require('axios');

const { totp } = require('otplib');


const reqJSON = 
{
    github_url: "https://github.com/vinnyoodles/react-native-socket-io-example",
    contact_email: "aramayis.y.y@tumo.org"
}
const stringData = JSON.stringify(reqJSON);

const URL = "CHALLENGE_URL";
const sharedSecret = reqJSON.contact_email + "APICHALLENGE";

totp.options = { digits: 10, algorithm: "sha512" , epoch: 0, step: 30}

const myTotp = totp.generate(sharedSecret);
const isValid = totp.check(myTotp, sharedSecret);

console.log("Token Info:", {myTotp, isValid});




const authStringUTF = reqJSON.contact_email + ":" + myTotp;
const bytes = utf8.encode(authStringUTF);
const encoded = base64.encode(bytes);



const createReq = async () =>
{

    try 
    {

        // set the headers
        const config = {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Basic " + encoded
            }
        };

        console.log("Making req", {URL, reqJSON, config});

        const res = await axios.post(URL, stringData, config);
        console.log(res.data);
    }
    catch (err)
    {
        console.error(err);
    }
};

createReq();
// ```
// As far as I understand, I'm not sure where I'm making a mistake. I have tried to be very careful in my understanding of the requirements. I have briefly looked into all of the documents the challenge outlines, and gathered the necessary requirements needed to correctly generate a TOTP under the given conditions.

// I have found the npm package otplib can satisfy these requirements with the options I have passed in.

// However, my solution is incorrect. When I try to submit my solution, I get the error message, "Invalid token, wrong code". Can someone please help me see what I'm doing wrong?

// I really don't want all my hard work to be for nothing, as this was a lengthy project.

// Thank you so much in advance for your time and help on this. I am very grateful.