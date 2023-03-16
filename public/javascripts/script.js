document.addEventListener('DOMContentLoaded', function () {
    const adminIcon = document.getElementById("AdminIcon");
    const UserIcon = document.getElementById("UserIcon");
    const FirstLetterOfUSer = document.getElementById("FirstLetterOfUSer")
    const addVideoBtn = document.getElementById("addVideo");
    const aadNote = document.getElementById("addnote");
    const addQ_P = document.getElementById("addQ_P");
    const AddFormDiv = document.getElementById("AddFormDiv");

    // Call the functions to set and retrieve the user's info from the cookie
    //const userInfo = getUserInfoFromCookie();
    const cookies = document.cookie.split(';').reduce((cookiesObject, cookieString) => {
        const [cookieName, cookieValue] = cookieString.trim().split('=');
        cookiesObject[cookieName] = cookieValue;
        return cookiesObject;
    }, {});

    // Check if the user is an admin.
    // console.log("Cookie Below__")
    // console.log(cookies)
    var UserNameLetter = cookies.name[0];
    if (cookies.admin == 'true') {
        // console.log('User is an admin');
        addVideoBtn.style.display = "flex";
        aadNote.style.display = "flex";
        addQ_P.style.display = "flex";

        UserIcon.style.display = "none";
        adminIcon.style.display = "flex";
        FirstLetterOfUSer.textContent = UserNameLetter;
        // alert("AddFormDiv.style.display")
        AddFormDiv.style.display = "block";


        const form = document.querySelector('#AddForm'); // replace #myForm with the ID of your form

        form.addEventListener('submit', function (event) {
            const youtubeLink = document.querySelector('#Link').value.trim();
            const fileUpload = document.querySelector('#file').value.trim();

            if (youtubeLink.length === 0 && fileUpload.length === 0) {
                // if both inputs are empty, prevent form submission and show error message
                event.preventDefault();
                // document.querySelector('#error').textContent = 'Please enter a YouTube link or upload a file.';
                alert("Please enter a YouTube link or upload a file.")
            }
        });
    } else {
        // console.log('User is not an admin');
        UserIcon.style.display = "none";
        adminIcon.style.display = "flex";
        FirstLetterOfUSer.textContent = UserNameLetter;
    }

    // if (userInfo.name && userInfo.email) {
    //   // console.log(`Name: ${userInfo.name}, Email: ${userInfo.email}`);
    //   // alert(userInfo.name," :: ",userInfo.email)


    //   var UserNameLetter = userInfo.name[0];











    // } else {
    //   // console.log("User info not found in cookie.");
    // }





});


// $(document).ready(function () {
//     // when the form is submitted
//     $('#AddForm').submit(function () {
//         // check if the YouTube link or file upload input has a value
//         var youtubeLink = $('#Link').val();
//         var fileUpload = $('#file').val();

//         if (youtubeLink.length > 0 && fileUpload.length > 0) {
//             // if both inputs have a value, show an error message
//             $('#error').text('Please submit only one type of input.');
//             return false;
//         } else {
//             // otherwise, allow the form to submit
//             alert("tsk")
//             return true;
//         }
//     });
// });








function SetCookieForUser(email, name) {
    // Set a cookie when the user logs in
    document.cookie = `name=${name}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
    document.cookie = `email=${email}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
}

function SetCookieForAdmin(admin) {
    // console.log("Cookie Going to save",admin)
    // confirm("Going to save Cookie");
    document.cookie = `name=${admin.name}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
    document.cookie = `email=${admin.email}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
    document.cookie = `admin=${admin.Admin}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
}

function Logout() {
    // Delete the cookies
    if (confirm("Are You sure to Logout")) {
        // confirm("Are You sure to Logout")
        document.cookie = "name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = `admin=; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;

        // Redirect to the login page
        window.location.href = "/";
    }
}


