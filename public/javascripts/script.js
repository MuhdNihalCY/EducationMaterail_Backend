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

function ADDFilterChange() {
    var Branch = document.getElementById("AddBranch").value;
    var Revision = document.getElementById("AddRevision").value;
    var Semester = document.getElementById("AddSemester").value;
    
    var select = document.getElementById("AddSubject");
    var id1 = "AddSubject";
    while (select.options.length > 1) {
        select.remove(0);
    }

    if (Branch && Revision && Semester) {
        switch (Branch) {
            case 'ct':
                console.log("CT")
                switch (Revision) {
                    case '2021':
                        switch (Semester) {
                            case '1':
                                ct2021s1(id1);
                                break;
                            case '2':
                                ct2021s2(id1);
                                break;
                            case '3':
                                ct2021s3(id1);
                                break;
                            case '4':
                                ct2021s4(id1);
                                break;
                        }
                        break;
                    case '2015':
                        switch (Semester) {
                            case '1':
                                ct2015s1(id1);
                                break;
                            case '2':
                                ct2015s2(id1);
                                break;
                            case '3':
                                ct2015s3(id1);
                                break;
                            case '4':
                                ct2015s4(id1);
                                break;
                            case '5':
                                ct2015s5(id1);
                                break;
                            case '6':
                                ct2015s6(id1);
                                break;
                        }
                }
        }
    }


}


function FilterChange() {
    var Branch = document.getElementById("Branch").value;
    var Revision = document.getElementById("Revision").value;
    var Semester = document.getElementById("Semester").value;


    var select = document.getElementById("Subject");

    var id1 = "Subject"
    while (select.options.length > 1) {
        select.remove(0);
    }



    if (Branch && Revision && Semester) {
        switch (Branch) {
            case 'ct':
                console.log("CT")
                switch (Revision) {
                    case '2021':
                        switch (Semester) {
                            case '1':
                                ct2021s1(id1);
                                break;
                            case '2':
                                ct2021s2(id1);
                                break;
                            case '3':
                                ct2021s3(id1);
                                break;
                            case '4':
                                ct2021s4(id1);
                                break;
                        }
                        break;
                    case '2015':
                        switch (Semester) {
                            case '1':
                                ct2015s1(id1);
                                break;
                            case '2':
                                ct2015s2(id1);
                                break;
                            case '3':
                                ct2015s3(id1);
                                break;
                            case '4':
                                ct2015s4(id1);
                                break;
                            case '5':
                                ct2015s5(id1);
                                break;
                            case '6':
                                ct2015s6(id1);
                                break;
                        }
                }
        }
    }

}

function ct2015s6(id1) {
    const selectTag = document.getElementById(id1); // Get the select tag element
    const options = ['	Microcontrollers', 'Computer Networks', 'Smart Device Programming', 'Mobile Communication', 'Network Infrastructure Mangagement', 'Software Testing', 'Microcontroller Lab', 'Smart Device Programming Lab', 'Project & Seminar'] // Options to add to the select tag

    // Loop through each option and create a new option element for the select tag
    for (let i = 0; i < options.length; i++) {
        const option = document.createElement('option'); // Create a new option element
        option.text = options[i]; // Set the text of the option element
        option.value = options[i]; // Set the value of the option element (optional)
        selectTag.appendChild(option); // Add the new option element to the select tag
    }
}


function ct2015s5(id1) {
    const selectTag = document.getElementById(id1); // Get the select tag element
    const options = ['Project Management & Software Engineering', 'Web Programming', 'Microprocessor and Interfacing', 'Information Security', 'Ethical Hacking', 'Cloud Computing', 'Web Programming Lab', 'Microprocessor Lab', 'Industrial Training/Industrial Visit/Collaborative work', 'Computer Network Engineering Lab', 'Project & Seminar'] // Options to add to the select tag

    // Loop through each option and create a new option element for the select tag
    for (let i = 0; i < options.length; i++) {
        const option = document.createElement('option'); // Create a new option element
        option.text = options[i]; // Set the text of the option element
        option.value = options[i]; // Set the value of the option element (optional)
        selectTag.appendChild(option); // Add the new option element to the select tag
    }
}


function ct2015s4(id1) {
    const selectTag = document.getElementById(id1); // Get the select tag element
    const options = ['Data Communication', 'Operating Systems', 'Data Structures', 'Computer System Hardware', 'System Administration Lab', 'Data Structures Lab', 'Computer System Hardware Lab', 'Application Development using Java'] // Options to add to the select tag

    // Loop through each option and create a new option element for the select tag
    for (let i = 0; i < options.length; i++) {
        const option = document.createElement('option'); // Create a new option element
        option.text = options[i]; // Set the text of the option element
        option.value = options[i]; // Set the value of the option element (optional)
        selectTag.appendChild(option); // Add the new option element to the select tag
    }
}