// Retrieve the user's name and email from the cookie
// function getUserInfoFromCookie() {
//   const cookies = document.cookie.split("; ");
//   let name = "";
//   let email = "";
//   for (let i = 0; i < cookies.length; i++) {
//     const cookie = cookies[i].split("=");
//     if (cookie[0] === "name") {
//       name = cookie[1];
//     } else if (cookie[0] === "email") {
//       email = cookie[1];
//     }
//   }
//   return { name, email };
// }










function DoSignup() {
    var email = document.getElementById("email").value;
    var number = document.getElementById("number").value;
    var password = document.getElementById("password").value;
    var name = document.getElementById("name").value;



    $.ajax({
        url: 'http://localhost:3000/signup ',
        method: 'POST',
        data: {
            number: number,
            email: email,
            password: password,
            name: name
        },
        success: function (response) {
            // handle successful signup
            // console.log("response");
            // console.log(response.result)
            var admin = response.result.user
            // console.log(admin)
            if (admin) {
                SetCookieForAdmin(admin)
            } else {
                SetCookieForUser(email, name)
            }
            // alert("|sf")
            window.location.href = '/'; // redirect to home page

        },
        error: function (xhr, status, error) {
            // handle error
            console.log("Error", xhr.responseText);
            console.log("Error", error);
        }
    });

}

function DoLogin() {
    var email = document.getElementById("LoginEmail").value;
    var password = document.getElementById("LoginPaasword").value;

    $.ajax({
        url: 'http://localhost:3000/login ',
        method: 'POST',
        data: {
            email: email,
            password: password
        },
        success: function (response) {
            // handle successful signup
            var UserStatus = response.UserStatus
            var user = UserStatus.user
            if (UserStatus.user) {
                var name = user.name
                window.location.href = '/'; // redirect to home page
                if (user.Admin) {
                    SetCookieForAdmin(user)
                } else {
                    SetCookieForUser(email, name);
                }

            } else if (UserStatus.err) {
                alert(UserStatus.err)
            }
        },
        error: function (xhr, status, error) {
            // handle error
            //console.log("Error", xhr.responseText);
            console.log("Error", error);
        }
    });
}

function sendFeedback() {
    var Feedback = document.getElementById("Feedback").value;
    var email = document.getElementById("emailForFeedback").value;

    if (Feedback) {
        var data = {
            Feedback: Feedback
        }

        if (email) {
            data.email = email;
        }
        // alert(Feedback)

        $.ajax({
            url: 'http://localhost:3000/feedback',
            method: 'POST',
            data: data,
            success: (response) => {
                console.log(response);
                alert("Feedback Sent");
                document.getElementById("Feedback").value = ""
                document.getElementById("emailForFeedback").value = ""
            },
            error: (xhr, status, error) => {
                console.log("Error", error);
            }
        })


    } else {
        alert("Please provide some Feedback!")
    }
}










function LoadMoreVideos() {
    var VideoRow = document.querySelector(".VideoRow");
    var VideoGrid = document.querySelector(".videoGrid");
    var showLessDiv = document.querySelector(".showLessDiv");
    var MoreVideo = document.querySelector('.MoreVideo')
    VideoRow.style.display = 'none';
    MoreVideo.style.display = 'none';
    VideoGrid.style.display = 'block';
    showLessDiv.style.display = 'block';
}

function ShowLessVeideo() {
    var VideoRow = document.querySelector(".VideoRow");
    var VideoGrid = document.querySelector(".videoGrid");
    var showLessDiv = document.querySelector(".showLessDiv");
    var MoreVideo = document.querySelector('.MoreVideo')
    VideoRow.style.display = 'flex';
    MoreVideo.style.display = 'flex';
    VideoGrid.style.display = 'none';
    showLessDiv.style.display = 'none';
}

function LoadMoreNotes() {
    var NotesRow = document.querySelector(".NotesRow");
    var MoreNotes = document.querySelector(".MoreNotes");
    var showLessDivNotes = document.querySelector(".showLessDivNotes");
    var NotesGrid = document.querySelector(".NotesGrid");


    NotesRow.style.display = 'none';
    MoreNotes.style.display = 'none';
    showLessDivNotes.style.display = 'flex';
    NotesGrid.style.display = 'flex';
}

function ShowLessNotes() {
    var NotesRow = document.querySelector(".NotesRow");
    var MoreNotes = document.querySelector(".MoreNotes");
    var showLessDivNotes = document.querySelector(".showLessDivNotes");
    var NotesGrid = document.querySelector(".NotesGrid");

    NotesRow.style.display = 'flex';
    MoreNotes.style.display = 'flex';
    showLessDivNotes.style.display = 'none';
    NotesGrid.style.display = 'none';
}

function LoadMoreQ_P() {
    var Q_PRow = document.querySelector(".Q_PRow");
    var MoreQ_P = document.querySelector(".MoreQ_P");
    var showLessDivQ_P = document.querySelector(".showLessDivQ_P");
    var Q_PGrid = document.querySelector(".Q_PGrid");

    Q_PRow.style.display = 'none';
    MoreQ_P.style.display = 'none';
    showLessDivQ_P.style.display = 'flex';
    Q_PGrid.style.display = 'flex';

}

function ShowLessQ_P() {
    var NotesRow = document.querySelector(".Q_PRow");
    var MoreNotes = document.querySelector(".MoreQ_P");
    var showLessDivNotes = document.querySelector(".showLessDivQ_P");
    var NotesGrid = document.querySelector(".Q_PGrid");

    NotesRow.style.display = 'flex';
    MoreNotes.style.display = 'flex';
    showLessDivNotes.style.display = 'none';
    NotesGrid.style.display = 'none';
}


// Function to open the login form
function openForm() {
    document.getElementById("Signup").style.display = "none";
    document.getElementById("myForm").style.display = "flex";
}

// Function to close the login form
function closeForm() {
    document.getElementById("myForm").style.display = "none";
    document.getElementById("Signup").style.display = "none";
}

function OpenSignup() {
    document.getElementById("Signup").style.display = "flex";
    document.getElementById("myForm").style.display = "none";
}


// add File

function TypeSelected() {
    var selected = document.getElementById("MaterialType").value;
    var link = document.getElementById("link")
    var File = document.getElementById("File")


    if (selected == "Video") {
        // video selected
        link.style.display = "block"
        File.style.display = "none"
    } else if (selected == "Notes") {
        //Notes Selected
        File.style.display = "block"
        link.style.display = "none"
    } else if (selected == "Q&P") {
        // Q&P selected
        File.style.display = "block"
        link.style.display = "none"
    }
}

function AddMaterial() {
    var MaterialType = document.getElementById("MaterialType").value;
    var Link = document.getElementById("Link").value;
    var fileInput = document.getElementById("file");
    var Title = document.getElementById("Title").value;
    var Stream = document.getElementById("Stream").value;
    var Sem = document.getElementById("Sem").value;
    var Rev = document.getElementById("Rev").value;
    var Sub = document.getElementById("Sub").value;





    if (MaterialType && Title && Stream && Sem && Rev && Sub) {
        if (Link || fileInput) {

            var data = {
                MaterialType: MaterialType,
                Title: Title,
                stream: Stream,
                Sem: Sem,
                Rev: Rev,
                Sub: Sub
            }


            if (Link) {
                data.Link = Link;
            } else {
                data.Filename = Title + "_" + Sub + "_" + Sem + "_" + Stream

                // get the file
                var file = fileInput.files[0];
                // create a new FormData object
                var formData = new FormData();
                // append the file to the FormData object
                formData.append('file', file);
                data.file = formData;
            }

            $.ajax({
                url: 'http://localhost:3000/addFile',
                method: 'POST',
                data,
                contentType: false,
                processData: false,
                success: (response) => {
                    alert("Import SUccess")
                }, error: () => {
                    alert("Failed")
                }
            })

        } else {
            alert("Fill all data -- file missing ")

        }
    } else {
        alert("Fill all data")
    }
}