function ct2015s3(id1) {
    const selectTag = document.getElementById(id1); // Get the select tag element
    const options = ['Digital Computer Principles', 'object Oriented Programming Lab', 'Digital Computer Principles Lab', 'Environmental Science & Disaster Management', 'Database Management System', '	Computer Architecture', 'Object Oriented Programming through C++']; // Options to add to the select tag

    // Loop through each option and create a new option element for the select tag
    for (let i = 0; i < options.length; i++) {
        const option = document.createElement('option'); // Create a new option element
        option.text = options[i]; // Set the text of the option element
        option.value = options[i]; // Set the value of the option element (optional)
        selectTag.appendChild(option); // Add the new option element to the select tag
    }
}


function ct2015s2(id1) {
    const selectTag = document.getElementById(id1); // Get the select tag element
    const options = ['English for Communication II', 'Engineering Mathematics II', 'Engineering Physics II', 'Engineering Chemistry II', 'Programming in C', 'Engineering Graphics', 'Workshop Practice', 'Engineering Science Lab II', 'Programming in C Lab', 'Life Skill']; // Options to add to the select tag

    // Loop through each option and create a new option element for the select tag
    for (let i = 0; i < options.length; i++) {
        const option = document.createElement('option'); // Create a new option element
        option.text = options[i]; // Set the text of the option element
        option.value = options[i]; // Set the value of the option element (optional)
        selectTag.appendChild(option); // Add the new option element to the select tag
    }
}

function ct2015s1(id1) {
    const selectTag = document.getElementById(id1); // Get the select tag element
    const options = ['English for Communication I', 'Engineering Mathematics I', 'Engineering Physics I', 'Engineering Chemistry I', 'Engineering Graphics', 'Health & Physical Education', 'Workshop Practice', 'Computing Fundamentals', 'Engineering Science Lab I', 'Workshop Practice', 'Engineering Science Lab II', 'Programming in C Lab', 'Life Skill']; // Options to add to the select tag

    // Loop through each option and create a new option element for the select tag
    for (let i = 0; i < options.length; i++) {
        const option = document.createElement('option'); // Create a new option element
        option.text = options[i]; // Set the text of the option element
        option.value = options[i]; // Set the value of the option element (optional)
        selectTag.appendChild(option); // Add the new option element to the select tag
    }
}


function ct2021s1(id1) {
    // alert("dfas");
    const selectTag = document.getElementById(id1); // Get the select tag element
    const options = ['Communication Skills in English', 'Mathematics', 'Applied Physics 1', 'Applied chemistry', 'Engineering Graphics', 'Applied Physcis Lab', 'Applied Chemistry lab', 'Introducton to IT systems Lab', 'Engineering workshop practice', 'Sports and yoga']; // Options to add to the select tag

    // Loop through each option and create a new option element for the select tag
    for (let i = 0; i < options.length; i++) {
        const option = document.createElement('option'); // Create a new option element
        option.text = options[i]; // Set the text of the option element
        option.value = options[i]; // Set the value of the option element (optional)
        selectTag.appendChild(option); // Add the new option element to the select tag
    }
}

function ct2021s2(id1) {
    const selectTag = document.getElementById(id1); // Get the select tag element
    const options = ['Mathematics II', 'Applied Physics II', 'Environmental Science', 'Fundamentals of Electrical & Electronics Engineering', 'Problem Solving and Programming', 'Communication Skills in English Lab', '	Applied Physics Lab', 'Fundamentals of Eletrical & Electronics Engineering Lab', 'Problem Solving and Programming Lab', 'Engineering Workshop Practice']; // Options to add to the select tag

    // Loop through each option and create a new option element for the select tag
    for (let i = 0; i < options.length; i++) {
        const option = document.createElement('option'); // Create a new option element
        option.text = options[i]; // Set the text of the option element
        option.value = options[i]; // Set the value of the option element (optional)
        selectTag.appendChild(option); // Add the new option element to the select tag
    }
}

function ct2021s3(id1) {
    const selectTag = document.getElementById(id1); // Get the select tag element
    const options = ['Computer Organisation', '	Programming in C', '	Programming in C', 'Digital Computer Fundamentals', 'Programming in C Lab', 'Database Management System lab', '	Digital Computer Fundamentals Lab', 'Web Technology lab', 'Computer System Hardware Lab']; // Options to add to the select tag

    // Loop through each option and create a new option element for the select tag
    for (let i = 0; i < options.length; i++) {
        const option = document.createElement('option'); // Create a new option element
        option.text = options[i]; // Set the text of the option element
        option.value = options[i]; // Set the value of the option element (optional)
        selectTag.appendChild(option); // Add the new option element to the select tag
    }
}

function ct2021s4(id1) {
    const selectTag = document.getElementById(id1); // Get the select tag element
    const options = ['Object Oriented Programming', 'Computer Communication and Networks', 'Data Structures', '	Community Skills in Indian knowledge system', 'Object Oriented Programming Lab', 'Web Programming Lab', 'Data Structures Lab', 'Application Development Lab', 'Minor Project']; // Options to add to the select tag

    // Loop through each option and create a new option element for the select tag
    for (let i = 0; i < options.length; i++) {
        const option = document.createElement('option'); // Create a new option element
        option.text = options[i]; // Set the text of the option element
        option.value = options[i]; // Set the value of the option element (optional)
        selectTag.appendChild(option); // Add the new option element to the select tag
    }
}